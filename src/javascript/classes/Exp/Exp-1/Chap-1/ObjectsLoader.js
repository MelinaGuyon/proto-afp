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
	    		this.loadLights().then((response)=> {
		  			this.loadShader("../../../glsl/testVert.vert", "../../../glsl/testFrag.frag").then((response)=> {
	    		    	console.log('Chapter 1 objects loaded')
	    		    	resolve(this.group)
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

    loadLights = () => {
    	return new Promise((resolve, reject) => {

			// Issue of plane appaeating to check

	    let light1 = new THREE.PointLight(0xfdffd8, 0.05, 0, 2)
			light1.position.set(-500, -600, 8000)
			//light1.rotation.set(0, Math.PI, Math.PI)
			light1.castShadow = true
			//this.state.relatedBox.add(light1)
			// this.group.add(light1)
			//
			// let sphereSize = 100
			// let pointLightHelper = new THREE.PointLightHelper( light1, sphereSize )
			// this.state.relatedBox.add( pointLightHelper )


	    let light2 = new THREE.PointLight(0x99caff, 0.05, 0, 2)
			light2.position.set(500, -200, 7000)
			//light2.rotation.set(0, Math.PI, Math.PI)
			light2.castShadow = true
			//this.state.relatedBox.add(light2)
			// this.group.add(light2)

			// let sphereSize2 = 100
			// let pointLightHelper2 = new THREE.PointLightHelper( light2, sphereSize2 )
			//this.state.relatedBox.add( pointLightHelper2 )

			resolve()

		})
    }

	loadFrontalCity = () => {
		return new Promise((resolve, reject) => {
			this.mtlLoader.load('assets/chapitre1/fausse-ville.mtl', (matl) => {
				matl.preload()
				this.objLoader.setMaterials( matl )

				console.log(matl.materials)

				let mat = matl.materials.Mat
				mat.specular = new THREE.Color(0xaa8888)
				mat.shininess = 30

				let mat_1 = matl.materials.Mat_1
				mat_1.specular = new THREE.Color(0xaa8888)
				mat_1.shininess = 30

				let mat_2 = matl.materials.Mat_2
				mat_2.specular = new THREE.Color(0xaa8888)
				mat_2.shininess = 30

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
						if (o.type === 'Group') {
							o.children.forEach((mesh) => {
								mesh.receiveShadow = true
								mesh.castShadow = true
							})
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
