class ConclusionLoader {
	constructor(options) {
		Storage.ConclusionLoader = this
		this.media = options.media
		this.url = options.url

	    this.init()
	}

	init = () => {
	    this.conclusionGroup = new THREE.Group()

	   	this.conclusionGroup.position.y = -790
	    this.conclusionGroup.position.z = -300
	}

	load = () => {
		if ( this.media === "video" ) {
			this.loadVideo()
		}
		else if ( this.media === "photo" ) {
			this.loadPhoto()
		}
		return new Promise((resolve, reject) => {
			resolve(this.conclusionGroup)
		})
	}

	loadVideo = () => {
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
	    let material = new THREE.MeshStandardMaterial( parameters )

		let plane = new THREE.Mesh( geometry, material )

		plane.name = "video"

		plane.position.z = -100
		plane.position.y = 790

		this.conclusionGroup.add(plane)
	}


	loadPhoto = () => {

	}
}

export default ConclusionLoader
