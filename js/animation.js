import * as THREE from 'three';
import { Particle } from './particle';

export class Animation {
  constructor(loader) {
    this.loader = loader;

    this.colors = {
      white: 0xd8d0d1,
      blue: 0x68c3c0,
    };

    // Add lights to the scene
    this.createLights();

    // Set basic geometry variables for particles
    this.sphereGeometry = new THREE.SphereBufferGeometry(1, 16, 16);
    this.boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
    this.center = new THREE.Vector3();

    // Set base for particles
    this.particles = [];
    this.particleGroup = new THREE.Object3D();
    this.particleGroup.scale.set(0.001, 0.001, 0.001);

    this.rings = 8;
    this.radius = 0;
    this.radiusGrowth = .2;

    for(let i = 0; i < this.rings; i++) {
      let count = i === 0 ? 1 : 1 + Math.ceil(i * 20);
      let z = 0;

      for(let j = 0; j < count; j++) {
        let angle = (j / count) * Math.PI * 4;
        let x = Math.sin(angle) * this.radius;
        let y = Math.cos(angle) * this.radius;
        let size = 1;
        let color = this.colors.white;

        this.particles.push(new Particle({
          group: this.particleGroup,
          x: x,
          y: y,
          z: z,
          size: size,
          radius: this.radius,
          angle: angle,
          color: color,
          opacity: 1,
        }, this, this.loader));

        this.radius += this.radiusGrowth;
      }
    }
    this.particleGroup.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/3));
    this.particleGroup.position.y = 40;
    this.loader.scene.add(this.particleGroup);
  }

  createLights() {
    this.pointLightOne = new THREE.PointLight(this.colors.blue, 2, 50, 1);
    this.pointLightOne.position.set(0, 0, 0);

    this.pointLightTwo = new THREE.PointLight(this.colors.blue, 3, 100, 1);
    this.pointLightTwo.position.set(0, -80, 0);

    this.ambient = new THREE.AmbientLight(this.colors.white, 1);

    this.loader.scene.add(this.pointLightOne, this.pointLightTwo, this.ambient);
  }

  updateParticles() {
    let i = this.particles.length;
    while(i--) {
      this.particles[i].update();
    }
  }

  update() {
    this.updateParticles();
  }

}