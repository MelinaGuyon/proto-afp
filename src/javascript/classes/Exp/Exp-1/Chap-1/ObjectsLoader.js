class ObjectsLoader {
  constructor(options) {
    this.init()
  }

  init = () => {
    this.group = new THREE.Group()
    this.group.position.y = -790
    this.group.position.z = -300
  }

	load = () => {
		this.addVideo()
		return new Promise((resolve, reject) => {
    		resolve(this.group)
    	})
	}

	addVideo = () => {
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

    	this.group.add(plane)
	}

}

export default ObjectsLoader
