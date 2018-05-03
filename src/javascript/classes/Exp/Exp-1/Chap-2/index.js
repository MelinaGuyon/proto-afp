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
    raf.add(this.animate)

    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve() }, 500)
    })
  }

  bind = () => {
    document.addEventListener('mousemove', this.onMouseMove, { passive: true })
  }

  unind = () => {
    document.removeEventListener('mousemove', this.onMouseMove, { passive: true })
  }

  onMouseMove = (event) => {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1
    this.raycaster.setFromCamera(this.mouse, this.state.relatedCamera)

    this.checkRaycaster(this.raycaster)
  }


  initLight = () => {
    this.state.lightOpt.push(this.modelsGroup.children[0])
    this.light = new CursorLight({
      sceneIndex: 1,
      relatedCamera: this.state.relatedCamera,
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

  animate = () => {
    if ( this.state.relatedCamera.position.z <= -11400 ) {
      raf.remove(this.animate)
      Storage.SplineClass.unbind()
      this.bind()
    }
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
      Storage.SplineClass.bind()
    }

  }
}

export default Chapitre2
