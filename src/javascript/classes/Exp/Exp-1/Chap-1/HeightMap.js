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

		this.load()
	}

	load = () => {
	    return new Promise((resolve, reject) => {
	  		this.loadShader("../../../glsl/testVert.vert", "../../../glsl/testFrag.frag").then((response)=> {
	    		    console.log('heightmap loaded')
	    		    resolve(this.group)
	    		    this.displayHeightMap()
	  		}).catch((error)=> { console.warn(error) })
	    })
	}


  	loadShader = (vertex_url, fragment_url) => {
		let that = this

		return new Promise((resolve, reject) => {

		    this.uniforms = THREE.UniformsUtils.merge([
		        THREE.ShaderLib.lambert.uniforms,
		        { diffuse: { value: new THREE.Color(0xfdad5b) } },
		    	{ texture: { type: "t", value: THREE.ImageUtils.loadTexture( 'assets/texture.png' ) } }
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

			let geometry = new THREE.PlaneBufferGeometry(3000, 3000, 150, 150)

		    let material = new THREE.ShaderMaterial( {
		    	uniforms: this.uniforms,
		        vertexShader: vertex,
		        fragmentShader: fragment,
		        lights: true,
		        side: THREE.BackSide
		    } )

		    console.log("MATERIAL", material)

		    material.uniforms.texture.value = THREE.ImageUtils.loadTexture( 'assets/northKoreaMap.jpg' )

		    let plane = new THREE.Mesh( geometry, material )

		    plane.position.x = 0
		    plane.position.y = 0
		    plane.position.z = 4000
			plane.rotation.x = Math.PI / 2
			plane.rotation.z = Math.PI

			plane.castShadow = true
			plane.receiveShadow = true

			this.group.add(plane)

			resolve()

		})
    }


    displayHeightMap = () => {
    	this.state.relatedBox.add(this.group)
    }

}

export default HeightMap
