import ObjectsLoader from './ObjectsLoader'

class Chapitre1 {
    constructor(options) {
		Storage.Chapitre1Class = this
    this.state = options

    //this.modelsGroup
		this.videosGroupe
    this.clicked = false
      
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()

		this.loadChapter()
    }

	loadChapter = () => {
    this.loader = new ObjectsLoader()
    this.loader.load().then((response) => {
      console.log("RESPONSE", response)
      this.videosGroupe = response
    })
	}

  init = () => {
    //this.displayChapterObjects()
    this.bind()

    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve() }, 500)
    })
  }

  displayChapterObjects = () => {
    this.state.relatedBox.add(this.modelsGroup)
  }

  displayVideo = () => {
    this.state.relatedBox.add(this.videosGroupe)
  }

  bind = () => {
    document.addEventListener( 'mousedown', this.onClick, false )
  }

  onClick = () => {
    if ( this.clicked === false ) {
      console.log("click")
      this.displayVideo()
      this.clicked = true
    }
  }
}

export default Chapitre1
