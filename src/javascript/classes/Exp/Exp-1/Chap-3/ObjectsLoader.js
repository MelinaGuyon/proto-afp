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
	    this.barbelesGroup1 = new THREE.Group()
	    this.barbelesGroup2 = new THREE.Group()

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
    	this.loadBarbeles().then((response)=> {
	    	this.loadPeople().then((response)=> {
		    	console.log('Chapter 3 objects loaded')
		    	resolve([this.group, this.peopleInfosGroup])
		  	}).catch((error)=> { console.warn(error) })
		}).catch((error)=> { console.warn(error) })
    })
	}

	loadBarbeles = () => {
	    return new Promise((resolve, reject) => {
	      let that = this
	      that.objLoader.load( 'assets/models/beforeChap3/barbeles.obj', function ( barbeles ) {
			for ( let i = 0; i < 3; i ++ ) {
		        let barbelesInstance = barbeles.clone()
		        barbelesInstance.scale.set(20, 20, 20)
		        barbelesInstance.position.z = 6800 - (i*1400)
		        barbelesInstance.position.y = 100
		        barbelesInstance.position.x = -900
		        barbelesInstance.rotation.y = Math.PI/2

		        that.barbelesGroup1.add( barbelesInstance )
			}
			for ( let i = 0; i < 3; i ++ ) {
		        let barbelesInstance = barbeles.clone()
		        barbelesInstance.scale.set(20, 20, 20)
		        barbelesInstance.position.z = 4200 - (i*1400)
		        barbelesInstance.position.y = 100
		        barbelesInstance.position.x = 900
		        barbelesInstance.rotation.y = -Math.PI/2

		        that.barbelesGroup2.add( barbelesInstance )
			}

	        that.group.add( that.barbelesGroup1, that.barbelesGroup2 )
	      })
	      resolve()
	    })
	}

	loadPeople = () => {
		return new Promise((resolve, reject) => {
			let that = this
			that.objLoader.load( 'assets/models/chapitre3/corps_homme.obj', function ( body ) {
				that.objLoader.load( 'assets/models/chapitre3/tete.obj', function ( head ) {

					for ( let i = 0; i < 4; i ++ ) {
						for ( let j = 0; j < 10; j ++ ) {
					        let bodyInstance = body.clone()
					        bodyInstance.scale.set(1.5, 1.5, 1.5)
					        bodyInstance.position.z = j * 200
					        bodyInstance.name = "people"

									if ((i === 0 && j === 8) || (i === 2 && j === 9) || (i === 2 && j === 4) || (i === 3 && j === 2) || (i === 1 && j === 4) || (i === 0 && j === 0)) {
										bodyInstance.children[0].material = new THREE.MeshPhongMaterial({ color: 0xC40202, transparent: true })
										bodyInstance.position.x = i * 200 + 250
										bodyInstance.isGroup2 = true
										that.peopleInfosGroup.add(bodyInstance)
									} else {
										bodyInstance.position.x = i * 200
										that.peopleGroup1.add( bodyInstance )
									}

					        let headInstance = head.clone()
					        headInstance.position.z = j * 200
									headInstance.position.y = 230
					        headInstance.isAnimating = false
									headInstance.scale.set(1.5, 1.5, 1.5)
					        headInstance.name = "head"

									if ((i === 0 && j === 8) || (i === 2 && j === 9) || (i === 2 && j === 4) || (i === 3 && j === 2) || (i === 1 && j === 4) || (i === 0 && j === 0)) {
										headInstance.children[0].material = new THREE.MeshPhongMaterial({ color: 0xC40202, transparent: true })
										headInstance.position.x = i * 200 + 250
										that.peopleInfosGroup.add(headInstance)
									} else {
										headInstance.position.x = i * 200
										that.peopleGroup1.add( headInstance )
									}

					    }
					}
					for ( let i = 0; i < 4; i ++ ) {
						for ( let j = 0; j < 10; j ++ ) {
					        let bodyInstance = body.clone()
					        bodyInstance.scale.set(1.5, 1.5, 1.5)
					        bodyInstance.position.z = j * 200
					        bodyInstance.name = "people"

									if ((i === 0 && j === 6) || (i === 3 && j === 5) || (i === 2 && j === 8) || (i === 1 && j === 2) || (i === 2 && j === 0)) {
										bodyInstance.children[0].material = new THREE.MeshPhongMaterial({ color: 0xC40202, transparent: true })
										bodyInstance.position.x = i * -200 - 250
										bodyInstance.isGroup1 = true
										that.peopleInfosGroup.add(bodyInstance)
									} else {
										bodyInstance.position.x = i * -200
										that.peopleGroup2.add( bodyInstance )
									}

					        let headInstance = head.clone()
					        headInstance.position.z = j * 200
									headInstance.position.y = 230
									headInstance.scale.set(1.5, 1.5, 1.5)
					        headInstance.name = "head"
					        headInstance.isAnimating = false

									if ((i === 0 && j === 6) || (i === 3 && j === 5) || (i === 2 && j === 8) || (i === 1 && j === 2) || (i === 2 && j === 0)) {
										headInstance.children[0].material = new THREE.MeshPhongMaterial({ color: 0xC40202, transparent: true })
										headInstance.position.x = i * -200 -250
										that.peopleInfosGroup.add(headInstance)
									} else {
										headInstance.position.x = i * -200
										that.peopleGroup2.add( headInstance )
									}
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
