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


        if (that.animationOngoing === false) {
          if ( that.frustum.containsPoint( o.getWorldPosition()) && distance < 500 ){
            that.beginAnimation()
            anime({
              targets: o.rotation,
              x: [o.rotation.x, Math.PI/2],
              duration: 300,
              easing: 'easeOutQuad',
              complete: that.endAnimation(o)
            })
          }
          else {
            that.beginAnimation()
            anime({
              targets: o.rotation,
              x: [o.rotation.x, 0],
              duration: 300,
              easing: 'easeOutQuad',
              complete: that.endAnimation(o)
            })
          }
        }
      }
    })

    // if ( this.cameraRotation === false && this.state.relatedCamera.camera.position.z <= -22600 ) {
    //   this.cameraRotation = true

    //   anime({
    //     targets: this.state.relatedCamera.camera.rotation,
    //     y: -Math.PI,
    //     duration: 300,
    //     easing: 'easeOutQuad',
    //     complete: () => {
    //       //this.state.relatedCamera.updateMovementRange(0)
    //       Storage.SplineClass.unbind()
    //       this.state.relatedCamera.unbind()
    //     }
    //   })
        
    //   console.log("rotation camera vers foule")
    // }
  }

  endAnimation = (o) => {
    this.animationOngoing = false
    anime.remove(o)
  }
  beginAnimation = () => {
    this.animationOngoing = true
  }
}

export default Chapitre3
