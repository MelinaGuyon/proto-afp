const MTLLoader = require('three-mtl-loader')

class ObjectsLoader {
	constructor(options) {
		this.mtlLoader = new MTLLoader()
	  	this.objLoader = new THREE.OBJLoader()
	  	this.textureLoader = new THREE.TextureLoader()
		this.mtlLoader.manager = new THREE.LoadingManager()

		this.init()
	}

	init = () => {
	    this.group = new THREE.Group()
	    this.peopleGroup1 = new THREE.Group()
	    this.peopleGroup2 = new THREE.Group()
			this.peopleInfosGroup = new THREE.Group()

	    this.group.position.y = -790
	    this.group.position.z = -600

	    this.peopleGroup1.position.x = 250
	    this.peopleGroup2.position.x = -250
	}


	load = () => {
    return new Promise((resolve, reject) => {
    	this.loadPeople().then((response)=> {
	    	console.log('Chapter 3 objects loaded')
	    	resolve([this.group, this.peopleInfosGroup])
	  	}).catch((error)=> { console.warn(error) })
    })
	}

	loadPeople = () => {
		return new Promise((resolve, reject) => {
			let that = this
			that.objLoader.load( 'assets/models/chapitre3/corps_homme.obj', function ( body ) {
				that.objLoader.load( 'assets/models/chapitre3/tete_hmme.obj', function ( head ) {

					for ( let i = 0; i < 4; i ++ ) {
						for ( let j = 0; j < 10; j ++ ) {
					        let bodyInstance = body.clone()
					        bodyInstance.scale.set(1.5, 1.5, 1.5)
					        bodyInstance.position.z = j * 200
					        bodyInstance.name = "people"

									if (i === 0 && j === 8) {
										bodyInstance.children[0].material = new THREE.MeshPhongMaterial({ color: 0xC40202 })
										bodyInstance.position.x = i * 200 + 250
										bodyInstance.isGroup2 = true
										that.peopleInfosGroup.add(bodyInstance)
									} else {
										bodyInstance.position.x = i * 200
										that.peopleGroup1.add( bodyInstance )
									}

					        let headInstance = head.clone()
					        headInstance.position.x = i * 200
					        headInstance.position.z = j * 200
					        headInstance.isAnimating = false
									headInstance.scale.set(1.5, 1.5, 1.5)
					        headInstance.name = "head"

									if (i === 0 && j === 8) {
										headInstance.children[0].material = new THREE.MeshPhongMaterial({ color: 0xC40202 })
									}
					        that.peopleGroup1.add( headInstance )
					    }
					}
					for ( let i = 0; i < 4; i ++ ) {
						for ( let j = 0; j < 10; j ++ ) {
					        let bodyInstance = body.clone()
					        bodyInstance.scale.set(1.5, 1.5, 1.5)
					        bodyInstance.position.z = j * 200
					        bodyInstance.name = "people"

									if (i === 0 && j === 6) {
										bodyInstance.children[0].material = new THREE.MeshPhongMaterial({ color: 0xC40202 })
										bodyInstance.position.x = i * -200 - 250
										bodyInstance.isGroup1 = true
										that.peopleInfosGroup.add(bodyInstance)
									} else {
										bodyInstance.position.x = i * -200
										that.peopleGroup2.add( bodyInstance )
									}

					        let headInstance = head.clone()
					        headInstance.position.x = i * -200
					        headInstance.position.z = j * 200
									headInstance.scale.set(1.5, 1.5, 1.5)
					        headInstance.name = "head"
					        headInstance.isAnimating = false

									if (i === 0 && j === 6) {
										headInstance.children[0].material = new THREE.MeshPhongMaterial({ color: 0xC40202 })
									}
									that.peopleGroup2.add( headInstance )
					    }
					}

					that.group.add( that.peopleGroup1, that.peopleGroup2, that.peopleInfosGroup )

					resolve()
				})
			})
		})

	}


}

export default ObjectsLoader
