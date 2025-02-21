import React, { Suspense, useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, useProgress, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

// Loader Component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "white", textAlign: "center" }}>
        <div>Loading {Math.round(progress)}%</div>
        <div style={{ width: "200px", height: "4px", background: "rgba(255,255,255,0.2)", margin: "10px auto" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "white", transition: "width 0.1s" }} />
        </div>
      </div>
    </Html>
  );
}

const UniversityMap = () => {
  const [lights, setLights] = useState({
    ambient: 3,
    directional: 3,
    hemisphere: 1,
    spot: 5,
    rectArea: 10,
  });
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [cameraPos] = useState({ x: 2500, y: 2500, z: 2500 });
  const [modelLoaded, setModelLoaded] = useState(false);

  const labels = useMemo(() => [
    { position: [600, 450, -40], text: "Raza Block" },
    { position: [-1000, 450, 350], text: "Block 2" },
    { position: [-300, 650, -1150], text: "Block 3" },
    { position: [-2700, 550, 350], text: "Futsal Court" },
    { position: [-4700, 1050, 350], text: "Girls Hostel" },
    { position: [1400, 550, -4500], text: "Block 6" },
    { position: [2400, 550, -6500], text: "Block 7" },
    { position: [-4700, 550, -3000], text: "Football Ground" },
  ], []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0 }}>
      <Canvas
        camera={{
          position: [cameraPos.x, cameraPos.y, cameraPos.z],
          fov: 50,
          near: 1,
          far: 10000,
        }}
        gl={{
          logarithmicDepthBuffer: true,
          antialias: true,
          powerPreference: "high-performance"
        }}
        shadows
        style={{ background: "black" }}
      >
        <Suspense fallback={<Loader />}>
          <Scene lights={lights} onLoaded={() => setModelLoaded(true)} />
        </Suspense>

        <OrbitControls
          enableDamping
          zoomToCursor
          minDistance={50}
          maxDistance={10000}
          makeDefault
        />

        {modelLoaded && labels.map((label, index) => (
          <OptimizedTextLabel key={index} {...label} />
        ))}
      </Canvas>

      {/* Control Panel */}
      {isPanelOpen && (
        <div className="control-panel">
          <button className="close-button" onClick={() => setIsPanelOpen(false)}>
            ×
          </button>
          {Object.entries(lights).map(([key, value]) => (
            <div key={key} className="control-item">
              <label>{key.charAt(0).toUpperCase() + key.slice(1)} Light: </label>
              <input
                type="range"
                min="0"
                max={key === "rectArea" ? 100 : 10}
                step="0.1"
                value={value}
                onChange={(e) =>
                  setLights((prev) => ({ ...prev, [key]: parseFloat(e.target.value) }))
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const OptimizedTextLabel = React.memo(({ position, text }) => {
  return (
    <Html position={position} center>
      <div className="text-label">
        {text}
      </div>
    </Html>
  )
});

const Scene = React.memo(({ lights, onLoaded }) => {
  const { scene } = useGLTF("/IST.glb")
  const rectAreaLightRef = useRef()
  const helperRef = useRef()

  useEffect(() => {
    if (scene) onLoaded()
    return () => {
      scene.traverse(child => {
        if (child.isLight) child.dispose()
      })
    }
  }, [scene, onLoaded])

  useEffect(() => {
    if (rectAreaLightRef.current && !helperRef.current) {
      helperRef.current = new RectAreaLightHelper(rectAreaLightRef.current)
      rectAreaLightRef.current.add(helperRef.current)
    }
    
    return () => {
      if (helperRef.current) {
        helperRef.current.dispose()
        helperRef.current = null
      }
    }
  }, [])

  return (
    <group>
      <primitive object={scene} scale={1.01} position={[0, 0.1, 0]} />

      <ambientLight intensity={lights.ambient} />
      <directionalLight
        intensity={lights.directional}
        position={[10, 50, 20]}
        shadow-mapSize={[1024, 1024]}
      />
      <hemisphereLight intensity={lights.hemisphere} groundColor="#804000" />
      <spotLight
        intensity={lights.spot}
        position={[600, 450, -50]}
        angle={0.3}
        penumbra={1}
        decay={2}
      />

      {/* <rectAreaLight
        ref={rectAreaLightRef}
        intensity={lights.rectArea}
        position={[600, 450, -50]}
        width={100}
        height={100}
        color="white"
        decay={2}
      /> */}
    </group>
  )
})

// Add styles and export...
// Rest of the code remains same...

const styles = `
  .control-panel {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255,255,255,0.9);
    padding: 15px;
    border-radius: 8px;
    min-width: 250px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    transition: transform 0.3s ease;
  }

  .text-label {
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    display: inline-block;
    backdrop-filter: blur(2px);
  }

  .close-button {
    display: none;
    position: absolute;
    top: 5px;
    right: 5px;
    background: none;
    border: none;
    color: #333;
    font-size: 16px;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    .control-panel {
      top: auto;
      bottom: 20px;
      right: 20px;
      left: auto;
      width: calc(100% - 40px);
      max-width: 300px;
    }
    .close-button {
      display: block;
    }
  }

  .control-item {
    margin-bottom: 15px;
  }

  .control-item label {
    display: block;
    margin-bottom: 5px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    color: #333;
  }

  .control-item input[type="range"] {
    width: 100%;
  }
`;

document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);

export default UniversityMap;
