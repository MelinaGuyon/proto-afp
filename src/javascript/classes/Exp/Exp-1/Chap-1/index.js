import ObjectsLoader from './ObjectsLoader'
const OrbitControls = require('three-orbit-controls-loader')
OrbitControls(THREE)

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
      console.log("RESPONSE", response)
      this.modelsGroup = response
    })
	}

  init = () => {
    this.displayChapterObjects()
    this.bind()

    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve() }, 500)
    })
  }

  displayChapterObjects = () => {
    this.state.relatedBox.add(this.modelsGroup)
  }

  bind = () => {
    document.addEventListener( 'mousedown', this.onVideoMouseDown, false )
  }

  onVideoMouseDown = () => {
    console.log("click")

    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1

    this.raycaster.setFromCamera( this.mouse, Storage.CameraClasses[Storage.expName].camera )
    this.intersects = this.raycaster.intersectObjects( this.modelsGroup.children )

    for ( let i = 0; i < this.intersects.length; i++ ) {
      if (this.intersects[i].object.name == "video") { 

        let offset = 1.25

        const boundingBox = new THREE.Box3()

        boundingBox.setFromObject( this.intersects[i].object )

        const center = boundingBox.getCenter()

        const size = boundingBox.getSize()

        const maxDim = Math.max( size.x, size.y, size.z )
        const fov = Storage.CameraClasses[Storage.expName].camera.fov * ( Math.PI / 180 )
        let cameraZ = Math.abs( maxDim / 4 * Math.tan( fov * 2 ) )

        Storage.CameraClasses[Storage.expName].camera.updateProjectionMatrix()

        Storage.CameraClasses[Storage.expName].camera.lookAt( center )

      }
    }
  }
}

export default Chapitre1
