import React, { useEffect, useRef, useContext } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import image1 from '../../images/Earth_Texture_Full.jpg';
import image3 from '../../images/Venus_Texture.jpg';
import image4 from '../../images/Mercury_Texture.jpg';
import image5 from '../../images/Saturn_Texture.jpg'
import image6 from '../../images/Mars_Texture.jpg'
import image7 from '../../images/Jupyter_Texture.jpg'
import image8 from '../../images/Uranus_Texture.jpg'
import image9 from '../../images/Neptune_Texture.jpg'
import circleTexture from '../../images/disc.png'; // Replace with your texture path
import { useState } from "react";
function ThreeScene(props) {
  const refContainer = useRef(null);
  const [hoveredObject, setHoveredObject] = useState(null);
  const [hoveredPosition, setHoveredPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Create scene
    const scene = new THREE.Scene();

    // Function to create a planet with description
    const createPlanet = (geometry, material, name, description, position) => {
      const planet = new THREE.Mesh(geometry, material);
      planet.name = name;
      planet.description = description; // Add description to the planet object
      planet.position.set(...position);
      scene.add(planet);
      return planet;
    };

    const sun = createPlanet(
      new THREE.SphereGeometry(0.82, 64, 64),
      new THREE.MeshStandardMaterial({
        emissive: "#ffff00",
        emissiveMap: new THREE.TextureLoader().load('/Sun_Texture.jpg'), // Sun texture
      }),
      "Sun",
      "The Sun is the star at the center of our solar system. It has a diameter of about 1.4 million kilometers and contains 99.86% of the total mass of the solar system. The Sun's core temperature reaches about 15 million degrees Celsius (27 million degrees Fahrenheit), where nuclear fusion reactions convert hydrogen into helium, releasing enormous amounts of energy in the form of sunlight and heat.",
      [0, 0, 0]
    );

    const Mercury = createPlanet(
      new THREE.SphereGeometry(0.3, 64, 64),
      new THREE.MeshStandardMaterial({ color: "#D3D3D3", map: new THREE.TextureLoader().load(image4) }),
      "Mercury",
      "Mercury is the smallest planet in our solar system with a diameter of approximately 4,880 kilometers. It orbits the Sun at a distance of about 57.9 million kilometers and completes one orbit in just 88 Earth days. Mercury has a very thin atmosphere composed mostly of helium and hydrogen, and it has no natural satellites (moons)."
      ,
      [0, 0, 0]
    );

    const venus = createPlanet(
      new THREE.SphereGeometry(0.5, 64, 64),
      new THREE.MeshStandardMaterial({ color: "#F5F5F5", map: new THREE.TextureLoader().load(image3) }),
      "Venus",
      "Venus is often called Earth's twin due to its similar size and proximity. It has a diameter of around 12,104 kilometers and orbits the Sun at a distance of about 108.2 million kilometers, completing one orbit in 225 Earth days. Venus has a dense atmosphere primarily made up of carbon dioxide (96.5%) and nitrogen (3.5%). Like Mercury, Venus has no moons.",
      [0, 0, 0]
    );

    const earth = createPlanet(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshStandardMaterial({ color: "#00aaff", map: new THREE.TextureLoader().load(image1) }),
      "Earth",
      "Earth is the third planet from the Sun and the only planet known to support life. It has a diameter of approximately 12,742 kilometers and orbits the Sun at an average distance of about 149.6 million kilometers, completing one orbit in 365.25 days (one Earth year). Earth's atmosphere consists mainly of nitrogen (78%) and oxygen (21%), and it has one natural satellite, the Moon.",
      [0, 0, 0]
    );

    const mars = createPlanet(
      new THREE.SphereGeometry(0.7, 64, 64),
      new THREE.MeshStandardMaterial({ color: "#e89d3b", map: new THREE.TextureLoader().load(image6) }),
      "Mars",
      "Mars is known as the Red Planet due to its reddish appearance caused by iron oxide on its surface. It has a diameter of about 6,779 kilometers and orbits the Sun at a distance of approximately 227.9 million kilometers, completing one orbit in 687 Earth days. Mars has a thin atmosphere primarily composed of carbon dioxide (95.32%) and nitrogen (2.7%). It has two small moons, Phobos and Deimos.",
      [0, 0, 0]
    );

    const jupyter = createPlanet(
      new THREE.SphereGeometry(1.2, 64, 64),
      new THREE.MeshStandardMaterial({ color: "#ff9966", map: new THREE.TextureLoader().load(image7) }),
      "Jupiter",
      "Jupiter is the largest planet in our solar system, with a diameter of about 139,820 kilometers. It orbits the Sun at a distance of approximately 778.6 million kilometers and takes about 11.9 Earth years to complete one orbit. Jupiter's atmosphere is mainly hydrogen (89%) and helium (10%). It has a vast system of rings and at least 79 known moons, including the four largest: Io, Europa, Ganymede, and Callisto.",
      [0, 0, 0]
    );

    const uranus = createPlanet(
      new THREE.SphereGeometry(0.8, 64, 64),
      new THREE.MeshStandardMaterial({ color: "#00FFFF", map: new THREE.TextureLoader().load(image8) }),
      "Uranus",
      "Uranus is an ice giant with a diameter of about 50,724 kilometers. It orbits the Sun at a distance of approximately 2.9 billion kilometers and takes about 84 Earth years to complete one orbit. Uranus has a hydrogen-rich atmosphere (82.5% hydrogen, 15% helium) and is known for its unusual rotation axis, which is almost parallel to its orbit. It has 27 known moons, including Titania, Oberon, and Miranda.",
      [0, 0, 0]
    );

    const neptune = createPlanet(
      new THREE.SphereGeometry(0.8, 64, 64),
      new THREE.MeshStandardMaterial({ color: "#0000FF", map: new THREE.TextureLoader().load(image9) }),
      "Neptune",
      "Neptune is the farthest planet from the Sun in our solar system. It has a diameter of about 49,244 kilometers and orbits the Sun at a distance of approximately 4.5 billion kilometers, completing one orbit in 165 Earth years. Neptune's atmosphere is mainly hydrogen (80%) and helium (19%). It has 14 known moons, the largest of which is Triton.",
      [0, 0, 0]
    );

    const saturnGroup = new THREE.Group();
    const saturn = createPlanet(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshStandardMaterial({ color: "#ffcc00", map: new THREE.TextureLoader().load(image5) }),
      "Saturn",
      "Saturn is famous for its prominent ring system, made up of icy particles and debris. It has a diameter of approximately 116,460 kilometers and orbits the Sun at a distance of about 1.4 billion kilometers, completing one orbit in 29.5 Earth years. Saturn's atmosphere is primarily hydrogen (96.3%) and helium (3.25%). It has 82 known moons, with Titan being the largest.",
      [0, 0, 0]
    );
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
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event) => {
      const movementX = event.movementX || event.mozMovementX || 0;
      const movementY = event.movementY || event.mozMovementY || 0;

      controls.moveRight(-movementX * 0.0007);
      controls.moveForward(-movementY * 0.0007);

      // Calculate mouse position in normalized device coordinates (-1 to +1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update the raycaster with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);

      // Calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        setHoveredObject(intersects[0].object);
        setHoveredPosition({ x: event.clientX, y: event.clientY });
      } else {
        setHoveredObject(null);
      }
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

    let isMounted = true;

    const animate = () => {
      requestAnimationFrame(animate);
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
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [props.propchange]);

  return (
    <div style={{ height: "100%", width: "100%", position: 'fixed', top: 0, left: 0, zIndex: -1 }} ref={refContainer}>
      {hoveredObject && (
        <div
          style={{
            position: 'absolute',
            top: hoveredPosition.y,
            left: hoveredPosition.x,
            pointerEvents: 'none',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '5px',
            borderRadius: '3px',
            backgroundColor: 'transparent'
          }}
        >
          <div style={{ border: '1px solid rgba(255,255,255,0.5)' }}>
            <h3 style={{ margin: 0, padding: '2%' }}>{hoveredObject.name}</h3>
            <p style={{ margin: 0, padding: '2%', paddingTop: 0, fontSize: 14 }}>{hoveredObject.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThreeScene;
