# A-Frame Tiny Terrain Component

Tiny terrain component you can define your own height and color functions.
You can also update your location and have the terrain redrawn as the player walks far enough.

## Demo

https://tiny-terrain-demo.glitch.me/

<!-- Remix Button -->
<a href="https://glitch.com/edit/#!/remix/tiny-terrain-demo">
  <img src="https://cdn.glitch.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fremix%402x.png?1513093958726" alt="remix button" aria-label="remix" height="33">
</a>

## Usage

---
    <script src="https://unpkg.com/@tlaukkan/aframe-tiny-terrain-component@0.0.5/dist/terrain.js"></script>
    
    ...
    
    <script>
        window.TINY_TERRAIN.heightFunctions.set('hill-with-sine-wave', (x, y) => {
            const d = Math.sqrt(x*x + y*y);
            return 1 * Math.sin(Math.PI * (d * d) / 100) / (1 + d * d / 100) + 20 + 20 * ( -1 + 1 / (1 + d * d / 500));
        });
    
        window.TINY_TERRAIN.colorFunctions.set('linear', (y, colorPalette, paletteRangeMin, paletteRangeMax, paletteAccuracy, colorCache) => {
            const i = ((y - paletteRangeMin)/(paletteRangeMax-paletteRangeMin)).toFixed(paletteAccuracy);
            if (!colorCache.has(i)) {
                colorCache.set(i, colorPalette(i));
            }
            return colorCache.get(i);
        });
    </script>
    
    ...
    
    <a-tiny-terrain id="terrain" height-function="hill-with-sine-wave" radius-edge-count="200" edge-length = "1.5" color-function="linear" palette = "#4f654e, #606f4e, #818553, #9b9557, #bab269, #c4bc74" palette-accuracy="3" palette-range-min="0" palette-range-max="20" ></a-tiny-terrain>

---

## Develop

npm run start:dev

## Publish package

### First publish

---
    npm publish --access public
---

### Update

---
    npm version patch
    npm publish
---