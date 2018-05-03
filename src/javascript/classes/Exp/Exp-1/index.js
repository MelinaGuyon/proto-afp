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
import Chapitre3 from './Chap-3/index.js'
import Conclusion from './Conclusion/index.js'

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
      // this may have to change
      this.chapter1 = new Chapitre1({
        relatedBox: this.chaptersContainer.chapterBoxes[0],
        relatedCamera: this.camera.camera,
        lightOpt: [this.ambiance],
        cbMiddle: this.goToChapterOne
      })
      this.chapter2 = new Chapitre2({
        relatedBox: this.chaptersContainer.chapterBoxes[1],
        relatedCamera: this.camera.camera,
        lightOpt: [this.ambiance]
      })
      this.chapter3 = new Chapitre3({
        relatedBox: this.chaptersContainer.chapterBoxes[2],
        relatedCamera: this.camera,
        lightOpt: [this.ambiance]
      })
      this.conclusion = new Conclusion({
        relatedBox: this.chaptersContainer.chapterBoxes[3],
        relatedCamera: this.camera,
        lightOpt: [this.ambiance]
      })

		}

		init = () => {
      Storage.InterfaceClass.displayExpInterface()
      Storage.HiddingPanelClass.hidePanel()
      this.placeOnSpline({
  				spline: new THREE.CatmullRomCurve3(datas.splines.enter),
          relatedCamera: this.camera,
          step: .30,
          index: 0
  			},
        .5
      )

      this.betweenChapters = new BetweenChapters()
      this.chaptersConclusion = new ChaptersConclusionClass()

      Storage.TextWriting.addTitle(datas.chaptersTitle[0])
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
      this.chaptersConclusion.updateMedia('assets/conclusion/video.mp4', 'video')
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
          step: .10,
          index: 3,
          cbEnd: this.betweenChaptersTwoThree
  			},
        .5
      )
      this.chaptersConclusion.updateMedia('assets/conclusion/01.jpg', 'photo')
    }

    betweenChaptersTwoThree = () => {
      console.log("entre chap 2 et 3")
      this.placeOnSpline({
          spline: new THREE.CatmullRomCurve3(datas.splines.betweenChaptersTwoThree),
          relatedCamera: this.camera,
          step: .30,
          index: 4,
          cbEnd: () => { this.chapter3.init().then(this.goToChapterThree) }
        },
        .5
      )
    }

    goToChapterThree = () => {
      console.log("entre dans chapitre 3")
      this.placeOnSpline({
          spline: new THREE.CatmullRomCurve3(datas.splines.chapter3),
          relatedCamera: this.camera,
          step: .10,
          index: 5,
          cbEnd: this.betweenChaptersThreeConclusion
        },
        .5
      )
      this.chaptersConclusion.updateMedia('assets/conclusion/01.jpg', 'photo')
    }

    betweenChaptersThreeConclusion = () => {
      console.log("entre chap 3 et conclusion")
      this.placeOnSpline({
          spline: new THREE.CatmullRomCurve3(datas.splines.betweenChaptersThreeConclusion),
          relatedCamera: this.camera,
          step: .30,
          index: 6,
          cbEnd: () => { this.conclusion.init().then(this.goToConclusion) }
        },
        .5
      )
    }

    goToConclusion = () => {
      console.log("entre dans conclusion")
      this.placeOnSpline({
          spline: new THREE.CatmullRomCurve3(datas.splines.conclusion),
          relatedCamera: this.camera,
          step: .10,
          index: 7,
          cbEnd: () => { Storage.InterfaceClass.actus.showActu() }
        },
        .5
      )
      this.chaptersConclusion.updateMedia('assets/conclusion/01.jpg', 'photo')
      Storage.InterfaceClass.actus.makeActu()
    }

    placeOnSpline = (opt, mvmt) => {
      if (this.spline) this.spline.unbind()
      this.spline = new Spline(opt)
			this.spline.placeCameraAtFirstPoint()
      this.camera.updateMovementRange(mvmt, 1900)
    }
}

export default Experience1
