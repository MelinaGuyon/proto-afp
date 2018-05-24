import ObjectsLoader from './ObjectsLoader'
import CursorLight from './CursorLight.js'
import raf from 'raf'

import datas from '../../../../datas/Experience1.js'

class Chapitre2 {
    constructor(options) {
		Storage.Chapitre2Class = this
    this.state = options

    this.modelsGroup

    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
    this.warriorsNumber = 0

		this.loadChapter()
    }

	loadChapter = () => {
    this.loader = new ObjectsLoader()
    this.loader.load().then((response) => {
      this.modelsGroup = response
    })
	}

  init = () => {
    this.displayChapterObjects()

    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve() }, 500)
    })
  }

  initInteraction = () => {
    this.initLight()
    this.bind()
  }

  remove = () => {
    setTimeout(() => {
      this.state.relatedBox.remove(this.modelsGroup)
      this.unbind()
    }, 4000)
  }

  bind = () => {
    document.addEventListener('mousemove', this.onMouseMove, { passive: true })
  }

  unbind = () => {
    document.removeEventListener('mousemove', this.onMouseMove, { passive: true })
  }

  onMouseMove = (event) => {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1
    this.raycaster.setFromCamera(this.mouse, this.state.relatedCamera.camera)

    this.checkRaycaster(this.raycaster)
  }


  initLight = () => {
    this.state.lightOpt.push(this.modelsGroup.children[0].children[0])

    console.log("coucou", this.modelsGroup.children[0])
    this.light = new CursorLight({
      sceneIndex: 1,
      relatedCamera: this.state.relatedCamera.camera,
      intensity: 0,
      sphereVisible: false,
      castingShadow: false,
      intersects: this.state.lightOpt
    })
    setTimeout(() => {
      this.light.updateCastingShadow(true)
      this.light.updateSphereVisibility(true)
      this.light.updateLightIntensity(2)
    }, 1000)
    setTimeout(() => {
      Storage.InterfaceClass.cursor.target()
    }, 2000)
  }

  displayChapterObjects = () => {
    this.state.relatedBox.add(this.modelsGroup)
  }

  checkRaycaster = (raycaster) => {
    for ( let i  = 0; i < this.modelsGroup.children[1].children.length; i ++ ) {
      this.warrior = this.modelsGroup.children[1].children[i].children
      let intersectsWarrior = raycaster.intersectObjects(this.warrior, false)

      if (intersectsWarrior[0] && this.warrior[0].passed != true ) {
        this.warriorsNumber ++
        this.warrior[0].passed = true
        console.log(this.warriorsNumber)
      }
    }

    if ( this.warriorsNumber === this.modelsGroup.children[1].children.length ) {
      this.state.relatedCamera.updateMovementRange(0, 0)
      this.unbind()
      Storage.SplineClass.unbind()

      setTimeout(() => {
        Storage.Experience1Class.animateCamera(datas.animations.toChapterThree, 800, this.state.cbAfterInteraction)
      }, 1000)


    }

  }
}

export default Chapitre2
