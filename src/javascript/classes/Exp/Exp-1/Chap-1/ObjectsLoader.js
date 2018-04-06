class ObjectsLoader {
	constructor(options) {
	    this.init()
	}

	init = () => {
	    this.group = new THREE.Group()
	    this.videoGroup = new THREE.Group()

	    this.group.position.y = -790
	    this.group.position.z = -300

	   	this.videoGroup.position.y = -790
	    this.videoGroup.position.z = -300
	}

	load = () => {
		this.loadVideo()
		return new Promise((resolve, reject) => {
			//resolve(this.group)
			resolve(this.videoGroup)
		})
	}

	loadVideo = () => {
		let geometry = new THREE.PlaneGeometry( 3000, 1500, 32 )

	    let video = document.getElementById( 'video' )
	    let texture = new THREE.VideoTexture( video )
	    texture.minFilter = THREE.LinearFilter
	    texture.magFilter = THREE.LinearFilter
	    texture.format = THREE.RGBFormat

	    let parameters = { map: texture }
	    let material = new THREE.MeshStandardMaterial( parameters )

		let plane = new THREE.Mesh( geometry, material )

		plane.name = "video"

		plane.position.z = -100
		plane.position.y = 790

		this.videoGroup.add(plane)
	}

}

export default ObjectsLoader
