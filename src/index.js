/* global AFRAME, THREE */
const interpolate = require('color-interpolate');

if (typeof AFRAME === 'undefined') {
    throw new Error('AFRAME not available.');
}

if (typeof THREE === 'undefined') {
    throw new Error('THREE not available.');
}

class TinyTerrain {
    constructor() {
        this.heightFunctions = new Map();
        this.heightFunctions.set('sin', (x, y) => {
            return Math.sin(Math.PI * (Math.sqrt(x*x + y*y)) / 5);
        });

        this.colorFunctions = new Map();
        this.colorFunctions.set('linear-palette', (y, colorPalette, paletteRangeMin, paletteRangeMax, paletteAccuracy, colorCache) => {
            const i = ((y - paletteRangeMin)/(paletteRangeMax-paletteRangeMin)).toFixed(paletteAccuracy);
            if (!colorCache.has(i)) {
                colorCache.set(i, colorPalette(i));
            }
            return colorCache.get(i);
        });
    }
}

window.TINY_TERRAIN = new TinyTerrain()

// Unit vectors
const ui = 1 / Math.sin(Math.PI / 3);
const uj = 1;

AFRAME.registerComponent('terrain', {
    schema: {
        x: {type: 'number', default: 0},
        y: {type: 'number', default: 0},
        z: {type: 'number', default: 0},
        radius: {type: 'number', default: 15},
        step: {type: 'number', default: 1},
        heightFunction: {type: 'string', default: 'sin'},
        colorFunction: {type: 'string', default: 'linear-palette'},
        palette: {type: 'string', default: '#d6a36e, #a1d66e'},
        paletteAccuracy: {type: 'number', default: 2},
        paletteRangeMin: {type: 'number', default: -1},
        paletteRangeMax: {type: 'number', default: 1}
    },

    /**
     * Initial creation and setting of the mesh.
     */
    init: function () {
        let data = this.data;
        let el = this.el;

        const step = data.step;
        this.radius = data.radius;
        this.radiusSquared = this.radius * this.radius;

        this.vertices = new Array(2 * this.radius + 1);
        this.vertexIndices = new Array(2 * this.radius + 1);
        this.primaryFaces = new Array(2 * this.radius + 1);
        this.secondaryFaces = new Array(2 * this.radius + 1);
        for (var i = 0; i < 2 * this.radius + 1; i++) {
            this.vertices[i] = new Array(2 * this.radius + 1);
            this.vertexIndices[i] = new Array(2 * this.radius + 1);
            this.primaryFaces[i] = new Array(2 * this.radius + 1);
            this.secondaryFaces[i] = new Array(2 * this.radius + 1);
        }

        this.terrainUpdateDistanceSquared = Math.pow(this.radius / 4, 2);

        let getHeight = window.TINY_TERRAIN.heightFunctions.get(data.heightFunction);
        let getColor = window.TINY_TERRAIN.colorFunctions.get(data.colorFunction);

        const paletteRangeMin = data.paletteRangeMin;
        const paletteRangeMax = data.paletteRangeMax;
        const palette = data.palette.split(",").map(function(item) { return item.trim(); });
        const paletteAccuracy = data.paletteAccuracy;

        const colorPalette = interpolate(palette);
        const colorCache = new Map();

        this.geometry = new THREE.Geometry();

        let vi = 0
        let updateVertice = (i, j, cx, cy, cz, add) => {
            if (!this.vertices[i + this.radius][j + this.radius]) {
                const vertice = new THREE.Vector3(cx + i * ui + j * ui / 2, cy + getHeight(cx + i * ui + j * ui / 2,cz + j * uj), cz + j * uj);
                this.vertices[i + this.radius][j + this.radius] = vertice;
                this.geometry.vertices.push(vertice)
                this.vertexIndices[i + this.radius][j + this.radius] = vi;
                vi++;
            } else {
                if (!add) {
                    this.vertices[i + this.radius][j + this.radius].x = cx + i * ui + j * ui / 2;
                    this.vertices[i + this.radius][j + this.radius].y = getHeight(cx + i * ui + j * ui / 2, cz + j * uj);
                    this.vertices[i + this.radius][j + this.radius].z = cz + j * uj;
                }
            }
        };

        let getTriangleDistanceSquared = (i, j, step, primary) => {
            if (primary) {
                return Math.pow((i + 0.5) * ui + j * ui / 2, 2) + Math.pow((j + 0.5) * uj, 2)
            } else {
                return Math.pow((i + 1) * ui + j * ui / 2, 2) + Math.pow((j + 0.5) * uj, 2)
            }
        };


        let updateVertices = (i, j, cx, cy, cz, step, primary, add) => {
            if (primary) {
                updateVertice(i, j, cx, cy, cz, add);
                updateVertice(i, j + step, cx, cy, cz, add);
                updateVertice(i + step, j, cx, cy, cz, add);
            } else {
                updateVertice(i, j + step, cx, cy, cz, add);
                updateVertice(i + step, j + step, cx, cy, cz, add);
                updateVertice(i + step, j, cx, cy, cz, add);
            }
        }

        let updateFaces = (i, j, cx, cy, cz, step, primary, add) => {
            if (primary) {
                let vi0 = this.vertexIndices[i + this.radius][j + this.radius];
                let vi1 = this.vertexIndices[i + this.radius][j + step + this.radius];
                let vi2 = this.vertexIndices[i + step + this.radius][j + this.radius];
                let face = add ? new THREE.Face3(vi0, vi1, vi2) : this.primaryFaces[i + this.radius][j + this.radius];
                face.vertexColors[0] = new THREE.Color(getColor(this.geometry.vertices[vi0].y - cy, colorPalette, paletteRangeMin, paletteRangeMax, paletteAccuracy, colorCache));
                face.vertexColors[1] = new THREE.Color(getColor(this.geometry.vertices[vi1].y - cy, colorPalette, paletteRangeMin, paletteRangeMax, paletteAccuracy, colorCache));
                face.vertexColors[2] = new THREE.Color(getColor(this.geometry.vertices[vi2].y - cy, colorPalette, paletteRangeMin, paletteRangeMax, paletteAccuracy, colorCache));
                if (add) {
                    this.geometry.faces.push(face);
                    this.primaryFaces[i + this.radius][j + this.radius] = face
                }
            } else {
                let vi0 = this.vertexIndices[i + this.radius][j + step + this.radius];
                let vi1 = this.vertexIndices[i + step + this.radius][j + step + this.radius];
                let vi2 = this.vertexIndices[i + step + this.radius][j + this.radius];
                let face = add ? new THREE.Face3(vi0, vi1, vi2) : this.secondaryFaces[i + this.radius][j + this.radius];
                face.vertexColors[0] = new THREE.Color(getColor(this.geometry.vertices[vi0].y - cy, colorPalette, paletteRangeMin, paletteRangeMax, paletteAccuracy, colorCache));
                face.vertexColors[1] = new THREE.Color(getColor(this.geometry.vertices[vi1].y - cy, colorPalette, paletteRangeMin, paletteRangeMax, paletteAccuracy, colorCache));
                face.vertexColors[2] = new THREE.Color(getColor(this.geometry.vertices[vi2].y - cy, colorPalette, paletteRangeMin, paletteRangeMax, paletteAccuracy, colorCache));
                if (add) {
                    this.geometry.faces.push(face);
                    this.secondaryFaces[i + this.radius][j + this.radius] = face
                }
            }

        };

        this.updateTerrain = (cx, cy, cz, add) =>
        {
            for (let i = -this.radius; i < this.radius; i += step) {
                for (let j = -this.radius; j < this.radius; j += step) {
                    if (getTriangleDistanceSquared(i, j, step, true) <= this.radiusSquared) {
                        updateVertices(i, j, cx, cy, cz, step, true, add);
                        updateFaces(i, j, cx, cy, cz, step, true, add);
                    }
                    if (getTriangleDistanceSquared(i, j, step, false) <= this.radiusSquared) {
                        updateVertices(i, j, cx, cy, cz, step, false, add);
                        updateFaces(i, j, cx, cy, cz, step, false, add);
                    }
                }
            }

            this.geometry.computeFaceNormals();
            this.geometry.computeVertexNormals();
            this.geometry.computeBoundingSphere();
            this.geometry.verticesNeedUpdate = true;
            this.geometry.elementsNeedUpdate = true;

            if (add) {
                this.material = new THREE.MeshLambertMaterial({color: 0xffffff, vertexColors: THREE.VertexColors});

                this.wireMaterial = new THREE.MeshLambertMaterial({
                    color: 0xdddddd,
                    wireframe: true,
                    vertexColors: THREE.VertexColors
                });

                this.mesh = new THREE.Mesh(this.geometry, this.material);
                this.wire = new THREE.Mesh(this.geometry, this.wireMaterial);

                el.setObject3D('mesh', this.mesh);
                el.setObject3D('wire', this.wire);
            }

        }

        const cx = data.x;
        const cy = data.y;
        const cz = data.z;
        this.cx = cx;
        this.cy = cy;
        this.cz = cz;
        this.updateTerrain(cx, cy, cz, true)
    },

    update: function (oldData) {
        let data = this.data;

        const cx = (data.x / (2 * ui)).toFixed() * 2 * ui;
        const cy = data.y;
        const cz = (data.z / (4 * uj)).toFixed() * 4 * uj;

        if ((this.cx - cx) * (this.cx - cx) + (this.cz - cz) * (this.cz - cz) >= this.terrainUpdateDistanceSquared) {
            console.log('recalculated terrain at : ' + this.data.x + ',' + this.data.y)
            this.cx = cx;
            this.cy = cy;
            this.cz = cz;
            this.updateTerrain(cx, cy, cz, false)
        }
    }

});

AFRAME.registerPrimitive('a-terrain', {
    defaultComponents: {
        terrain: {}
    },
    mappings: {
        x: 'terrain.x',
        y: 'terrain.y',
        z: 'terrain.z',
        radius: 'terrain.radius',
        step: 'terrain.step'
    }
});
