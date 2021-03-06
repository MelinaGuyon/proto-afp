import anime from 'animejs'

import Camera from '../Common/Camera.js'
import Scene from '../Common/Scene.js'
import Spline from '../Common/Spline.js'
import Animate from '../Common/Animate.js'

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
      this.splineIndex = 0
  		this.initPreview()
    }

    initPreview = () => {
			this.camera = new Camera({ name: 'exp1', lookAround: true, movementRange: .05  })
      this.scene = new Scene({ name: 'exp1'  })
      this.ambiance = new Ambiance()
      this.chaptersContainer = new ChaptersContainer()
      this.anime = new Animate({ relatedCamera: this.camera })

      // here to load things without affect animations, because they load all on init
      this.introduction = new Introduction({
        relatedBox: this.chaptersContainer.chapterBoxes[0],
        relatedCamera: this.camera
      })
      this.chapter1 = new Chapitre1({
        relatedBox: this.chaptersContainer.chapterBoxes[1],
        relatedCamera: this.camera.camera,
        cbAfterInteraction: this.goToChapterOne
      })
      this.chapter2 = new Chapitre2({
        relatedBox: this.chaptersContainer.chapterBoxes[2],
        relatedCamera: this.camera,
        lightOpt: [this.ambiance],
        cbAfterInteraction: () => { this.chapter3.init() },
        cbAfterInteraction2: () => { this.goToChapterThree() }
      })
      this.chapter3 = new Chapitre3({
        relatedBox: this.chaptersContainer.chapterBoxes[3],
        relatedCamera: this.camera,
        cbAfterInteraction: () => { this.conclusion.init().then(this.goToConclusion) }
      })
      this.conclusion = new Conclusion({
        relatedBox: this.chaptersContainer.chapterBoxes[4],
        relatedCamera: this.camera
      })

		}

		init = () => {
      Storage.InterfaceClass.displayExpInterface()
      Storage.InterfaceClass.updateLogo('assets/interface/global/logo_noir.svg')

      this.betweenChapters = new BetweenChapters()
      this.chaptersConclusion = new ChaptersConclusionClass()

      this.animateCamera(datas.animations.enter, 4000, this.betweenIntroductionChapterOne)

      Storage.SoundManagerClass.launchBackgroundMusic("assets/sound/fondsonore.mp3")
      Storage.SoundManagerClass.launchAmbianceSound("assets/sound/intro.mp3")

      //to test
      // this.splineIndex = 4
      // this.conclusion.init().then(this.goToConclusion)

      Storage.TextWriting.addTitle(datas.chaptersTitle[0], 5000)
		}

    betweenIntroductionChapterOne = () => {
      console.log("entre intro et chapitre 1")
      this.placeOnSpline({
          spline: new THREE.CatmullRomCurve3(datas.splines.betweenIntroductionChapterOne),
          relatedCamera: this.camera,
          step: 0,
          index: this.splineIndex,
          cbEnd: () => {
            this.chapter1.initInteraction()
            Storage.InterfaceClass.instructions.showInstruction()
          }
        },
        .5
      )
      this.introduction.remove()
      setTimeout(() => { this.betweenChapters.launchVoiceOver(0)() }, 2500)
      setTimeout(() => { Storage.InterfaceClass.instructions.showInstruction() }, 5000)
      setTimeout(() => { this.spline.updateStep(0.1) }, 7000)
    }

    goToChapterOne = () => {
      console.log("entre dans chapitre 1")
      setTimeout(() => { this.betweenChapters.launchVoiceOver(2)() }, 4000)
      setTimeout(() => { Storage.SoundManagerClass.launchAmbianceSound("assets/sound/vraieville_NorthKorea.mp3") }, 6000)

      this.placeOnSpline({
  				spline: new THREE.CatmullRomCurve3(datas.splines.chapter1),
          relatedCamera: this.camera,
          step: .06,
          index: this.splineIndex,
          cbEnd: () => { this.chapter2.init().then(this.goToChapterTwo) }
  			},
        .5
      )
      this.chaptersConclusion.updateMedia(datas.conclusions[0][0], datas.conclusions[0][1])
    }

    goToChapterTwo = () => {
      console.log("entre dans chapitre 2")
      setTimeout(() => { Storage.SoundManagerClass.launchAmbianceSound("assets/sound/militarySong.mp3") }, 2000)

      this.placeOnSpline({
  				spline: new THREE.CatmullRomCurve3(datas.splines.chapter2),
          relatedCamera: this.camera,
          step: .06,
          index: this.splineIndex,
          cbEnd: () => {
            this.chapter2.initInteraction()
            Storage.InterfaceClass.instructions.showInstruction()
          }
  			},
        .5
      )
      this.chaptersConclusion.updateMedia(datas.conclusions[1][0], datas.conclusions[1][1])
      Storage.TextWriting.addTitle(datas.chaptersTitle[1], 3000)
      //setTimeout(() => { Storage.InterfaceClass.title.animeTitle(datas.chaptersTitle[1]) }, 3000)
      setTimeout(() => { Storage.InterfaceClass.title.animeTitle(datas.chaptersTitleSrc[1]) }, 3000)
      this.chapter1.remove()
    }

    goToChapterThree = () => {
      console.log("entre dans chapitre 3")
      setTimeout(() => { Storage.SoundManagerClass.launchAmbianceSound("assets/sound/marchingSound.mp3") }, 2000)

      this.placeOnSpline({
          spline: new THREE.CatmullRomCurve3(datas.splines.chapter3),
          relatedCamera: this.camera,
          step: .045,
          index: this.splineIndex
        },
        .5
      )
      setTimeout(() => { Storage.InterfaceClass.instructions.showInstruction() }, 7000)
      this.chaptersConclusion.updateMedia(datas.conclusions[2][0], datas.conclusions[2][1])
      Storage.TextWriting.addTitle(datas.chaptersTitle[2], 3000)
      //setTimeout(() => { Storage.InterfaceClass.title.animeTitle(datas.chaptersTitle[2]) }, 3000)
      setTimeout(() => { Storage.InterfaceClass.title.animeTitle(datas.chaptersTitleSrc[2]) }, 3000)
      this.chapter2.remove()
    }

    goToConclusion = () => {
      console.log("entre dans conclusion")
      Storage.SoundManagerClass.launchAmbianceSound("assets/sound/vraieville_NorthKorea.mp3")

      setTimeout(() => { this.betweenChapters.launchVoiceOver(8)() }, 1000)

      this.placeOnSpline({
          spline: new THREE.CatmullRomCurve3(datas.splines.conclusion),
          relatedCamera: this.camera,
          step: .20,
          index: this.splineIndex,
          cbEnd: () => {
            this.betweenChapters.launchVoiceOver(9)()
            Storage.ConclusionClass.conclusionEnding()
            setTimeout(() => {
              Storage.InterfaceClass.actus.showActu()
              Storage.InterfaceClass.updateLogo('assets/interface/global/logo_blanc.svg')
            }, 17500)
          }
        },
        .5
      )
      this.chapter3.remove()
      Storage.InterfaceClass.actus.makeActu()
    }

    placeOnSpline = (opt, mvmt, wait) => {
      if (this.spline) this.spline.unbind()
      this.spline = new Spline(opt)

      this.spline.placeCameraAtFirstPoint()

      this.camera.updateMovementRange(mvmt, 1900)
      this.splineIndex++
    }

    animateCamera = (opt, time, cb) => {
      this.anime.animateAtFirstPoint(opt[0], opt[1], time, cb)
    }
}

export default Experience1
