const MTLLoader = require('three-mtl-loader')

class ObjectsLoader {
	constructor(options) {
		// this.video = 0
  
		this.mtlLoader = new MTLLoader()
  	this.objLoader = new THREE.OBJLoader()
  	this.textureLoader = new THREE.TextureLoader()
		this.mtlLoader.manager = new THREE.LoadingManager()
		
		this.init()
	}

	init = () => {
	    this.group = new THREE.Group()
			
	    this.group.position.y = -790
	    this.group.position.z = -300
	}

	load = () => {
		return new Promise((resolve, reject) => {
  		this.loadMlleKWall().then((response)=> {
					console.log('Chapter 1 objects loaded')
					resolve(this.group)
  		}).catch((error)=> { console.warn(error) })
		})
	}

	loadMlleKWall = () => {
		return new Promise((resolve, reject) => {
			let that = this
			this.mtlLoader.load('assets/scenes/Mlle-k/mademoisellek_mur.mtl', function(matl) {
				matl.preload()
				that.objLoader.setMaterials( matl )

				let tuyauxMaterial = matl.materials.metal_clair
				tuyauxMaterial.shininess = 100

				that.objLoader.load( 'assets/scenes/Mlle-k/mademoisellek_mur.obj', function ( object ) {

					// coordinate may change with new assts
					object.position.x = 0
					object.position.y = -300
					object.position.z = 2600
					object.rotation.x = Math.PI / 2
					object.rotation.z = Math.PI
					object.scale.set( 4, 1, 4 )
					object.name = 'wall'

					object.traverse(function(o) {
						if (o.type === 'Mesh') {
							o.receiveShadow = true
							o.castShadow = true
							o.material.shininess = 2
						}
					})

					that.group.add(object)
          resolve()
				})
			})
		})
	}

}

export default ObjectsLoader
