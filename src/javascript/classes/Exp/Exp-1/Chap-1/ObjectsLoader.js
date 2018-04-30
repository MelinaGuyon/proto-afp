const MTLLoader = require('three-mtl-loader')

class ObjectsLoader {
	constructor(options) {
		this.mtlLoader = new MTLLoader()
	  	this.objLoader = new THREE.OBJLoader()
	  	this.textureLoader = new THREE.TextureLoader()
		this.mtlLoader.manager = new THREE.LoadingManager()
		this.vertex_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
	    this.vertex_loader.setResponseType('text')
	    this.fragment_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
	    this.fragment_loader.setResponseType('text')

		this.init()
	}

	init = () => {
	    this.group = new THREE.Group()

	    this.group.position.y = -790
	    this.group.position.z = -300
	}


	load = () => {
	    return new Promise((resolve, reject) => {
	    	this.loadFrontalCity().then((response)=> {
	    	this.loadWindowLeft().then((response)=> {
	    	this.loadWindowRight().then((response)=> {
	    	this.loadDoor().then((response)=> {
	    		//this.loadLights().then((response)=> {
		  			this.loadShader("../../../glsl/testVert.vert", "../../../glsl/testFrag.frag").then((response)=> {
	    		    	console.log('Chapter 1 objects loaded')
	    		    	resolve(this.group)
	    			}).catch((error)=> { console.warn(error) })
		  		//}).catch((error)=> { console.warn(error) })
		  	}).catch((error)=> { console.warn(error) })
		  	}).catch((error)=> { console.warn(error) })
		  	}).catch((error)=> { console.warn(error) })
		  	}).catch((error)=> { console.warn(error) })
	    })
	}


	loadShader = (vertex_url, fragment_url) => {
		let that = this

		return new Promise((resolve, reject) => {
		    this.uniforms = THREE.UniformsUtils.merge([
		        THREE.ShaderLib.lambert.uniforms,
		        { diffuse: { value: new THREE.Color(0xf7f7f7) } },
		    	{ texture: { type: "t", value: THREE.ImageUtils.loadTexture( 'assets/texture.jpg' ) } }
		    ]);
		    this.vertex_loader.load(vertex_url, function (vertex_text) {
		        that.fragment_loader.load(fragment_url, function (fragment_text) {
		          	that.loadHeightMap(vertex_text, fragment_text )
		        })
		    })
	  	 	resolve()
		})
    }

    loadHeightMap = (vertex, fragment) => {
    	return new Promise((resolve, reject) => {

			let geometry = new THREE.PlaneBufferGeometry(8000, 3000, 150, 150)

		    let material = new THREE.ShaderMaterial( {
		    	uniforms: Object.assign({u_amplitude:{ type: "f", value: 4. }, u_frequence:{ type: "f", value: 0.0005 } }, this.uniforms),
		        vertexShader: vertex,
		        fragmentShader: fragment,
		        lights: true,
		        fog: true,
		        side: THREE.BackSide
		    } )

		    material.transparent = true
		    material.uniforms.texture.value = THREE.ImageUtils.loadTexture( 'assets/texture.jpg' )

		    let plane = new THREE.Mesh( geometry, material )

		    plane.position.y = 300
		    plane.position.z = 4800
				plane.rotation.x = Math.PI / 2
			// plane.rotation.z = Math.PI

			plane.castShadow = true
			plane.receiveShadow = true

			this.group.add(plane)

			resolve()

		})
    }


	loadFrontalCity = () => {
		return new Promise((resolve, reject) => {
			this.mtlLoader.load('assets/chapitre1/fausse-ville.mtl', (matl) => {
				matl.preload()
				this.objLoader.setMaterials( matl )
				console.log(matl.materials)

				this.objLoader.load( 'assets/chapitre1/fausse-ville.obj', (object) => {
					object.position.x = 4000
					object.position.z = 1500
					object.scale.set( 5, 5, 2 )
					object.name = 'wall'

					object.traverse(function(o) {
						if (o.type === 'Mesh') {
							o.receiveShadow = true
							o.castShadow = true
						}
					})

					this.group.add(object)
          resolve()
				})
			})
		})
	}

	loadWindowLeft = () => {
		return new Promise((resolve, reject) => {
			this.mtlLoader.load('assets/chapitre1/fenetre-gauche.mtl', (matl) => {
				matl.preload()
				this.objLoader.setMaterials( matl )
				console.log(matl.materials)

				this.objLoader.load( 'assets/chapitre1/fenetre-gauche.obj', (object) => {
					object.position.x = -800
					object.position.y = 450
					object.position.z = 2600
					object.scale.set( 5, 5, 5 )
					object.name = 'windowLeft'

					object.traverse(function(o) {
						if (o.type === 'Mesh') {
							o.receiveShadow = true
							o.castShadow = true
						}
					})

					this.group.add(object)
          			resolve()
				})
			})
		})
	}

	loadWindowRight = () => {
		return new Promise((resolve, reject) => {
			this.mtlLoader.load('assets/chapitre1/fenetre-droite.mtl', (matl) => {
				matl.preload()
				this.objLoader.setMaterials( matl )
				console.log(matl.materials)

				this.objLoader.load( 'assets/chapitre1/fenetre-droite.obj', (object) => {
					object.position.x = 850
					object.position.y = 450
					object.position.z = 2600
					object.scale.set( 5, 5, 5 )
					object.name = 'windowRight'

					object.traverse(function(o) {
						if (o.type === 'Mesh') {
							o.receiveShadow = true
							o.castShadow = true
						}
					})

					this.group.add(object)
          			resolve()
				})
			})
		})
	}

	loadDoor = () => {
		return new Promise((resolve, reject) => {
			this.mtlLoader.load('assets/chapitre1/porte.mtl', (matl) => {
				matl.preload()
				this.objLoader.setMaterials( matl )
				console.log(matl.materials)

				this.objLoader.load( 'assets/chapitre1/porte.obj', (object) => {
					object.position.x = -230
					object.position.y = 255
					object.position.z = 2550
					object.scale.set( 4.8, 5, 5 )
					object.name = 'door'

					object.traverse(function(o) {
						if (o.type === 'Mesh') {
							o.receiveShadow = true
							o.castShadow = true
						}
					})

					this.group.add(object)
          resolve()
				})
			})
		})
	}

}

export default ObjectsLoader
