import anime from 'animejs'

import Camera from '../Common/Camera.js'
import Scene from '../Common/Scene.js'
import Spline from '../Common/Spline.js'
import Sphere from '../Common/Sphere.js'

import Ambiance from './Ambiance.js'
import ChaptersContainer from './ChaptersContainer.js'
import BetweenChapters from './BetweenChapters.js'

import datas from '../../../datas/Experience1.js'

import Introduction from './Introduction/index.js'
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
      this.introduction = new Introduction({
        relatedBox: this.chaptersContainer.chapterBoxes[0],
        relatedCamera: this.camera,
        lightOpt: [this.ambiance]
      })
      this.chapter1 = new Chapitre1({
        relatedBox: this.chaptersContainer.chapterBoxes[1],
        relatedCamera: this.camera.camera,
        lightOpt: [this.ambiance],
        cbMiddle: this.goToChapterOne
      })
      this.chapter2 = new Chapitre2({
        relatedBox: this.chaptersContainer.chapterBoxes[2],
        relatedCamera: this.camera.camera,
        lightOpt: [this.ambiance]
      })
      this.chapter3 = new Chapitre3({
        relatedBox: this.chaptersContainer.chapterBoxes[3],
        relatedCamera: this.camera,
        lightOpt: [this.ambiance]
      })
      this.conclusion = new Conclusion({
        relatedBox: this.chaptersContainer.chapterBoxes[4],
        relatedCamera: this.camera,
        lightOpt: [this.ambiance]
      })

		}

		init = () => {
      Storage.InterfaceClass.displayExpInterface()
      Storage.HiddingPanelClass.hidePanel()

      this.introduction.init().then(
        this.placeOnSpline({
          spline: new THREE.CatmullRomCurve3(datas.splines.enter),
          relatedCamera: this.camera,
          step: .30,
          index: 0,
          cbEnd: this.betweenIntroductionChapterOne
        }, .0)
      )

      this.betweenChapters = new BetweenChapters()
      this.chaptersConclusion = new ChaptersConclusionClass()

      // this.goToChapterOne()

      Storage.TextWriting.addTitle(datas.chaptersTitle[0])
		}

    betweenIntroductionChapterOne = () => {
      console.log("entre intro et chapitre 1")
      this.placeOnSpline({
          spline: new THREE.CatmullRomCurve3(datas.splines.betweenIntroductionChapterOne),
          relatedCamera: this.camera,
          step: .30,
          index: 1
        },
        .5
      )
    }

    goToChapterOne = () => {
      console.log("entre dans chapitre 1")
      this.placeOnSpline({
  				spline: new THREE.CatmullRomCurve3(datas.splines.chapter1),
          relatedCamera: this.camera,
          step: .10,
          index: 2,
          cbEnd: this.betweenChaptersOneTwo
  			},
        .5
      )
      this.chaptersConclusion.updateMedia(datas.conclusions[0][0], datas.conclusions[0][1])
    }

    betweenChaptersOneTwo = () => {
      console.log("entre chap 1 et 2")
      this.placeOnSpline({
          spline: new THREE.CatmullRomCurve3(datas.splines.betweenChaptersOneTwo),
          relatedCamera: this.camera,
          step: .30,
          index: 3,
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
          index: 4,
          cbEnd: this.betweenChaptersTwoThree
  			},
        .5
      )
      this.chaptersConclusion.updateMedia(datas.conclusions[1][0], datas.conclusions[1][1])
    }

    betweenChaptersTwoThree = () => {
      console.log("entre chap 2 et 3")
      this.placeOnSpline({
          spline: new THREE.CatmullRomCurve3(datas.splines.betweenChaptersTwoThree),
          relatedCamera: this.camera,
          step: .30,
          index: 5,
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
          index: 6,
          cbEnd: this.betweenChaptersThreeConclusion
        },
        .5
      )
      this.chaptersConclusion.updateMedia(datas.conclusions[2][0], datas.conclusions[2][1])
    }

    betweenChaptersThreeConclusion = () => {
      console.log("entre chap 3 et conclusion")
      this.placeOnSpline({
          spline: new THREE.CatmullRomCurve3(datas.splines.betweenChaptersThreeConclusion),
          relatedCamera: this.camera,
          step: .30,
          index: 7,
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
          index: 8,
          cbEnd: () => { Storage.InterfaceClass.actus.showActu() }
        },
        .5
      )
      Storage.InterfaceClass.actus.makeActu()
    }

    placeOnSpline = (opt, mvmt) => {
      if (this.spline) this.spline.unbind()
      this.spline = new Spline(opt)

      if (opt.index === 0) { this.spline.animateAtFirstPoint(
      [
        new THREE.Vector3( 0, 950, 2000),
        new THREE.Vector3( 0, 900, 320),
        new THREE.Vector3( 0, 600, -1360),
        new THREE.Vector3( 0, 600, -3040),
        new THREE.Vector3( 0, 600, -4720),
        new THREE.Vector3( 0, 600, -6400)
      ],
      [
        new THREE.Vector3( 0, 0, Math.PI/3),
        new THREE.Vector3( 0, 0, Math.PI/3*2),
        new THREE.Vector3( 0, 0, Math.PI/3*3),
        new THREE.Vector3( 0, 0, Math.PI/3*4),
        new THREE.Vector3( 0, 0, Math.PI/3*5),
        new THREE.Vector3( 0, 0, Math.PI/3*6)
      ], 800
      ) }
      else { this.spline.placeCameraAtFirstPoint() }

      this.camera.updateMovementRange(mvmt, 1900)
    }
}

export default Experience1
