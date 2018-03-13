import EffectComposer, { RenderPass, ShaderPass, CopyShader } from 'three-effectcomposer-es6'
import TweenLite from 'gsap'

class Renderer {

    constructor(options) {
      Storage.RendererClass = this
      this.container = document.getElementById( 'container' )
      this.renderer = new THREE.WebGLRenderer(window.innerWidth, window.innerHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize( window.innerWidth, window.innerHeight )
      this.renderer.setClearColor( 0xfcfcfc, 1)
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      this.container.appendChild( this.renderer.domElement )
      Storage.renderer = this.renderer

      this.initScene()
      this.bind()
    }

    bind() {
      window.addEventListener( 'resize', this.onWindowResize, false )
    }

    initScene() {
      this.scene = new THREE.Scene()
      Storage.scene = this.scene
    }
    
    onWindowResize() {
      Storage.camera.aspect = window.innerWidth / window.innerHeight
      Storage.camera.updateProjectionMatrix()
      Storage.renderer.setSize(window.innerWidth, window.innerHeight)
		}
		
    render() {
      this.renderer.render(this.scene, Storage.camera)
    }
}

export default Renderer
