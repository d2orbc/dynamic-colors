import colors from 'tailwindcss/colors.js';

console.log('Colors object keys:', Object.keys(colors));
console.log('Blue object:', colors.blue);
if (colors.blue) {
  console.log('Blue 500:', colors.blue['500']);
}