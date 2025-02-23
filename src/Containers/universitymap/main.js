import React, { Suspense, useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, useProgress, Text, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { useLocation } from "react-router-dom";
import { cameraPositions, defaultCameraPos, labels, initialLights } from "./mapConstants";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

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

const Scene = React.memo(({ lights, onLoaded, highlightPosition, remainingData, onMarkerClick }) => {
  const { scene } = useGLTF("/compressed_IST.glb");
  const rectAreaLightRef = useRef();
  const helperRef = useRef();

  const iconTexture = useTexture("/symbol.png");
  const sunTexture = useLoader(TextureLoader, "/Sun_Texture.jpg");

  // Get the camera and renderer from the Three.js context
  const { camera } = useThree();

  useEffect(() => {
    if (scene) onLoaded();
    return () => {
      scene.traverse((child) => {
        if (child.isLight) child.dispose();
      });
    };
  }, [scene, onLoaded]);

  useEffect(() => {
    if (rectAreaLightRef.current && !helperRef.current) {
      helperRef.current = new RectAreaLightHelper(rectAreaLightRef.current);
      rectAreaLightRef.current.add(helperRef.current);
    }

    return () => {
      if (helperRef.current) {
        helperRef.current.dispose();
        helperRef.current = null;
      }
    };
  }, []);

  const handleMarkerClick = () => {
    if (highlightPosition && remainingData) {
      onMarkerClick(remainingData); // Trigger the modal with remainingData
    }
  };

  return (
    <group>
      <primitive object={scene} scale={1.01} position={[0, 0.1, 0]} />

      {/* Highlighted marker for the matched location */}
      {highlightPosition && (
        <sprite
          position={new THREE.Vector3(highlightPosition.x, highlightPosition.y + 300, highlightPosition.z)}
          onClick={handleMarkerClick}
          scale={[400, 400, 1]}
        >
          <spriteMaterial map={iconTexture} />
        </sprite>
      )}

      {/* Sun Mesh */}
      <mesh position={new THREE.Vector3(-13000, 2000, -6000)}>
        <sphereGeometry args={[500, 64, 64]} />
        <meshStandardMaterial
          map={sunTexture} // Apply sun texture
          emissive={"#ffff00"} // Yellow emissive glow
          emissiveMap={sunTexture} // Use the same texture for emissive
          emissiveIntensity={4} // Increase glow intensity
        />
      </mesh>

      {/* Point Light for Sun Shine */}
      <pointLight
        position={new THREE.Vector3(-13000, 2000, -6000)} // Same position as the sun
        intensity={2} // Brightness of the light
        color="#ffff00" // Yellow color for the sun's glow
        distance={10000}
        decay={2}
      />

      {/* Lights */}
      <directionalLight
        position={[-defaultCameraPos.x - 8000, defaultCameraPos.y + 2000, -defaultCameraPos.z - 4000]}
        intensity={1.5}
        color="#ffff00"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50000}
      />

      <ambientLight intensity={lights.ambient} />
      <directionalLight intensity={lights.directional} position={[10, 50, 20]} shadow-mapSize={[1024, 1024]} />
      <hemisphereLight intensity={lights.hemisphere} groundColor="#804000" />
      <spotLight intensity={lights.spot} position={[600, 450, -50]} angle={0.3} penumbra={1} decay={2} />
    </group>
  );
});

// Optimized Text Label Component
const OptimizedTextLabel = React.memo(({ position, text }) => {
  return (
    <Html position={position} center>
      <div className="text-label">{text}</div>
    </Html>
  );
});

// Custom Modal Component
const CustomModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          ×
        </button>
        <h2>{data.eventName}</h2>
        <p><strong>Description:</strong> {data.description}</p>
        <p><strong>Location:</strong> {data.location}</p>
        <p><strong>Date:</strong> {data.date}</p>
        <p><strong>Tags:</strong> {data.tags.join(", ")}</p>
      </div>
    </div>
  );
};

// UniversityMap Component
const UniversityMap = () => {
  const location = useLocation();
  const { state } = location;
  const { location: coordinates, locationName, remainingData } = state || {};

  const [lights, setLights] = useState(initialLights);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const highlightPosition = useMemo(() => {
    if (locationName) {
      const matchedLocation = Object.keys(cameraPositions).find((key) =>
        locationName.toLowerCase().includes(key.toLowerCase())
      );
      if (matchedLocation) {
        const label = labels.find((label) => label.text === matchedLocation);
        if (label) {
          return new THREE.Vector3(...label.position);
        }
      }
    }
    return null;
  }, [locationName]);

  const handleMarkerClick = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0 }}>
      <Canvas
        camera={{
          position: [defaultCameraPos.x, defaultCameraPos.y, defaultCameraPos.z],
          fov: 50,
          near: 1,
          far: 50000,
        }}
        gl={{
          logarithmicDepthBuffer: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        shadows
        style={{ background: "#87CEEB" }}
      >
        <Suspense fallback={<Loader />}>
          <Scene
            lights={lights}
            onLoaded={() => setModelLoaded(true)}
            highlightPosition={highlightPosition}
            remainingData={remainingData}
            onMarkerClick={handleMarkerClick}
          />
        </Suspense>

        <OrbitControls enableDamping zoomToCursor minDistance={50} maxDistance={10000} makeDefault />

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

      {/* Custom Modal */}
      <CustomModal isOpen={isModalOpen} onClose={closeModal} data={modalData} />
    </div>
  );
};

// Styles
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
    display: block;
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

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    position: relative;
  }

  .modal-close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
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