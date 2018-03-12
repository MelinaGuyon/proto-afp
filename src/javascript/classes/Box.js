import TweenLite from 'gsap'
const MTLLoader = require('three-mtl-loader')

class Box {

    constructor(options) {
      STORAGE.BoxClass = this

      this.mtlLoader = new MTLLoader()
      this.objLoader = new THREE.OBJLoader()

      this.init()
    }

    init() {
      this.createBox()
    }

    createBox() {
      let that = this

      that.objLoader.load( 'assets/scenes/box/closed-box_base.obj', function ( object ) {
        object.rotation.y = Math.PI
        object.name = 'base_boite'

        let material = new THREE.MeshPhongMaterial({
          color : 0x303848,
          side: THREE.DoubleSide
        })
        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
            child.material = material
            child.receiveShadow = true
            child.castShadow = true
            child.material.shininess = 100
          }
        })
        STORAGE.box = object
        STORAGE.scene.add( object )
      } )

      that.objLoader.load( 'assets/scenes/box/closed-box_couvercle.obj', function ( object ) {
        object.position.z = -285
        object.position.y = 170
        object.rotation.y = Math.PI
        object.name = 'couvercle_boite'

        let material = new THREE.MeshPhongMaterial({
          color : 0x303848,
          side: THREE.DoubleSide
        })

        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
            child.material = material
            child.receiveShadow = true
            child.castShadow = true
            child.material.shininess = 100
          }
        })

        STORAGE.boxCouvercle = object
        that.object = object
        STORAGE.scene.add( object )
      })

      that.objLoader.load( 'assets/scenes/box/manivelle.obj', function ( object ) {
        object.rotation.y = Math.PI
        object.name = 'manivelle_boite'

        object.position.x = 270
        object.position.y = 100
        object.position.z = -100

        let material = new THREE.MeshPhongMaterial({
          color : 0x303848,
          side: THREE.DoubleSide
        })

        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
            child.material = material
            child.receiveShadow = true
            child.castShadow = true
            child.material.shininess = 50
          }
        })
        STORAGE.boxManivelle = object
				STORAGE.scene.add( object )
				console.log(STORAGE)
      })
    }

}

export default Box
