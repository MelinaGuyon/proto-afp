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
			
	    this.group.position.y = -790
	    this.group.position.z = -600

	    this.peopleGroup1.position.x = 250
	    this.peopleGroup2.position.x = -250
	}


	load = () => {

	    return new Promise((resolve, reject) => {
	    	this.loadPeople().then((response)=> {
		    	console.log('Chapter 3 objects loaded')
		    	resolve(this.group)
		  	}).catch((error)=> { console.warn(error) })
	    })
	}

	loadPeople = () => {
		return new Promise((resolve, reject) => {
			let that = this
			that.objLoader.load( 'assets/persos/people.obj', function ( object ) {

				for ( let i = 0; i < 4; i ++ ) {
					for ( let j = 0; j < 10; j ++ ) {
				        let instance = object.clone()
				        instance.scale.set(40, 40, 40)
				        instance.position.x = i * 200
				        instance.position.z = j * 200
				        instance.name = "people"
				        that.peopleGroup1.add( instance )
				    }   
				}
				for ( let i = 0; i < 4; i ++ ) {
					for ( let j = 0; j < 10; j ++ ) {
				        let instance = object.clone()
				        instance.scale.set(40, 40, 40)
				        instance.position.x = i * -200
				        instance.position.z = j * 200
				        instance.name = "people"
				        that.peopleGroup2.add( instance )
				    }   
				}

				that.group.add( that.peopleGroup1, that.peopleGroup2 )

				resolve()
			})
		})

	}


}

export default ObjectsLoader
