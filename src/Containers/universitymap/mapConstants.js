// mapConstants.js

// Camera positions for different locations
export const cameraPositions = {
    "Block 6": { x: 1400, y: 550, z: -3000 },
    "Block 2": { x: -1000, y: 450, z: 350 },
    "Block 3": { x: -300, y: 650, z: -1150 },
    "Futsal & basketball Court": { x: -2700, y: 550, z: 350 },
    "Girls Hostel": { x: -4700, y: 1050, z: 350 },
    "Block 7": { x: 2400, y: 650, z: -4500 },
    "Football Ground": { x: -4700, y: 550, z: -3000 },
    "Raza Block": { x: 600, y: 450, z: -40 },
  };
  
  // Default camera position
  export const defaultCameraPos = { x: 3500, y: 500, z: 2500 };
  
  // Labels for different locations
  export const labels = [
    { position: [600, 450, -40], text: "Raza Block" },
    { position: [-1000, 450, 350], text: "Block 2" },
    { position: [-300, 650, -1150], text: "Block 3" },
    { position: [-2700, 550, 350], text: "Futsal & basketball Court" },
    { position: [-4700, 1050, 350], text: "Girls Hostel" },
    { position: [1400, 550, -3000], text: "Block 6" },
    { position: [2400, 650, -4500], text: "Block 7" },
    { position: [-4700, 550, -3000], text: "Football Ground" },
  ];
  
  // Light settings
  export const initialLights = {
    ambient: 1,
    directional: 3,
    hemisphere: 1,
    spot: 5,
    rectArea: 10,
  };