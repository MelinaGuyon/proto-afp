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
			
	    this.group.position.y = -790
	    this.group.position.z = -600
	}


	load = () => {

	    return new Promise((resolve, reject) => {
	    	this.loadPeople().then((response)=> {
		    	console.log('Conclusion loaded')
		    	resolve(this.group)
		  	}).catch((error)=> { console.warn(error) })
	    })
	}

	loadPeople = () => {
		return new Promise((resolve, reject) => {
			let that = this
			that.objLoader.load( 'assets/persos/people.obj', function ( body ) {
		        body.scale.set(120, 120, 120)
		        body.position.z = 300

				that.group.add( body )
				resolve()
			})
		})

	}

}

export default ObjectsLoader
