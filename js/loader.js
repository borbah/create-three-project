import * as THREE from 'three';

export class Loader {

  constructor(Animation) {
    this.dom = {
      html: document.documentElement,
      container: document.querySelector('.app'),
    }

    this.camera = null;

    this.setupTime();
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.listen();
    this.onResize();
    this.animation = new Animation(this);

    this.loop();
  }

  setupTime() {
    this.timescale = 1;
    this.clock = new THREE.Clock();
    this.deltaTimeSeconds = this.clock.getDelta() * this.timescale;
    this.deltaTimeMilliseconds = this.deltaTimeSeconds * 1000;
    this.deltaTimeNormal = this.deltaTimeMilliseconds / (1000 / 60);
    this.elapsedMilliseconds = 0;
  }

  setupScene() {
    this.scene = new THREE.Scene();
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(35, 0, 0.0001, 10000);

    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 150;
    this.camera.rotateX(0.25);
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this.dom.container.appendChild(this.renderer.domElement);
  }

  listen() {
    window.addEventListener('resize', (e) => this.onResize(e));
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = window.devicePixelRatio > 1 ? 2 : 1;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(this.width, this.height);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  update() {
    this.deltaTimeSeconds = this.clock.getDelta();
    if(this.diffTime) {
      this.deltaTimeSeconds -= this.diffTime;
      this.diffTime = 0;
    }
    this.deltaTimeSeconds *= this.timescale;
    this.deltaTimeMilliseconds = this.deltaTimeSeconds * 1000;
    this.deltaTimeNormal = this.deltaTimeMilliseconds / (1000 / 60);
    this.elapsedMilliseconds += this.deltaTimeMilliseconds;

    this.animation.update();
  }

  loop() {
    this.update();
    this.render();
    this.raf = window.requestAnimationFrame(() => this.loop());
  }

}
