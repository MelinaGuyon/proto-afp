class ConclusionLoader {
	constructor(options) {
		Storage.ConclusionLoader = this
		this.media = options.media
		this.url = options.url

		this.vertex_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
	    this.vertex_loader.setResponseType('text')
	    this.fragment_loader = new THREE.FileLoader(THREE.DefaultLoadingManager)
	    this.fragment_loader.setResponseType('text')

	    this.init()
	}

	init = () => {
	    this.conclusionGroup = new THREE.Group()

	   	this.conclusionGroup.position.y = -790
		this.conclusionGroup.position.z = -300
		// this.conclusionGroup.position.z = -1000
		// this.conclusionGroup.position.z = 0
	}

	load = () => {
		// this.loadShader("glsl/testVert.vert", "glsl/testFrag.frag")
		this.loadVideo()
		return new Promise((resolve, reject) => {
			resolve(this.conclusionGroup)
		})
	}

	loadVideo = (vertex, fragment) => {
		let geometry = new THREE.PlaneGeometry( window.innerWidth, window.innerWidth/1.8, 32 )

	    this.video = document.createElement( 'video' )

      	this.video.autoplay = false
      	this.video.loop = true
      	this.video.src = this.url

	    let texture = new THREE.VideoTexture( this.video )
	    texture.minFilter = THREE.LinearFilter
	    texture.magFilter = THREE.LinearFilter
		texture.format = THREE.RGBFormat

	    let parameters = { map: texture }
		let material = new THREE.MeshBasicMaterial( parameters )
		material.needsUpdate = true
		material.transparent = true
		material.opacity = 0

		let plane = new THREE.Mesh( geometry, material )

		console.log(plane)
		plane.name = "video"

		plane.position.z = -100
		plane.position.y = 790

		this.conclusionGroup.add(plane)
	}


	loadPhoto = (vertex, fragment) => {

	}

	loadShader = (vertex_url, fragment_url) => {
		let that = this

		this.concluUniforms = THREE.UniformsUtils.merge([
	        THREE.ShaderLib.lambert.uniforms,
	        { diffuse: { value: new THREE.Color(0xfdad5b) } },
	        { u_time: { type: "f", value: 1.0 } },
	        { u_resolution: { type: "v2", value: new THREE.Vector2(1024, 768) } },
	        { u_mouse: { type: "v2", value: new THREE.Vector2() } },
	        { u_soundLevel: { type: "f", value: 1.0 } }
	    ])

	    this.vertex_loader.load(vertex_url, function (vertex_text) {
	        that.fragment_loader.load(fragment_url, function (fragment_text) {
	        	if ( that.media === "video" ) {
	          		that.loadVideo(vertex_text, fragment_text, )
				}
				else if ( that.media === "photo" ) {
			        that.loadPhoto(vertex_text, fragment_text)
				}
	        })
	    })
    }

    initShader = (vertex, fragment) => {
	

	 
    }
}

export default ConclusionLoader
