# A-Frame Atmosphere Component

Stripped down to contain only atmospheric sky functions from : https://github.com/feiss/aframe-environment-component

## Demo

https://naf-mesh-adapter-demo.glitch.me

<!-- Remix Button --><a href="https://glitch.com/edit/#!/remix/naf-mesh-adapter-demo">  <img src="https://cdn.glitch.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fremix%402x.png?1513093958726" alt="remix button" aria-label="remix" height="33"></a>

## Usage

---
    <script src="https://unpkg.com/@tlaukkan/aframe-atmosphere-component@0.0.2/atmosphere.js"></script>

    ...

    <a-entity id="environment" atmosphere="lightPosition: 1 5 -2;">
    </a-entity>
---

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