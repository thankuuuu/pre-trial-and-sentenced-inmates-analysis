/* Copyright (c) 2020 by Miles Manners (https://codepen.io/milesmanners/pen/aEabGV)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

// Component Definitions
Vue.component('chart', {
  template: '#chart',
  props: [
  'size',
  'sectors'],

  data() {
    return {
      styleObj: {
        width: `${this.size * 1.1}px`,
        height: `${this.size * 1.1}px` },

      processedSectors: [],
      text: '',
      show: '',
      value: '' };

  },
  computed: {
    total() {
      return this.sectors.reduce((t, s) => t + s.value, 0);
    } },

  watch: {
    sectors: {
      handler(val) {
        this.calculateSectors();
      },
      deep: true,
      immediate: true } },


  methods: {
    calculateSectors() {
      // This function calculates circle segments for each sector
      // The segments go all the way to the center, but the circle mask cuts the center out
      let l = this.size / 2;
      let rotation = 0;

      if (this.sectors.length === 1) {
        let item = this.sectors[0];
        this.processedSectors.push({
          show : item.show,
          value: item.value,
          percentage: 1,
          label: item.label,
          color: item.color,
          d: `M${l},0 A${l},${l} 0 ${arcSweep},1 ${x}, ${y} z`,
          transform: `translate(${this.size * 0.05}, ${this.size * 0.05}) rotate(${rotation}, ${l}, ${l})` });

      } else {
        this.sectors.forEach((item, key) => {
          let angle = 360 * item.value / this.total;
          let aCalc = angle > 180 ? 360 - angle : angle;
          let angleRad = aCalc * Math.PI / 180;
          let sizeZ = Math.sqrt(2 * l * l - 2 * l * l * Math.cos(angleRad));

          let sideX;
          if (aCalc <= 90) {
            sideX = l * Math.sin(angleRad);
          } else {
            sideX = l * Math.sin((180 - aCalc) * Math.PI / 180);
          }

          let sideY = Math.sqrt(sizeZ * sizeZ - sideX * sideX);
          let y = sideY;

          let x;
          let arcSweep;
          if (angle <= 180) {
            x = l + sideX;
            arcSweep = 0;
          } else {
            x = l - sideX;
            arcSweep = 1;
          }

          this.processedSectors.push({
            show : item.show,
            value: item.value,
            percentage: item.value / this.total,
            label: item.label,
            color: item.color,
            d: `M${l},${l} L${l},0 A${l},${l} 0 ${arcSweep},1 ${x}, ${y} z`,
            transform: `translate(${this.size * 0.05}, ${this.size * 0.05}) rotate(${rotation}, ${l}, ${l})` });


          rotation = rotation + angle;
        });
      }
    } } });



// Point of entry
new Vue({
  el: '#app2',
  data() {
    return {
      size: 350,
      sectors: [{
        value: 162638566,
        show: '162,638,566 People',
        label: 'Male (49.23%)',
        color: '#9e0142' },
      {
        value: 167724026,
        show:'167,724,026 People',
        label: 'Female (50.77%)',
        color: '#f46d43' }
          ] };


  } });


