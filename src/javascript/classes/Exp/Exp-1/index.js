import Camera from '../Common/Camera.js'
import Scene from '../Common/Scene.js'
import CanvasPanel from '../Common/CanvasPanel.js'
import Spline from '../Common/Spline.js'
import TextWriting from '../Common/TextWriting.js'

import Sphere from '../Common/Sphere.js'

import CursorLight from './CursorLight.js'
import Ambiance from './Ambiance.js'
import Chapters from './Chapters.js'

import datas from '../../../datas/Experience1.js'

import Chapitre2 from './Chap-2/index.js'

class Experience1 {
    constructor(options) {
		Storage.Experience1Class = this
		this.initPreview()
    }

    initPreview = () => {
			this.camera = new Camera({ name: 'exp1', lookAround: true, movementRange: .05  })
      this.scene = new Scene({ name: 'exp1'  })

			this.ambiance = new Ambiance()
      this.spherePreview = new Sphere({ relatedScene: this.scene.scene,  color: 0x303848, posZ: 2000 })
      this.light = new CursorLight({ sceneIndex: 1, relatedCamera: this.camera.camera, intensity: 0, sphereVisible: false, intersects: [this.spherePreview, this.ambiance] })
		}

		init = () => {
      Storage.CanvasPanelClass.hidePanel()
      this.chapters = new Chapters()
      this.placeOnSpline({
  				spline: new THREE.SplineCurve3(datas.splines.enter),
          relatedCamera: this.camera,
          step: .30
  			},
        .5
      )

      // this.text = new TextWriting()

      setTimeout(() => {
        console.log('chapter 1')
        // this.initChapterOne()
      }, 15000)
      setTimeout(() => {
        console.log('chapter 2')
        this.initChapterTwo()
      }, 8000)

      new Chapitre2({ relatedBox: this.chapters.chapterBoxes[1] })
      this.initLight()
		}

    initLight = () => {
      this.light.updateSphereVisibility(true)
      this.light.updateLightIntensity(1)
    }

    initChapterOne = () => {
      this.placeOnSpline({
  				spline: new THREE.SplineCurve3(datas.splines.chapter1),
          relatedCamera: this.camera,
          step: .30
  			},
        .5
      )
    }

    initChapterTwo = () => {
      this.placeOnSpline({
  				spline: new THREE.SplineCurve3(datas.splines.chapter2),
          relatedCamera: this.camera,
          step: .30
  			},
        .5
      )
    }

    placeOnSpline = (opt, mvmt) => {
      if (this.spline) this.spline.unbind()
      this.spline = new Spline(opt)
			this.spline.placeCameraAtFirstPoint()
      this.camera.updateMovementRange(mvmt, 1900)
    }
}

export default Experience1
