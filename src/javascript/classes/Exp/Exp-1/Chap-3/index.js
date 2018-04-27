import ObjectsLoader from './ObjectsLoader'
import raf from 'raf'
import anime from 'animejs'


class Chapitre3 {
    constructor(options) {
    Storage.Chapitre3Class = this
    this.state = options

    this.modelsGroup
    this.peopleColor1 = new THREE.Color( 0xffffff )
    this.peopleColor2 = new THREE.Color( 0x000000 )

    this.frustum = new THREE.Frustum()
    this.cameraRotation = false
    this.animationOngoing = false

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
    //setTimeout(() => { this.animate() }, 5000)
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve() }, 500)
    })
  }

  displayChapterObjects = () => {
    this.state.relatedBox.add(this.modelsGroup)
  }

  animate = () => {
    let that = this

    this.state.relatedCamera.camera.updateMatrix()
    this.state.relatedCamera.camera.updateMatrixWorld() 
    this.frustum.setFromMatrix( new THREE.Matrix4().multiplyMatrices( this.state.relatedCamera.camera.projectionMatrix, this.state.relatedCamera.camera.matrixWorldInverse ) )


    this.modelsGroup.traverse(function(o) {
      if(o.name === "head") {
        let distance = that.state.relatedCamera.camera.position.z - o.getWorldPosition().z
        // console.log("object z", o.getWorldPosition().z)
        // console.log("camera z", that.state.relatedCamera.position.z)
        // console.log("DISTANCE", distance)

        if (o.isAnimating === false) {

          if ( that.frustum.containsPoint( o.getWorldPosition()) && distance < 500 ){
            o.isAnimating = true
            anime.remove(o.rotation)

            anime({
              targets: o.rotation,
              x: [o.rotation.x, Math.PI/2],
              duration: 1000,
              easing: 'linear',
              complete: () => { o.isAnimating = false }
            })
          }
          else {
            o.isAnimating = true
            anime.remove(o.rotation)

            anime({
              targets: o.rotation,
              x: [o.rotation.x, 0],
              duration: 1000,
              easing: 'linear',
              complete: () => {  o.isAnimating = false }
            })
          }
        }
      }
    })
  }
}

export default Chapitre3
