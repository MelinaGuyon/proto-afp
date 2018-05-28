import ObjectsLoader from './ObjectsLoader'
import InfosPeople from './InfosPeople'
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
    this.infos = new InfosPeople({ objectsGroup: this.modelsGroup, relatedBox: this.state.relatedBox })

    this.bind()
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve() }, 500)
    })
  }

  bind = () => {
    raf.add(this.animate)
  }

  unbind = () => {
    raf.remove(this.animate)
  }

  remove = () => {
    setTimeout(() => {
      this.state.relatedBox.remove(this.modelsGroup)
      this.unbind()
    }, 4000)
  }

  displayChapterObjects = () => {
    this.state.relatedBox.add(this.modelsGroup)
  }

  animate = () => {
    this.state.relatedCamera.camera.updateMatrix()
    this.state.relatedCamera.camera.updateMatrixWorld()
    this.frustum.setFromMatrix( new THREE.Matrix4().multiplyMatrices( this.state.relatedCamera.camera.projectionMatrix, this.state.relatedCamera.camera.matrixWorldInverse ) )

    this.modelsGroup.traverse((o) => {
      if(o.name === "head") {
        let distance = this.state.relatedCamera.camera.position.z - o.getWorldPosition().z

        if (o.isAnimating === false) {
          o.isAnimating = true
          anime.remove(o.rotation)

          if ( this.frustum.containsPoint( o.getWorldPosition()) && distance < 500 ){
            anime({
              targets: o.rotation,
              x: [o.rotation.x, Math.PI/2],
              duration: 400,
              easing: 'linear',
              complete: () => { o.isAnimating = false }
            })
          }
          else {
            anime({
              targets: o.rotation,
              x: [o.rotation.x, 0],
              duration: 400,
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
