import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

const UniversityMap = () => {
  const mountRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState({ 
    hdri: false, 
    model: false 
  });

  useEffect(() => {
    // Check if both assets are loaded
    if (assetsLoaded.hdri && assetsLoaded.model) {
      setIsLoading(false);
    }
  }, [assetsLoaded]);

  useEffect(() => {
    // Scene setup and Three.js initialization
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      25000
    );
    camera.position.set(15886, 4060, 8413);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    mountRef.current.appendChild(renderer.domElement);

    // HDRI Background with rotation
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(
      "/mapBackground2.hdr",
      (texture) => {
        texture.rotation = Math.PI; // Rotate HDRI 180 degrees
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        scene.background = envMap;
        scene.environment = envMap;
        texture.dispose();
        pmremGenerator.dispose();
        setAssetsLoaded(prev => ({ ...prev, hdri: true }));
      },
      (xhr) => {
        setProgress((xhr.loaded / xhr.total) * 50);
      }
    );

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 100, 50);
    scene.add(directionalLight);

    // Model Loading
    const loader = new GLTFLoader();
    loader.load(
      "/IST.glb",
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(3, 3, 3);
        
        // Position model in front of camera
        const cameraDirection = new THREE.Vector3();
        camera.getWorldDirection(cameraDirection);
        model.position.copy(camera.position)
          .add(cameraDirection.multiplyScalar(50));
        
        scene.add(model);
        setAssetsLoaded(prev => ({ ...prev, model: true }));
      },
      (xhr) => {
        setProgress(50 + (xhr.loaded / xhr.total) * 50);
      }
    );

    // Controls and animation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {isLoading && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "24px",
          backgroundColor: "rgba(0,0,0,0.7)",
          padding: "20px",
          borderRadius: "10px",
          zIndex: 1000
        }}>
          Loading... {Math.round(progress)}%
        </div>
      )}
      <div ref={mountRef} style={{ position: "absolute", top: 0, left: 0 }} />
    </div>
  );
};

export default UniversityMap;