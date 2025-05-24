const fs = require('fs');
const path = require('path');

const colorsPath = path.join(__dirname, 'src/foundation/styles/color/colors.json');
const colorsJson = JSON.parse(fs.readFileSync(colorsPath, 'utf8'));


const buildColors = (colorObj) => {
  const result = {};
  for (const [key] of Object.entries(colorObj)) {
    result[key] = `var(--color-${key})`;
  }
  return result;
};

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: buildColors(colorsJson.light),
    },
  },
  // rất quan trọng để bật class .dark
};
