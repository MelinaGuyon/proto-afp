import EffectComposer, { RenderPass, ShaderPass, CopyShader } from 'three-effectcomposer-es6'
import TweenLite from 'gsap'

import '../../../../vendors/HorizontalBlurShader'
import '../../../../vendors/VerticalBlurShader'

class Composer {
    constructor(options) {
      Storage.ComposerClass = this
      this.composerActive = false

      this.initEffectComposer()

      setTimeout(() => {
        this.animateBlur(0)
      }, 2000)
    }
    
    initEffectComposer = () => {
      this.composer = new EffectComposer(Storage.RendererClass.renderer)
      this.composer.addPass(new RenderPass(Storage.SceneClasses.exp1.scene, Storage.CameraClasses.exp1.camera))

      // Add shaders
      const horizontalBlurShader = new ShaderPass(THREE.HorizontalBlurShader)
      this.composer.addPass(horizontalBlurShader)

      // const verticalBlurShaderPass = new ShaderPass(THREE.VerticalBlurShader)
      // this.composer.addPass(verticalBlurShaderPass)

      // And draw to the screen
      const copyPass = new ShaderPass(CopyShader)
      copyPass.renderToScreen = true
      this.composer.addPass(copyPass)
    }

    renderComposer = () => {
      this.composer.render()
    }

    animateBlur = (value) => {
      if (value === 0) {
        // blur
        this.composerActive = true
        TweenLite.to(this.composer.passes[1].uniforms.h, 0.6, {
          value: 2 / window.innerWidth,
          ease: Power2.easeIn,
        })
        // TweenLite.to(this.composer.passes[2].uniforms.v, 0.6, {
        //   value: 2 / window.innerHeight,
        //   ease: Power2.easeIn,
        // })
      } else if(value === 1) {
        // unblur
        TweenLite.to([this.composer.passes[1].uniforms.h, this.composer.passes[2].uniforms.v], 0.3, {
          value: 0.,
          ease: Power2.easeIn,
          onComplete: () => { this.composerActive = false }
        })
      }
    }
}

export default Composer
