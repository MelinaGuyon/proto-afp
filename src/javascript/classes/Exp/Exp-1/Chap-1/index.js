const MTLLoader = require('three-mtl-loader')


class Chapitre1 {
    constructor(options) {
		Storage.Chapitre1Class = this
      	this.mtlLoader = new MTLLoader()
      	this.objLoader = new THREE.OBJLoader()
      	this.textureLoader = new THREE.TextureLoader()
      	this.mtlLoader.manager = new THREE.LoadingManager()

		this.modelsTab = []
		this.init()
    }

	init = () => {

		this.addWall()

		this.loadOrelsanArtist().then((response)=> {
		this.loadMlleKArtist().then((response)=> {
		    console.log('ALL ASSETS LOADED')
		    this.displayOrelsan()
		    this.displayMlleKArtist()
		}).catch((error)=> { console.warn(error) })
		}).catch((error)=> { console.warn(error) })

	}

	addWall = () => {
		let geometry = new THREE.PlaneGeometry( 1500, 1500, 32 )
		let material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
		let plane = new THREE.Mesh( geometry, material )

		plane.position.z = -50
		plane.position.y = 800

		plane.castShadow = true
		plane.receiveShadow = true

		Storage.SceneClasses.exp1.scene.add( plane )
	}

	loadOrelsanArtist = () => {
      return new Promise((resolve, reject) => {
        let that = this
        this.mtlLoader.load('assets/persos/orelsan/model_orelsan.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          that.objLoader.load( 'assets/persos/orelsan/model_orelsan.obj', function ( object ) {
          	console.log("object", object)
            object.position.y = 0
            object.scale.x = 2
            object.scale.y = 2
            object.scale.z = 2

            object.traverse(function(o) {
              if (o.type === 'Mesh') {
                o.castShadow = false
              }
            })

            that.modelsTab.push(object)
            resolve()
          })
        })
      })
    }

    loadMlleKArtist = () => {
      return new Promise((resolve, reject) => {
        let that = this
 
          let matl = new THREE.ShadowMaterial()
          matl.opacity = 0

          that.objLoader.load( 'assets/persos/mademoiselle-k/MademoiselleK_Guitar_Playing.obj', function ( object ) {
          	console.log("object", object)
            object.scale.x = 4
            object.scale.y = 4
            object.scale.z = 4

            object.traverse(function(o) {
              if (o.type === 'Mesh') {
                o.castShadow = true
                o.receiveShadow = true
                o.material = matl
              }
            })

            that.modelsTab.push(object)
            resolve()
          })
  
      })
    }


    displayOrelsan = () => {
      Storage.SceneClasses.exp1.scene.add(this.modelsTab[0])
    }

    displayMlleKArtist = () => {
      Storage.SceneClasses.exp1.scene.add(this.modelsTab[1])
    }
}

export default Chapitre1
