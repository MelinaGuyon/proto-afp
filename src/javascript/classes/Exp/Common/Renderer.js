import EffectComposer, { RenderPass, ShaderPass, CopyShader } from 'three-effectcomposer-es6'
import TweenLite from 'gsap'

class Renderer {
    constructor(options) {
      Storage.RendererClass = this
      this.container = options.container

      this.renderer = new THREE.WebGLRenderer(window.innerWidth, window.innerHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize( window.innerWidth, window.innerHeight )
      this.renderer.setClearColor( 0xfcfcfc, 1)
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      this.container.appendChild( this.renderer.domElement )

      this.renderer.setViewport( 0, 0, window.innerWidth , window.innerHeight )

      this.bind()
    }

    bind() {
      window.addEventListener('resize', this.onWindowResize, false)
    }

    updateCanvasPos(startX, startY, width, heigth) {
      this.renderer.setViewport( startX, startY, width, heigth )
    }

    onWindowResize() {
      Storage.CameraClasses[Storage.expName].camera.aspect = window.innerWidth / window.innerHeight
      Storage.CameraClasses[Storage.expName].camera.updateProjectionMatrix()
      Storage.renderer.setSize(window.innerWidth, window.innerHeight)
		}

    render() {
      if (Storage.SceneClasses['exp1'] && Storage.CameraClasses['exp1'])
        this.renderer.render(Storage.SceneClasses['exp1'].scene, Storage.CameraClasses['exp1'].camera)
    }
}

export default Renderer
