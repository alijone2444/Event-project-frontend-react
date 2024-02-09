import React, { useEffect, useRef ,useContext} from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import image1 from '../../images/Earth_Texture_Full.jpg';
import image2 from '../../images/Sun_Texture.jpg';
import image3 from '../../images/Venus_Texture.jpg';
import image4 from '../../images/Mercury_Texture.jpg';
import image5 from '../../images/Saturn_Texture.jpg'
import image6 from '../../images/Mars_Texture.jpg'
import image7 from '../../images/Jupyter_Texture.jpg'
import image8 from '../../images/Uranus_Texture.jpg'
import image9 from '../../images/Neptune_Texture.jpg'
import circleTexture from '../../images/disc.png'; // Replace with your texture path

function ThreeScene(props) {
  const refContainer = useRef(null);
   useEffect(() => {
    // Create scene
    const scene = new THREE.Scene();

    // Create first sphere
    const geometry = new THREE.SphereGeometry(0.82, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      emissive: "#ffff00",
      emissiveMap: new THREE.TextureLoader().load(image2), // Sun texture
    });

    const sun = new THREE.Mesh(geometry, material);
    sun.position.set(0, 0, 0);
    scene.add(sun);

    // Create second sphere with different position
    const geometry4 = new THREE.SphereGeometry(0.3, 64, 64);
    const material4 = new THREE.MeshStandardMaterial({ color: "#D3D3D3", map: new THREE.TextureLoader().load(image4) });
    const Mercury = new THREE.Mesh(geometry4, material4);
    scene.add(Mercury);

    // Create second sphere with different position
    const geometry3 = new THREE.SphereGeometry(0.5, 64, 64);
    const material3 = new THREE.MeshStandardMaterial({ color: "#F5F5F5", map: new THREE.TextureLoader().load(image3) });
    const venus = new THREE.Mesh(geometry3, material3);
    scene.add(venus);

    // Create second sphere with different position
    const geometry2 = new THREE.SphereGeometry(1, 64, 64);
    const material2 = new THREE.MeshStandardMaterial({ color: "#00aaff", map: new THREE.TextureLoader().load(image1) });
    const earth = new THREE.Mesh(geometry2, material2);
    scene.add(earth);
    
    //mars
    const geometry7 = new THREE.SphereGeometry(0.7, 64, 64);
    const material7 = new THREE.MeshStandardMaterial({ color: "#e89d3b", map: new THREE.TextureLoader().load(image6) });
    const mars = new THREE.Mesh(geometry7, material7);
    scene.add(mars);
    
    // Create second sphere with different position
    const geometry8 = new THREE.SphereGeometry(1.2, 64, 64);
    const material8 = new THREE.MeshStandardMaterial({ color: "#ff9966", map: new THREE.TextureLoader().load(image7) });
    const jupyter = new THREE.Mesh(geometry8, material8);
    scene.add(jupyter);

    
    // Create second sphere with different position
    const geometry9 = new THREE.SphereGeometry(0.8, 64, 64);
    const material9 = new THREE.MeshStandardMaterial({ color: "#00FFFF", map: new THREE.TextureLoader().load(image8) });
    const uranus = new THREE.Mesh(geometry9, material9);
    scene.add(uranus);

    
    // Create second sphere with different position
    const geometry10 = new THREE.SphereGeometry(0.8, 64, 64);
    const material10 = new THREE.MeshStandardMaterial({ color: "#0000FF", map: new THREE.TextureLoader().load(image9) });
    const neptune = new THREE.Mesh(geometry10, material10);
    scene.add(neptune);
    
    // Create sphere for Saturn
    const geometry5 = new THREE.SphereGeometry(1, 64, 64);
    const material5 = new THREE.MeshStandardMaterial({ color: "#ffcc00", map: new THREE.TextureLoader().load(image5) });
    const saturn = new THREE.Mesh(geometry5, material5);
    const saturnGroup = new THREE.Group();
    saturnGroup.add(saturn);
    const ringParticles = new THREE.BufferGeometry();
    const ringVertices = [];
    const numParticles = 15000;
    for (let i = 0; i < numParticles; i++) {
      const radius = 1.5 + Math.random() * 1.0; // Increase the ring radius range
      const theta = Math.random() * Math.PI * 2;
      const x = radius * Math.cos(theta);
      const y = radius * Math.sin(theta);
      const z = 0; // Keep particles in the same plane (z = 0 for a disc)
      ringVertices.push(x, y, z);
    }
    ringParticles.setAttribute("position", new THREE.Float32BufferAttribute(ringVertices, 3));
    const ringMaterial = new THREE.PointsMaterial({ color: '#8b735c', size: 0.05 }); // Adjust the size of particles
    const ring = new THREE.Points(ringParticles, ringMaterial);
    ring.rotation.y = (-25 * Math.PI) / 180;
    ring.rotation.x = (65 * Math.PI) / 180;
    saturnGroup.add(ring);
    scene.add(saturnGroup);

    // Create lights for planets
    const light1 = new THREE.PointLight(0xffffff, 1, 1000);
    light1.position.set(0, 0, 0);
    light1.intensity = 60;
    scene.add(light1);

    // Create a particle system with circular sprite texture
    const particles_materials = [];
    const particlesSystems = [];
    const colors = [0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xd3d3d3, 0x333333, 0x000000];
    for (let i = 0; i < 4; i++) {
      particles_materials.push(new THREE.PointsMaterial({
        size: 0.1,
        map: new THREE.TextureLoader().load(circleTexture),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        color: colors[i],
      }));

      const particles_geometry = new THREE.BufferGeometry();
      const particlesVertices = [];

      for (let j = 0; j < 2000; j++) {
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;
        const z = (Math.random() - 0.5) * 100;
        particlesVertices.push(x, y, z);
      }

      particles_geometry.setAttribute("position", new THREE.Float32BufferAttribute(particlesVertices, 3));

      const particlesSystem = new THREE.Points(particles_geometry, particles_materials[i]);
      particlesSystems.push(particlesSystem);
      scene.add(particlesSystem);
    }

    // Create camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    // Create PointerLockControls
    const controls = new PointerLockControls(camera, document.body);
    scene.add(controls.getObject());

    // Create renderer and attach to container element
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    refContainer.current.appendChild(renderer.domElement);

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0.3;
    bloomPass.strength = 3;
    bloomPass.radius = 0.55;
    composer.addPass(bloomPass);

    var orbitGroup = new THREE.Group();
    scene.add(orbitGroup);
    orbitGroup.add(sun);
    orbitGroup.add(Mercury);
    orbitGroup.add(venus);
    orbitGroup.add(earth);
    orbitGroup.add(mars);
    orbitGroup.add(jupyter);
    orbitGroup.add(saturnGroup);
    orbitGroup.add(uranus);
    orbitGroup.add(neptune);

    let colorIndex = 0;
    let frameCount = 6500;

    const blink = () => {
      for (let i = 0; i < particles_materials.length; i++) {
        setTimeout(() => {
          colorIndex = (colorIndex + 1) % colors.length;
          particles_materials[i].color.setHex(colors[colorIndex]);
        }, i * 100); // Adjust the delay (in milliseconds) as needed
      }
      frameCount++;
    };

    const handleMouseMove = (event) => {
      const movementX = event.movementX || event.mozMovementX || 0;
      const movementY = event.movementY || event.mozMovementY || 0;

      controls.moveRight(-movementX * 0.0007);
      controls.moveForward(-movementY * 0.0007);
    };

    document.addEventListener('mousemove', handleMouseMove);
    const mercuryOrbitSpeed = -0.0009;
    const venusOrbitSpeed = -0.0008;
    const earthOrbitSpeed = -0.0007;
    const marsOrbitSpeed = -0.0006;
    const jupyterOrbitSpeed = -0.0005;
    const saturnRingOrbitSpeed = -0.0004;
    const uranusOrbitSpeed = -0.0003;
    const neptuneOrbitSpeed = -0.0002;
    
    const neptuneDistance = -32;
    const uranusDistance = -28;
    const saturnRingDistance = -24;
    const jupyterDistance = -20;
    const marsDistance = -16;
    const earthDistance = -12;
    const venusDistance = -8;
    const mercuryDistance = -4;
    var id;
    let isMounted = true;    
    const animate = async () => {
      id = await requestAnimationFrame(animate);
      if (!isMounted) {
        // If component is unmounted, exit the loop
        return;
      }
      // Rotate spheres
      orbitGroup.rotation.y += 0.002;
      neptune.rotation.x += 0.00001;
      neptune.rotation.y += 0.01;
      uranus.rotation.x += 0.00001;
      uranus.rotation.y += 0.01;
      jupyter.rotation.x += 0.00001;
      jupyter.rotation.y += 0.01;
      mars.rotation.x += 0.00001;
      mars.rotation.y += 0.01;
      earth.rotation.x += 0.00001;
      earth.rotation.y += 0.01;
      venus.rotation.x += 0.00001;
      venus.rotation.y += 0.01;
      Mercury.rotation.x += 0.00001;
      Mercury.rotation.y += 0.01;
      saturn.rotation.x += 0.00001;
      saturn.rotation.y += 0.01;
      ring.rotation.z += 0.009;



      Mercury.position.x = Math.cos(mercuryOrbitSpeed * frameCount) * mercuryDistance;
      Mercury.position.z = Math.sin(mercuryOrbitSpeed * frameCount) * mercuryDistance;
      venus.position.x = Math.cos(venusOrbitSpeed * frameCount) * venusDistance;
      venus.position.z = Math.sin(venusOrbitSpeed * frameCount) * venusDistance;
      earth.position.x = Math.cos(earthOrbitSpeed * frameCount) * earthDistance;
      earth.position.z = Math.sin(earthOrbitSpeed * frameCount) * earthDistance;
      mars.position.x = Math.cos(marsOrbitSpeed * frameCount) * marsDistance;
      mars.position.z = Math.sin(marsOrbitSpeed * frameCount) * marsDistance;
      
      jupyter.position.x = Math.cos(jupyterOrbitSpeed * frameCount) * jupyterDistance;
      jupyter.position.z = Math.sin(jupyterOrbitSpeed * frameCount) * jupyterDistance;

      saturnGroup.position.x = Math.cos(saturnRingOrbitSpeed * frameCount) * saturnRingDistance;
      saturnGroup.position.z = Math.sin(saturnRingOrbitSpeed * frameCount) * saturnRingDistance;

      uranus.position.x = Math.cos(uranusOrbitSpeed * frameCount) * uranusDistance;
      uranus.position.z = Math.sin(uranusOrbitSpeed * frameCount) * uranusDistance;

      neptune.position.x = Math.cos(neptuneOrbitSpeed * frameCount) * neptuneDistance;
      neptune.position.z = Math.sin(neptuneOrbitSpeed * frameCount) * neptuneDistance;
      blink();
      // Render scene
      composer.render();
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

        // Add this function definition before your component function
    const cleanMaterial = (material) => {
      console.log('dispose material!')
      material.dispose()

      // Dispose of textures
      for (const key of Object.keys(material)) {
        const value = material[key]
        if (value && typeof value === 'object' && 'minFilter' in value) {
          console.log('dispose texture!')
          value.dispose()
        }
      }
    };
    return () => {
      props.stopAudio()
      isMounted = false;
      window.removeEventListener("resize", handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      console.log('dispose renderer!')
      renderer.dispose()
      scene.traverse(object => {
        if (!object.isMesh) return

        console.log('dispose geometry!')
        object.geometry.dispose()

        if (object.material.isMaterial) {
          cleanMaterial(object.material)
        } else {
          // an array of materials
          for (const material of object.material) cleanMaterial(material)
        }
      })
    };
  }, []);

  return <div style={{ height: "100%", width: "100%" ,position:'fixed',top:0,left:0,zIndex:-1}} ref={refContainer}>

  </div>;
}

export default ThreeScene;
