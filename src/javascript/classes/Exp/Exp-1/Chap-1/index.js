import ObjectsLoader from './ObjectsLoader'
import FrontalCity from './FrontalCity'

class Chapitre1 {
    constructor(options) {
		Storage.Chapitre1Class = this
    this.state = options

    this.modelsGroup

    this.raycaster = new THREE.Raycaster()
		this.mouse = new THREE.Vector2()

		this.loadChapter()
    }

	loadChapter = () => {
    this.loader = new ObjectsLoader()
    this.loader.load().then((response) => {
      console.log("RESPONSE chap 1", response)
      this.modelsGroup = response
    })
	}

  init = () => {
    this.displayChapterObjects()
    this.bind()
    
    this.frontalCity = new FrontalCity({ objectsGroup: this.modelsGroup })
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

    this.raycaster.setFromCamera( this.mouse, this.state.relatedCamera)
    this.frontalCity.checkRaycaster(this.raycaster)
  }

  displayChapterObjects = () => {
    this.state.relatedBox.add(this.modelsGroup)
  }
}

export default Chapitre1
