import ObjectsLoader from './ObjectsLoader'

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

    // Pour l'instant pas besoin de promise
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => { resolve() }, 500)
    // })
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
    const meshs = this.modelsGroup.children[0].children
    let intersects = this.raycaster.intersectObjects(meshs, false)
    if (intersects[0] && intersects[0].object) intersects[0].object.position.x += 10
    // coordinate may change with new assets
    // check for rotation and distance 
    
    console.log('tests')
  }

  displayChapterObjects = () => {
    this.state.relatedBox.add(this.modelsGroup)
  }
}

export default Chapitre1
