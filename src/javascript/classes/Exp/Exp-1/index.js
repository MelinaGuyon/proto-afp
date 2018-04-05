import Camera from '../Common/Camera.js'
import Scene from '../Common/Scene.js'
import CanvasPanel from '../Common/CanvasPanel.js'
import Spline from '../Common/Spline.js'
import TextWriting from '../Common/TextWriting.js'

import Sphere from '../Common/Sphere.js'

import Ambiance from './Ambiance.js'
import ChaptersContainer from './ChaptersContainer.js'
import BetweenChapters from './BetweenChapters.js'

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

      // here to load things without affect animations
      this.chaptersContainer = new ChaptersContainer()
      this.chapter2 = new Chapitre2({
        relatedBox: this.chaptersContainer.chapterBoxes[1],
        relatedCamera: this.camera.camera,
        lightOpt: [this.ambiance]
      })
		}

		init = () => {
      Storage.CanvasPanelClass.hidePanel()
      this.placeOnSpline({
  				spline: new THREE.CatmullRomCurve3(datas.splines.enter),
          relatedCamera: this.camera,
          step: .30,
          index: 0,
          cbEnd: this.goToChapterOne
  			},
        .5
      )

      this.betweenChapters = new BetweenChapters()
		}

    goToChapterOne = () => {
      this.placeOnSpline({
  				spline: new THREE.CatmullRomCurve3(datas.splines.chapter1),
          relatedCamera: this.camera,
          step: .30,
          index: 1,
          cbEnd: () => { this.chapter2.init().then(this.goToChapterTwo) }
  			},
        .5
      )
    }

    goToChapterTwo = () => {
      this.placeOnSpline({
  				spline: new THREE.CatmullRomCurve3(datas.splines.chapter2),
          relatedCamera: this.camera,
          step: .30,
          index: 2
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
