import EffectComposer, { RenderPass, ShaderPass, CopyShader } from 'three-effectcomposer-es6'
import TweenLite from 'gsap'

import '../../../../vendors/DisplacementShader'

class Composer {
    constructor(options) {
      Storage.ComposerClass = this
      this.isActive = false

      this.initEffectComposer()

      // setTimeout(() => { this.active(true) }, 2000)
    }
    
    initEffectComposer = () => {
      this.composer = new EffectComposer(Storage.RendererClass.renderer)
      this.composer.addPass(new RenderPass(Storage.SceneClasses.exp1.scene, Storage.CameraClasses.exp1.camera))

      // Add shaders
      const displacement = new ShaderPass(THREE.Displacement)
      this.composer.addPass(displacement)

      // And draw to the screen
      const copyPass = new ShaderPass(CopyShader)
      copyPass.renderToScreen = true
      this.composer.addPass(copyPass)
    }

    renderComposer = () => {
      if(this.composer.passes[1]) this.composer.passes[1].uniforms.u_time.value += .02
      this.composer.render()
    }

    active = (bool) => {
      this.isActive = bool
    }
}

// à mettre juste après l'appel au shader THREE.Displacement'
// if (module.hot) {
//   module.hot.accept('glsl/Hblur.frag', () => {
//     frag = require('glsl/HBlur.frag')
//     displacement.material.fragmentShader = frag
//     displacement.material.needsUpdate = true
//   })
// }

export default Composer
