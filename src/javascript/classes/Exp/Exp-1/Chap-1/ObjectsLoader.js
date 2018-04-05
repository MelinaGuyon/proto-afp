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
		this.addWall()
		return new Promise((resolve, reject) => {
    		resolve(this.group)
    	})
	}

	addWall = () => {
		let geometry = new THREE.PlaneGeometry( 1500, 1500, 32 )
		let material = new THREE.MeshStandardMaterial( { color: 0xf0f6f, side: THREE.BackSide } )
		let plane = new THREE.Mesh( geometry, material )

		plane.position.z = -100
    	plane.position.y = 790

		plane.castShadow = true
		plane.receiveShadow = true

    this.group.add(plane)
	}

}

export default ObjectsLoader
