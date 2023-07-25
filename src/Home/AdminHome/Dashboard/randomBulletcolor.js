const getRandomColor = () => {
    const saturation = 70; // Adjust this value for the desired saturation (0-100)
    const lightness = 70; // Adjust this value for the desired lightness (0-100)
    
    const hue = Math.floor(Math.random() * 360); // Random hue value (0-359)
  
    // Convert HSL (Hue, Saturation, Lightness) to RGB format
    const h = hue / 60;
    const c = (255 - Math.abs(2 * lightness - 255)) / 255;
    const x = c * (1 - Math.abs((h % 2) - 1));
    const m = lightness / 255 - c / 2;
    let r, g, b;
  
    if (h >= 0 && h < 1) {
      [r, g, b] = [c, x, 0];
    } else if (h >= 1 && h < 2) {
      [r, g, b] = [x, c, 0];
    } else if (h >= 2 && h < 3) {
      [r, g, b] = [0, c, x];
    } else if (h >= 3 && h < 4) {
      [r, g, b] = [0, x, c];
    } else if (h >= 4 && h < 5) {
      [r, g, b] = [x, 0, c];
    } else {
      [r, g, b] = [c, 0, x];
    }
  
    // Convert RGB values to hexadecimal
    const toHex = (value) => {
      const hex = Math.round(value * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
  
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };
export default  getRandomColor