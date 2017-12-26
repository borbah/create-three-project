import { ParticleBase } from './particle-base';

export class Particle extends ParticleBase {
  constructor(config, animation, loader) {
    super(config, animation, loader);
    this.loader = loader;
    
    this.angle = config.angle;
    this.radiusBase = config.radius;
    this.sizeBase = config.size;
  }

  update() {
    this.angle -= (Math.cos(this.loader.elapsedMilliseconds * 0.0025 - this.radiusBase * 0.15) * 0.02) * this.loader.deltaTimeNormal;
    this.mesh.position.y = Math.cos(this.angle) * this.radiusBase / 3;
    this.mesh.position.x = Math.cos(this.angle) * this.radiusBase / 3;
    this.mesh.position.y = Math.sin(this.angle) * this.radiusBase / 3;
    this.mesh.position.z = Math.cos(this.loader.elapsedMilliseconds * 0.0005 - this.radiusBase * 0.3) * 30;
  }
}