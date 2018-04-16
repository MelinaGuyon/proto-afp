import EffectComposer, { RenderPass, ShaderPass, CopyShader } from 'three-effectcomposer-es6'
import TweenLite from 'gsap'

class Scene {

    constructor(options) {
      Storage.SceneClasses[options.name] = this
      this.name = options.name

      this.initScene()
    }

    initScene() {
      this.scene = new THREE.Scene()
      this.scene.fog = new THREE.FogExp2( 0x303848, 0.00045 )
      this.scene.add(Storage.CameraClasses[this.name].camera)
    }

}

export default Scene
