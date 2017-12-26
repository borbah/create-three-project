import { ParticleBase } from './particle-base';

export class Particle extends ParticleBase {
  constructor(config, animation, loader) {
    super(config, animation, loader);
    
    this.angle = config.angle;
    this.radiusBase = config.radiusBase;
    this.sizeBase = config.size;
  }
}