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
			// this.videoGroup = new THREE.Group()
			
	    this.group.position.y = -790
	    this.group.position.z = -300

	   	// this.videoGroup.position.y = -790
	    // this.videoGroup.position.z = -300
	}

	load = () => {
		// this.loadVideo()
		return new Promise((resolve, reject) => {
  		this.loadMlleKWall().then((response)=> {
					console.log('Chapter 1 objects loaded')
					resolve(this.group)
					//resolve(this.videoGroup)
  		}).catch((error)=> { console.warn(error) })
		})
	}

	// loadVideo = () => {
	// 	let geometry = new THREE.PlaneGeometry( window.innerWidth, window.innerWidth/1.8, 32 )

	// 	this.video = document.getElementById( 'video' )
	// 	this.video.pause()

	// 	let texture = new THREE.VideoTexture( this.video )
	// 	texture.minFilter = THREE.LinearFilter
	// 	texture.magFilter = THREE.LinearFilter
	// 	texture.format = THREE.RGBFormat

	// 	let parameters = { map: texture }
	// 	let material = new THREE.MeshStandardMaterial( parameters )

	// 	let plane = new THREE.Mesh( geometry, material )

	// 	plane.name = "video"

	// 	plane.position.z = -100
	// 	plane.position.y = 790

	// 	this.videoGroup.add(plane)
	// }

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
