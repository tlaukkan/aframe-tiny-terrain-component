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
            return Math.sin(Math.PI * (Math.sqrt(x*x + y*y)) / 10);
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

class Triangle {
    constructor(i, j, primary) {
        this.i = i
        this.j = j
        this.primary = primary
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
        radiusEdgeCount: {type: 'number', default: 15},
        edgeLength: {type: 'number', default: 2},
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

        this.edgeLength = data.edgeLength;
        this.edgeLengthSquared = this.edgeLength * this.edgeLength;
        this.radiusEdgeCount = data.radiusEdgeCount;
        this.radiusEdgeCountSquared = this.radiusEdgeCount * this.radiusEdgeCount;

        this.triangles = new Array(Math.pow(2 * this.radiusEdgeCount + 1, 2));
        this.vertices = new Array(2 * this.radiusEdgeCount + 1);
        this.vertexIndices = new Array(2 * this.radiusEdgeCount + 1);
        this.primaryFaces = new Array(2 * this.radiusEdgeCount + 1);
        this.secondaryFaces = new Array(2 * this.radiusEdgeCount + 1);

        this.terrainUpdateDistanceSquared = Math.pow(this.radiusEdgeCount / 4, 2);

        let getHeight = window.TINY_TERRAIN.heightFunctions.get(data.heightFunction);
        let getColor = window.TINY_TERRAIN.colorFunctions.get(data.colorFunction);

        const paletteRangeMin = data.paletteRangeMin;
        const paletteRangeMax = data.paletteRangeMax;
        const palette = data.palette.split(",").map(function(item) { return item.trim(); });
        const paletteAccuracy = data.paletteAccuracy;

        const colorPalette = interpolate(palette);
        const colorCache = new Map();

        this.geometry = new THREE.Geometry();

        let getTriangleDistanceSquared = (i, j, primary) => {
            if (primary) {
                return Math.pow((i + 0.5) * ui + j * ui / 2, 2) + Math.pow((j + 0.5) * uj, 2)
            } else {
                return Math.pow((i + 1) * ui + j * ui / 2, 2) + Math.pow((j + 0.5) * uj, 2)
            }
        };

        let updateVertex = (i, j, cx, cy, cz, vi, add) => {
            const x = cx + this.edgeLength * (i * ui + j * ui / 2);
            const z = cz + this.edgeLength * (j * uj);
            const y = cy + getHeight(x, z);
            if (!this.vertices[i + this.radiusEdgeCount][j + this.radiusEdgeCount]) {
                const vertex = new THREE.Vector3(x, y, z);
                this.vertices[i + this.radiusEdgeCount][j + this.radiusEdgeCount] = vertex;
                this.vertexIndices[i + this.radiusEdgeCount][j + this.radiusEdgeCount] = vi;

                this.geometry.vertices.push(vertex);
                return vi + 1;
            } else {
                if (!add) {
                    const vertex = this.vertices[i + this.radiusEdgeCount][j + this.radiusEdgeCount];
                    vertex.x = x; vertex.y = y; vertex.z = z;
                }
            }
            return vi;
        };

        let updateVertices = (i, j, cx, cy, cz, vi, primary, add) => {
            if (primary) {
                vi = updateVertex(i, j, cx, cy, cz, vi, add);
                vi = updateVertex(i, j + 1, cx, cy, cz, vi, add);
                vi = updateVertex(i + 1, j, cx, cy, cz, vi, add);
            } else {
                vi = updateVertex(i, j + 1, cx, cy, cz, vi, add);
                vi = updateVertex(i + 1, j + 1, cx, cy, cz, vi, add);
                vi = updateVertex(i + 1, j, cx, cy, cz, vi, add);
            }
            return vi;
        }

        let setFaceVertexColor = (face, index, vi0, cy) => {
            face.vertexColors[index] = new THREE.Color(getColor(this.geometry.vertices[vi0].y - cy, colorPalette, paletteRangeMin, paletteRangeMax, paletteAccuracy, colorCache));
        }

        let getVertexIndex = (i, j) => {
            return this.vertexIndices[i + this.radiusEdgeCount][j + this.radiusEdgeCount];
        }

        let updateFaces = (i, j, cx, cy, cz, primary, add) => {
            let vi0 = primary ? getVertexIndex(i, j)     : getVertexIndex(i, j + 1);
            let vi1 = primary ? getVertexIndex(i, j + 1) : getVertexIndex(i + 1, j + 1);
            let vi2 = primary ? getVertexIndex(i + 1, j) : getVertexIndex(i + 1, j);

            let faces = primary ? this.primaryFaces : this.secondaryFaces;
            let face = add ? new THREE.Face3(vi0, vi1, vi2) : faces[i + this.radiusEdgeCount][j + this.radiusEdgeCount];
            setFaceVertexColor(face, 0, vi0, cy);
            setFaceVertexColor(face, 1, vi1, cy);
            setFaceVertexColor(face, 2, vi2, cy);

            if (add) {
                this.geometry.faces.push(face);
                faces[i + this.radiusEdgeCount][j + this.radiusEdgeCount] = face
            }
        };

        this.updateTerrain = (cx, cy, cz, add) => {

            let vi = 0;
            this.triangles.forEach(t => {
                vi = updateVertices(t.i, t.j, cx, cy, cz, vi, t.primary, add);
                updateFaces(t.i, t.j, cx, cy, cz, t.primary, add);
            });

            this.geometry.computeFaceNormals();
            this.geometry.computeVertexNormals();
            this.geometry.computeBoundingSphere();
            this.geometry.verticesNeedUpdate = true;
            this.geometry.elementsNeedUpdate = true;

            if (add) {
                this.material = new THREE.MeshLambertMaterial({color: 0xffffff, vertexColors: THREE.VertexColors});
                this.wireMaterial = new THREE.MeshLambertMaterial({ color: 0xdddddd, wireframe: true,  vertexColors: THREE.VertexColors });
                this.mesh = new THREE.Mesh(this.geometry, this.material);
                this.wire = new THREE.Mesh(this.geometry, this.wireMaterial);
                el.setObject3D('mesh', this.mesh);
                el.setObject3D('wire', this.wire);
            }

        };

        const cx = data.x;
        const cy = data.y;
        const cz = data.z;
        this.cx = cx;
        this.cy = cy;
        this.cz = cz;

        for (let i = 0; i < 2 * this.radiusEdgeCount + 1; i++) {
            this.vertices[i] = new Array(2 * this.radiusEdgeCount + 1);
            this.vertexIndices[i] = new Array(2 * this.radiusEdgeCount + 1);
            this.primaryFaces[i] = new Array(2 * this.radiusEdgeCount + 1);
            this.secondaryFaces[i] = new Array(2 * this.radiusEdgeCount + 1);
        }

        for (let i = -this.radiusEdgeCount; i < this.radiusEdgeCount; i += 1) {
            for (let j = -this.radiusEdgeCount; j < this.radiusEdgeCount; j += 1) {
                if (getTriangleDistanceSquared(i, j, true) <= this.radiusEdgeCountSquared) {
                    this.triangles.push(new Triangle(i, j, true));
                }
                if (getTriangleDistanceSquared(i, j, false) <= this.radiusEdgeCountSquared) {
                    this.triangles.push(new Triangle(i, j, false));
                }
            }
        }

        this.updateTerrain(cx, cy, cz, true)
    },

    update: function (oldData) {
        let data = this.data;

        const cx = (data.x / (2 * ui)).toFixed() * 2 * ui;
        const cy = data.y;
        const cz = (data.z / (4 * uj)).toFixed() * 4 * uj;

        if ((this.cx - cx) * (this.cx - cx) + (this.cz - cz) * (this.cz - cz) >= this.terrainUpdateDistanceSquared * this.edgeLengthSquared) {
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
        radiusEdgeCount: 'terrain.radiusEdgeCount',
        edgeLength: 'terrain.edgeLength'
    }
});
