import * as THREE from 'three';

import TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';


const rows = [0, 1, 2, 3, 4, 5];
const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const table = [
    "A", "a", "a", cols[1], rows[1],
    "Ă", "á", "á", cols[2], rows[1],
    "Â", "ớ", "ớ", cols[3], rows[1],
    "B", "bê", "bờ", cols[4], rows[1],
    "C", "xê", "cờ", cols[5], rows[1],
    "D", "dê", "dờ", cols[6], rows[1],
    "Đ", "đê", "đờ", cols[7], rows[1],
    "E", "e", "e", cols[8], rows[1],
    "Ê", "ê", "ê", cols[9], rows[1],
    "G", "giê", "giờ", cols[10], rows[1],
    "H", "hát", "hờ", cols[1], rows[2],
    "I", "i ngắn", "i", cols[2], rows[2],
    "K", "k", "ca", cols[3], rows[2],
    "L", "e-lờ", "lờ", cols[4], rows[2],
    "M", "e-mờ", "mờ", cols[5], rows[2],
    "N", "e-nờ", "nờ", cols[6], rows[2],
    "O", "o", "o", cols[7], rows[2],
    "Ô", "ô", "ô", cols[8], rows[2],
    "Ơ", "ơ", "ơ", cols[9], rows[2],
    "P", "pê", "pờ", cols[10], rows[2],
    "Q", "quy", "quờ", cols[1], rows[3],
    "R", "e-rờ", "rờ", cols[2], rows[3],
    "S", "ét-xì", "sờ", cols[3], rows[3],
    "T", "tê", "tờ", cols[4], rows[3],
    "U", "u", "u", cols[5], rows[3],
    "Ư", "ư", "ư", cols[6], rows[3],
    "V", "vê", "vờ", cols[7], rows[3],
    "X", "ích xì", "xờ", cols[8], rows[3],
    "Y", "i dài", "i", cols[9], rows[3],
    "/", "sắc", "69.723", cols[1], rows[5],
    "\\", "huyền", "72.63", cols[2], rows[5],
    "?", "hỏi", "74.9216", cols[3], rows[5],
    "~", "ngã", "78.96", cols[4], rows[5],
    ".", "nặng", "79.904", cols[5], rows[5],
];

export default class Table3d {
    constructor() {
        this.init();
        this.animate();
    }

    init() {

        this._objects = [];
        this._targets = { table: [], sphere: [], helix: [], grid: [] };

        this._renderer = new CSS3DRenderer();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('container').appendChild(this._renderer.domElement);

        this._camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        this._camera.position.set(-607, 515, 1648);

        this._controls = new OrbitControls(this._camera, this._renderer.domElement);
        this._controls.target = new THREE.Vector3(-695, 415, -364);
        this._controls.update();


        this._scene = new THREE.Scene();
        this._scene.background = new THREE.Color(0xffffff);



        // table

        for (let i = 0; i < table.length; i += 5) {

            const element = document.createElement('div');
            element.className = 'element';
            element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';

            const number = document.createElement('div');
            number.className = 'number';
            number.textContent = (i / 5) + 1;
            element.appendChild(number);

            const symbol = document.createElement('div');
            symbol.className = 'symbol';
            symbol.textContent = table[i];
            element.appendChild(symbol);

            const details = document.createElement('div');
            details.className = 'details';
            details.innerHTML = table[i + 1] + '<br>' + table[i + 2];
            element.appendChild(details);

            const objectCSS = new CSS3DObject(element);
            objectCSS.position.x = Math.random() * 4000 - 2000;
            objectCSS.position.y = Math.random() * 4000 - 2000;
            objectCSS.position.z = Math.random() * 4000 - 2000;
            this._scene.add(objectCSS);

            this._objects.push(objectCSS);

            //

            const object = new THREE.Object3D();
            object.position.x = (table[i + 3] * 140) - 1330;
            object.position.y = - (table[i + 4] * 180) + 990;

            this._targets.table.push(object);

        }

        // sphere

        const vector = new THREE.Vector3();

        for (let i = 0, l = this._objects.length; i < l; i++) {

            const phi = Math.acos(- 1 + (2 * i) / l);
            const theta = Math.sqrt(l * Math.PI) * phi;

            const object = new THREE.Object3D();

            object.position.setFromSphericalCoords(800, phi, theta);

            vector.copy(object.position).multiplyScalar(2);

            object.lookAt(vector);

            this._targets.sphere.push(object);

        }

        // helix

        for (let i = 0, l = this._objects.length; i < l; i++) {

            const theta = i * 0.175 + Math.PI;
            const y = - (i * 8) + 450;

            const object = new THREE.Object3D();

            object.position.setFromCylindricalCoords(900, theta, y);

            vector.x = object.position.x * 2;
            vector.y = object.position.y;
            vector.z = object.position.z * 2;

            object.lookAt(vector);

            this._targets.helix.push(object);

        }

        // grid

        for (let i = 0; i < this._objects.length; i++) {

            const object = new THREE.Object3D();

            object.position.x = ((i % 5) * 400) - 800;
            object.position.y = (- (Math.floor(i / 5) % 5) * 400) + 800;
            object.position.z = (Math.floor(i / 25)) * 1000 - 2000;

            this._targets.grid.push(object);

        }

        //





        this._controls.addEventListener('change', () => {
            this.rendering();
        });

        const buttonTable = document.getElementById('table');
        buttonTable.addEventListener('click', () => {

            this.transform(this._targets.table, 2000);

        });

        const buttonSphere = document.getElementById('sphere');
        buttonSphere.addEventListener('click', () => {
            this.transform(this._targets.sphere, 2000);

        });

        const buttonHelix = document.getElementById('helix');

        buttonHelix.addEventListener('click', () => {

            this.transform(this._targets.helix, 2000);

        });

        const buttonGrid = document.getElementById('grid');
        buttonGrid.addEventListener('click', () => {

            this.transform(this._targets.grid, 2000);

        });

        this.transform(this._targets.table, 2000);


        window.addEventListener('resize', () => {
            this.onWindowResize();
        });

        this.isRunning = true;

    }

    transform(targets, duration) {

        TWEEN.removeAll();

        for (let i = 0; i < this._objects.length; i++) {

            const object = this._objects[i];
            const target = targets[i];

            new TWEEN.Tween(object.position)
                .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();

            new TWEEN.Tween(object.rotation)
                .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();

        }

        new TWEEN.Tween(this)
            .to({}, duration * 2)
            .onUpdate(() => {
                this.rendering();
            })
            .start();

    }

    onWindowResize() {

        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(window.innerWidth, window.innerHeight);

    }

    animate() {

        requestAnimationFrame((t) => {


            if (this._previousRAF == null) {
                this._previousRAF = t;
            }
            if (this.isRunning) this.animate();

            if (t - this._previousRAF >= 10) {
                TWEEN.update();
                this._previousRAF = t;
            }
        });


    }

    rendering() {
        if (this._renderer) {
            this._renderer.render(this._scene, this._camera);
        }
    }

    stop() {
        this.isRunning = false;
    }

}