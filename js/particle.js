import { ParticleBase } from './particle-base';

export class Particle extends ParticleBase {
  constructor(config, animation, loader) {
    super(config, animation, loader);
    this.loader = loader;

    this.radiusBase = config.radius;
    this.sizeBase = config.size;
  }


  update() {

  }
}