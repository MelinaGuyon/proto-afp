import ObjectsLoader from './ObjectsLoader'
import raf from 'raf'

class Chapitre3 {
    constructor(options) {
    Storage.Chapitre3Class = this
    this.state = options

    this.modelsGroup
    this.peopleColor1 = new THREE.Color( 0xffffff )
    this.peopleColor2 = new THREE.Color( 0x000000 )

    this.frustum = new THREE.Frustum()

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
    raf.add(this.animate)
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve() }, 500)
    })
  }

  displayChapterObjects = () => {
    this.state.relatedBox.add(this.modelsGroup)
  }

  animate = () => {
    let that = this

    this.state.relatedCamera.updateMatrix()
    this.state.relatedCamera.updateMatrixWorld() 
    this.frustum.setFromMatrix( new THREE.Matrix4().multiplyMatrices( this.state.relatedCamera.projectionMatrix, this.state.relatedCamera.matrixWorldInverse ) )
   
    this.modelsGroup.traverse(function(o) {
      if(o.name === "people") {
        if ( that.frustum.containsPoint( o.getWorldPosition()) ){
            o.visible = false
        }
        else {
            o.visible = true 
        }
      }
    })
  }
  
}

export default Chapitre3
