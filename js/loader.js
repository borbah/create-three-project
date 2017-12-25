import * as THREE from 'three';

export class Loader {

  constructor(Animation) {
    this.dom = {
      html: document.documentElement,
      container: document.querySelector('.app'),
    }

    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.listen();
    this.onResize();
    this.animation = new Animation(this);

    this.box = this.animation.box;

    this.loop();
  }

  setupScene() {    
    this.scene = new THREE.Scene();
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(100, 0, 0.0001, 10000);

    this.camera.position.x = 0;
    this.camera.position.y = 10;
    this.camera.position.z = 200;
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
		this.dpr = window.devicePixelRatio > 1 ? 2 : 1

		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();

		this.renderer.setPixelRatio(this.dpr);
		this.renderer.setSize(this.width, this.height);
	}

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  loop() {
    this.render();
    this.box.mesh.rotation.x += 0.01;
    this.box.mesh.rotation.y += 0.02;
    this.raf = window.requestAnimationFrame(() => this.loop());
  }

}
