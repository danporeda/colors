// function makeColor(r,g,b) {
//   const color = {};
//   color.r = r;
//   color.g = g;
//   color.b = b;
//   color.rgb = function(){
//     const { r, g, b } = this;
//     return `rgb(${r}, ${g}, ${b})`;
//   };
//   color.hex = function() {
//     const { r, g, b } = this;
//     return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
//   }
//   return color;
// }

// const firstColor = makeColor(35,255,150);


/*CONSTRUCTOR FUNCTION */
// function Color(r,g,b) {
//   this.r = r;
//   this.g = g;
//   this.b = b;
// }

// Color.prototype.rgb = function() {
//   const { r, g, b } = this;
//   return `rgb(${r}, ${g}, ${b})`;
// }

// Color.prototype.hex = function() {
//   const { r, g, b } = this;
//   return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
// }

// Color.prototype.rgba = function(a=1.0) {
//   const { r, g, b } = this;
//   return `rgba(${r},${g},${b},${a})`;
// }

// const firstColor = new Color(255,5,3);
// const color1 = new Color(255,0,0);
// const color2 = new Color(0,0,255);

/* REFACTORED WITH CLASS */

class Color {
  constructor(r, g, b, name) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
  }

  innerRGB(){
    const { r, g, b } = this;
    return `${r},${g},${b}`;
  }

  rgb() {
    return `rgb(${this.innerRGB()})`;
  }

  rgba(a=1.0) {
    return `rgba(${this.innerRGB()},${a})`;
  }

  hex() {
    const { r, g, b } = this;
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  calcHSL() {
    let { r, g, b } = this;
    //make r,g,b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    //find the greatest and smallest channel values
    let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
    if (delta == 0) h = 0;
    else if (cmax == r)
      // Red is max
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      // green is max
      h = (b - r) / delta + 2;
    else
      // Blue is max
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360 deg.
    if (h < 0) h += 360;
    // Calculate lightness
    l = (cmax + cmin) / 2;

    //calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    this.h = h;
    this.s = s;
    this.l = l;
  }

}

const color1 = new Color(255, 67, 89, 'tomato');

