import { ParticleBase } from './particle-base';

export class Particle extends ParticleBase {
  constructor(config, animation, loader) {
    super(config, animation, loader);
    this.loader = loader;

    this.timer = 0;
    this.increment = true;
    this.xInitial = config.x;
    this.yInitial = config.y;
    this.zInitial = config.z;
    this.radiusBase = config.radius;
    this.sizeBase = config.size;
    this.initialSpeed = config.initialSpeed;
  }

  easeInQuad(initial) {
    // t = current time, d = duration, b = initial position, c = change value
    // http://gizma.com/easing/#quad2
    let t = this.loader.elapsedMilliseconds;
    let d = 40000;
    let b = initial;
    let c = Math.sin(Date.now() * 0.00009);
    t /= d;
    return c * t * t + b;
  }

  update() {
    this.timer += 0.1;
    if (this.timer > 200) {
      this.increment = !this.increment;
      this.timer = 0;
    }

    if(this.increment) {
      this.mesh.position.x += this.easeInQuad(this.xInitial) * 0.009;
      this.mesh.position.y += this.easeInQuad(this.yInitial) * 0.009;
      this.mesh.position.z += this.easeInQuad(this.zInitial) * 0.009;
    } else {
      this.mesh.position.x -= this.easeInQuad(this.xInitial) * 0.009;
      this.mesh.position.y -= this.easeInQuad(this.yInitial) * 0.009;
      this.mesh.position.z -= this.easeInQuad(this.zInitial) * 0.009;
    }
  }
}