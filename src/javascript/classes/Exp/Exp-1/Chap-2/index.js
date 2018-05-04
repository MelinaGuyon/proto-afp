import ObjectsLoader from './ObjectsLoader'
import CursorLight from './CursorLight.js'
import raf from 'raf'


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
    this.initLight()
    this.bind()

    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve() }, 500)
    })
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
    this.state.lightOpt.push(this.modelsGroup.children[0])
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
      this.light.updateLightIntensity(1)
    }, 4000)
    setTimeout(() => {
      Storage.InterfaceClass.cursor.target()
    }, 4500)
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
      console.log(this.state.relatedCamera)
      this.state.relatedCamera.updateMovementRange(0, 0)
      this.unbind()

      setTimeout(() => {
        Storage.Experience1Class.spline.animateAtFirstPoint(  
          [
          new THREE.Vector3( 600, 250, -21500),
          new THREE.Vector3( 1200, 250, -22375),
          new THREE.Vector3( 1200, 250, -23250),
          new THREE.Vector3( 600, 250, -24125),
          new THREE.Vector3( 0, 250, -25000),
          ], 
          [
          new THREE.Vector3( 0, -Math.PI/2, -Math.PI/4),
          new THREE.Vector3( 0, 0, 0),
          new THREE.Vector3( 0, Math.PI/4, Math.PI/4),
          new THREE.Vector3( 0, Math.PI/2, Math.PI/8),
          new THREE.Vector3( 0, 0, 0),
          ], 
          800)
      }, 1000)


    }

  }
}

export default Chapitre2
