/* global AFRAME, THREE */
const interpolate = require('color-interpolate');

if (typeof AFRAME === 'undefined') {
    throw new Error('AFRAME not available.');
}

if (typeof THREE === 'undefined') {
    throw new Error('THREE not available.');
}

AFRAME.registerComponent('terrain', {
    schema: {
        x: {type: 'number', default: 0},
        y: {type: 'number', default: 0},
        z: {type: 'number', default: 0},
        radius: {type: 'number', default: 20},
        step: {type: 'number', default: 1},
        opacity: {type: 'number', default: 1},
        color: {type: 'color', default: '#AAA'}
    },

    /**
     * Initial creation and setting of the mesh.
     */
    init: function () {
        let data = this.data;
        let el = this.el;

        const cx = data.x;
        const cy = data.y;
        const cz = data.z;

        const radius = data.radius;
        const step = data.step;

        this.geometry = new THREE.Geometry();

        const dx = Math.cos(Math.PI / 3);
        const dy = Math.sin(Math.PI / 3);

        let colormap = interpolate(['#d6a36e', '#a1d66e']);

        let getColor = (y) => {
            return colormap((y + 1)/2)
        }

        let getHeight = (i, j) => {
            return Math.sin(Math.PI * (i*i + j*j) / 100);
        }

        let getVector3 = (i, j) => {
            return new THREE.Vector3(cx + i + j * dx, cy + getHeight(cx + i + j * dx,cz + j * dy), cz + j * dy)
        };

        let getCenter = (i, j, step, primary) => {
            if (primary) {
                return new THREE.Vector3(i + j * dx + step / 2, 0, j * dy + dy * step * 0.5)
            } else {
                return new THREE.Vector3(i + j * dx + step, 0, j * dy + dy * step * 0.5)
            }
        };

        let addFace = (v, i, j, step, primary) => {
            if (primary) {
                this.geometry.vertices.push(
                    getVector3(i, j),
                    getVector3(i, j + step),
                    getVector3(i + step, j)
                );
            } else {
                this.geometry.vertices.push(
                    getVector3(i, j + step),
                    getVector3(i + step, j + step),
                    getVector3(i + step, j)
                );
            }

            let face = new THREE.Face3(v + 0, v + 1, v + 2);
            console.log(JSON.stringify(this.geometry.vertices[v + 0]));
            face.vertexColors[0] = new THREE.Color(getColor(this.geometry.vertices[v + 0].y - cy));
            face.vertexColors[1] = new THREE.Color(getColor(this.geometry.vertices[v + 1].y - cy));
            face.vertexColors[2] = new THREE.Color(getColor(this.geometry.vertices[v + 2].y - cy));
            this.geometry.faces.push(face);
        };

        let v = 0;
        for (let i = -radius * 1.2; i < radius * 1.2; i+= step) {
            for (let j = -radius * 1.4; j < radius * 1.4; j+= step) {
                if (getCenter(i, j, step, true).length() <= radius) {
                    addFace(v, i, j, step, true);
                    v += 3;
                }
                if (getCenter(i, j, step, false).length() <= radius) {
                    addFace(v, i, j, step, false);
                    v += 3;
                }
            }
        }

        this.geometry.mergeVertices();
        this.geometry.computeFaceNormals();
        this.geometry.computeVertexNormals();

        this.material = new THREE.MeshLambertMaterial({ color: 0xffffff, vertexColors: THREE.VertexColors });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);

        this.wireMaterial = new THREE.MeshLambertMaterial({ color: 0xdddddd, wireframe: true, vertexColors: THREE.VertexColors });
        this.wireMesh = new THREE.Mesh(this.geometry, this.wireMaterial);
        el.setObject3D('wire', this.wireMesh);
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
