import * as THREE from 'three';
import { Loader } from './loader';

export class Animation {
    constructor(loader) {
        this.colors = {
            red: 0xf25346,
            white: 0xd8d0d1,
            brown: 0x59332e,
            pink: 0xF5986E,
            brownDark: 0x23190f,
            blue: 0x68c3c0
        };

        this.box = null;

        this.loader = loader;
        this.scene = this.loader.scene;
        
        this.createBox();
        this.createLights();
    }

    createLights() {
        this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
        this.shadowLight = new THREE.DirectionalLight(0xffffff, .9);
        this.ambientLight = new THREE.AmbientLight(0xdc8874, .5);

        this.shadowLight.position.set(0,150,50);
        this.shadowLight.castShadow = true;

        this.scene.add(this.shadowLight, this.ambientLight, this.hemisphereLight);
    }

    Box(setColor) {
        this.geometry = new THREE.BoxGeometry(50,50,50);
        this.material = new THREE.MeshPhongMaterial({
            color: setColor,
            flatShading: true,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.receiveShadow = true;
    }

    createBox() {
        this.box = new this.Box(this.colors.blue);
        this.scene.add(this.box.mesh);
    }
}