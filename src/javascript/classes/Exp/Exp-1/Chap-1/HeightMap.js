class HeightMap {
	constructor(options) {
		this.state = options

		this.vertex_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
	    this.vertex_loader.setResponseType('text')
	    this.fragment_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
	    this.fragment_loader.setResponseType('text')

	   	this.group = new THREE.Group()

	    this.group.position.y = -790
	    this.group.position.z = -300
	}

	load = () => {
	    return new Promise((resolve, reject) => {
	    	this.loadLights().then((response)=> {
		  		this.loadShader("../../../glsl/testVert.vert", "../../../glsl/testFrag.frag").then((response)=> {
	    		    resolve(this.group)
		  		}).catch((error)=> { console.warn(error) })
		  	}).catch((error)=> { console.warn(error) })
	    })
	}

  	loadShader = (vertex_url, fragment_url) => {
		let that = this

		return new Promise((resolve, reject) => {

		    this.uniforms = THREE.UniformsUtils.merge([
		        THREE.ShaderLib.lambert.uniforms,
		        { diffuse: { value: new THREE.Color(0xffffff) } },
		    	{ texture: { type: "t", value: THREE.ImageUtils.loadTexture( 'assets/shaders/heightmap/texture.png' ) } }
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

			let geometry = new THREE.PlaneBufferGeometry(3000, 4000, 150, 150)

		    let material = new THREE.ShaderMaterial( {
		    	uniforms: Object.assign({u_amplitude:{ type: "f", value: 4. }, u_frequence:{ type: "f", value: 0.0005 } }, this.uniforms),
		        vertexShader: vertex,
		        fragmentShader: fragment,
		        lights: true,
		        fog: true,
		        side: THREE.BackSide
		    } )

		    material.uniforms.texture.value = THREE.ImageUtils.loadTexture( 'assets/texture.png' )

		    let plane = new THREE.Mesh( geometry, material )

		    plane.position.y = 100
		    plane.position.z = 4800
				plane.rotation.x = Math.PI / 2
				plane.rotation.z = Math.PI

				plane.castShadow = true
				plane.receiveShadow = true
				this.group.add(plane)
				resolve()
			})
    }

    loadLights = () => {
    	return new Promise((resolve, reject) => {

	    	let light1 = new THREE.PointLight(0xfdffd8, 0.5, 0, 2)
				light1.position.set(-500, -600, 8000)
				//light1.rotation.set(0, Math.PI, Math.PI)
				light1.castShadow = true
				this.state.relatedBox.add(light1)
				//this.group.add(light1)

				let sphereSize = 100
				let pointLightHelper = new THREE.PointLightHelper( light1, sphereSize )
				// this.state.relatedBox.add( pointLightHelper )

		    let light2 = new THREE.PointLight(0x99caff, 0.5, 0, 2)
				light2.position.set(500, -200, 7000)
				//light2.rotation.set(0, Math.PI, Math.PI)
				light2.castShadow = true
				this.state.relatedBox.add(light2)
				//this.group.add(light1)

				let sphereSize2 = 100
				let pointLightHelper2 = new THREE.PointLightHelper( light2, sphereSize2 )
				// this.state.relatedBox.add( pointLightHelper2 )

				resolve()
			})
    }


}

export default HeightMap
