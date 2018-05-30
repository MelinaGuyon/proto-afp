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
	    		this.loadAffiche1().then((response)=> {
	    			this.loadAffiche2().then((response)=> {
	    				this.loadAffiche3().then((response)=> {
	    					this.loadAffiche4().then((response)=> {
		    					console.log('Conclusion loaded')
		    					resolve(this.group)
		  					}).catch((error)=> { console.warn(error) })
		  				}).catch((error)=> { console.warn(error) })
		  			}).catch((error)=> { console.warn(error) })
		  		}).catch((error)=> { console.warn(error) })
		  	}).catch((error)=> { console.warn(error) })
	    })
	}

  	loadAffiche1 = () => {
	    return new Promise((resolve, reject) => {
		    let that = this

		    this.mtlLoader.load('assets/models/beforeConclu/affiche1.mtl', (matl) => {
				matl.preload()
				this.objLoader.setMaterials( matl )

		        let afficheMaterial = matl.materials.affiche1

		        let afficheTexture = that.textureLoader.load('assets/models/beforeConclu/affiche1.png', () => {
		            afficheMaterial.map = afficheTexture

					console.log("MATERIALS AFFICHE 1", matl.materials)

				    that.objLoader.load( 'assets/models/beforeConclu/affiche1.obj', function ( affiche ) {
				        affiche.scale.set(1, 1, 1)
				        affiche.position.z = 7200
				        affiche.position.y = 0
				        affiche.position.x = -800

				        affiche.rotation.y = Math.PI/4

				        that.group.add( affiche )

				        	    	resolve()

				    })
				})
			})
		})
  	}

  	loadAffiche2 = () => {
	    return new Promise((resolve, reject) => {
	      let that = this

	      this.mtlLoader.load('assets/models/beforeConclu/affiche2.mtl', (matl) => {
			matl.preload()
			this.objLoader.setMaterials( matl )

			 let afficheMaterial = matl.materials.affiche2

		        let afficheTexture = that.textureLoader.load('assets/models/beforeConclu/affiche2.png', () => {
		            afficheMaterial.map = afficheTexture

					console.log("MATERIALS AFFICHE 2", matl.materials)

				    that.objLoader.load( 'assets/models/beforeConclu/affiche2.obj', function ( affiche ) {
				        affiche.scale.set(1, 1, 1)
				        affiche.position.z = 6800
				        affiche.position.y = 0
				        affiche.position.x = 900

				        affiche.rotation.y = -Math.PI/2

				        that.group.add( affiche )


				        	      	resolve()

				    })
		  		})
		    })
	    })
  	}

  	loadAffiche3 = () => {
	    return new Promise((resolve, reject) => {
	      let that = this

	      this.mtlLoader.load('assets/models/beforeConclu/affiche3.mtl', (matl) => {
			matl.preload()
			this.objLoader.setMaterials( matl )

			 let afficheMaterial = matl.materials.affiche3

		        let afficheTexture = that.textureLoader.load('assets/models/beforeConclu/affiche3.png', () => {
		            afficheMaterial.map = afficheTexture
					console.log("MATERIALS AFFICHE 3", matl.materials)

				    that.objLoader.load( 'assets/models/beforeConclu/affiche3.obj', function ( affiche ) {
				        affiche.scale.set(1, 1, 1)
				        affiche.position.z = 5500
				        affiche.position.y = 0
				        affiche.position.x = -1000

				        that.group.add( affiche )

				        	      resolve()

				    })
				})
		    })
	    })
  	}

  	loadAffiche4 = () => {
	    return new Promise((resolve, reject) => {
	      let that = this

	      this.mtlLoader.load('assets/models/beforeConclu/affiche4.mtl', (matl) => {
			matl.preload()
			this.objLoader.setMaterials( matl )

			 let afficheMaterial = matl.materials.affiche4

		        let afficheTexture = that.textureLoader.load('assets/models/beforeConclu/affiche4.png', () => {
		            afficheMaterial.map = afficheTexture

					console.log("MATERIALS AFFICHE 4", matl.materials)

				    that.objLoader.load( 'assets/models/beforeConclu/affiche4.obj', function ( affiche ) {
				        affiche.scale.set(1, 1, 1)
				        affiche.position.z = 4500
				        affiche.position.y = 0
				        affiche.position.x = 800

				        affiche.rotation.y = -Math.PI/4

				        that.group.add( affiche )

				        	      resolve()

				    })
		  		})
		    })
	    })
  	}

	loadPeople = () => {
		return new Promise((resolve, reject) => {
			let that = this
			that.objLoader.load( 'assets/models/conclusion/people.obj', function ( body ) {
		        body.scale.set(120, 120, 120)
		        body.position.z = 300

				that.group.add( body )
				resolve()
			})
		})

	}

}

export default ObjectsLoader
