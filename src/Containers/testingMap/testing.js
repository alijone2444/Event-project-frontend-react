import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
// import "./styles.css"; // Import CSS file

const UniversityMap = () => {
  return (
    <div style={{width:"100vw",height:'100vh'}}>
      <Canvas
  camera={{
    position: [0, 50, 100], // Positioned above the map
    fov: 50,
    near: 1, // Increase near plane
    far: 10000, // Reduce far plane if possible
  }}
  gl={{ logarithmicDepthBuffer: true }} 
  shadows
>

        {/* Loader while the model is loading */}
        <Suspense fallback={<Loader />}>
          <Scene />
        </Suspense>

        {/* Controls for moving around */}
        <OrbitControls enableDamping={true} />
      </Canvas>
    </div>
  );
};

// Component for loading the model
const Scene = () => {
  const { scene } = useGLTF("/IST.glb");

  return (
    <group>
      {/* University Map Model */}
      <primitive object={scene} scale={1.01} position={[0, 0.1, 0]} />

      {/* Directional Light for daytime */}
      {/* <directionalLight
  position={[0, 100, 0]}
  intensity={2}
  castShadow
  shadow-bias={-0.0005} // Adjust bias to avoid shadow artifacts
/> */}
  <ambientLight intensity={3} />
    </group>
  );
};

// ✅ Fixed Loader Component
const Loader = () => {
  return (
    <Html center>
      <p style={{ color: "white", fontSize: "18px" }}>Loading 3D Map...</p>
    </Html>
  );
};

export default UniversityMap;
