import anime from 'animejs'

import Camera from '../Common/Camera.js'
import Scene from '../Common/Scene.js'
import Spline from '../Common/Spline.js'
import Sphere from '../Common/Sphere.js'

import Ambiance from './Ambiance.js'
import ChaptersContainer from './ChaptersContainer.js'
import BetweenChapters from './BetweenChapters.js'

import datas from '../../../datas/Experience1.js'

import Chapitre1 from './Chap-1/index.js'
import Chapitre2 from './Chap-2/index.js'

import ChaptersConclusionClass from './ChaptersConclusion.js'

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

      this.chaptersContainer = new ChaptersContainer()

      // here to load things without affect animations, because they load all on init
      this.chapter1 = new Chapitre1({
        relatedBox: this.chaptersContainer.chapterBoxes[0],
        relatedCamera: this.camera.camera,
        lightOpt: [this.ambiance],
        cbMiddle: this.goToChapterOne
      })
      this.conclusion1 = new ChaptersConclusionClass({
        relatedCamera: this.camera.camera,
        media: "video",
        url : "assets/video.mp4"
      })

      this.chapter2 = new Chapitre2({
        relatedBox: this.chaptersContainer.chapterBoxes[1],
        relatedCamera: this.camera.camera,
        lightOpt: [this.ambiance]
      })
      this.conclusion2 = new ChaptersConclusionClass({
        relatedCamera: this.camera.camera,
        media: "video",
        url: "assets/video.mp4"
      })
		}

		init = () => {
      Storage.HiddingPanelClass.hidePanel()
      this.chapter1.init()
      this.placeOnSpline({
  				spline: new THREE.CatmullRomCurve3(datas.splines.enter),
          relatedCamera: this.camera,
          step: .30,
          index: 0
  			},
        .5
      )

      this.betweenChapters = new BetweenChapters()
		}

    goToChapterOne = () => {
      console.log("entre dans chapitre 1")
      this.placeOnSpline({
  				spline: new THREE.CatmullRomCurve3(datas.splines.chapter1),
          relatedCamera: this.camera,
          step: .30,
          index: 1,
          cbEnd: this.betweenChaptersOneTwo
  			},
        .5
      )
    }

    betweenChaptersOneTwo = () => {
      console.log("entre chap 1 et 2")
      this.placeOnSpline({
          spline: new THREE.CatmullRomCurve3(datas.splines.betweenChaptersOneTwo),
          relatedCamera: this.camera,
          step: .30,
          index: 2,
          cbEnd: () => { this.chapter2.init().then(this.goToChapterTwo) }
        },
        .5
      )
    }

    goToChapterTwo = () => {
      console.log("entre dans chapitre 2")
      this.placeOnSpline({
  				spline: new THREE.CatmullRomCurve3(datas.splines.chapter2),
          relatedCamera: this.camera,
          step: .30,
          index: 3
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
