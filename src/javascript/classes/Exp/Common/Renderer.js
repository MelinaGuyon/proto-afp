import EffectComposer, { RenderPass, ShaderPass, CopyShader } from 'three-effectcomposer-es6'
import TweenLite from 'gsap'

class Renderer {

    constructor(options) {
      Storage.RendererClasses[options.name] = this
      this.name = options.name
      this.container = options.container

      this.renderer = new THREE.WebGLRenderer(window.innerWidth, window.innerHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize( window.innerWidth, window.innerHeight )
      this.renderer.setClearColor( 0xfcfcfc, 1)
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      this.container.appendChild( this.renderer.domElement )

      // this.renderer.setViewport( -100, 0, window.innerWidth , window.innerHeight )

      this.initScene()
      this.bind()
    }

    bind() {
      window.addEventListener('resize', this.onWindowResize, false)
    }

    initScene() {
      this.scene = new THREE.Scene()
      this.scene.add(Storage.CameraClasses[this.name].camera)
    }
    
    onWindowResize() {
      Storage.CameraClasses[Storage.expName].camera.aspect = window.innerWidth / window.innerHeight
      Storage.CameraClasses[Storage.expName].camera.updateProjectionMatrix()
      Storage.renderer.setSize(window.innerWidth, window.innerHeight)
		}
		
    render() {
      this.renderer.render(this.scene, Storage.CameraClasses[Storage.expName].camera)
      // this.renderer.render(this.scene2, Storage.CameraClasses[Storage.expName].camera)
    }
}

export default Renderer
