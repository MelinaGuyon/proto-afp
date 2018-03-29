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
      this.scene.add(Storage.CameraClasses[this.name].camera)

      // if (this.name === 'exp2') {
      //   this.scene.position.set(900, 0, -8000)
      //   this.scene.updateMatrixWorld()
      //   console.log(this.scene)
      // }
    }

}

export default Scene
