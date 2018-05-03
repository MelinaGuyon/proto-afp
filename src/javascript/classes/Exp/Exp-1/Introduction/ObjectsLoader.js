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
	    	this.loadDrapeaux().then((response)=> {
	    		this.loadTexte().then((response)=> {
	    			this.loadMissiles().then((response)=> {
	    				this.loadTexte2().then((response)=> {
	    					this.loadTank().then((response)=> {
	    						this.loadBatiment().then((response)=> {
									console.log('Introduction loaded')
									resolve(this.group)
		  						}).catch((error)=> { console.warn(error) })
		  					}).catch((error)=> { console.warn(error) })
		  				}).catch((error)=> { console.warn(error) })
		  			}).catch((error)=> { console.warn(error) })
		  		}).catch((error)=> { console.warn(error) })
		  	}).catch((error)=> { console.warn(error) })
	    })
	}

	loadDrapeaux = () => {
		return new Promise((resolve, reject) => {
			let that = this

			this.mtlLoader.load('assets/introduction/drapeaux.mtl', (drapeauxMatl) => {
				drapeauxMatl.preload()
				this.objLoader.setMaterials( drapeauxMatl )
				
				that.objLoader.load( 'assets/introduction/drapeaux.obj', function ( drapeaux ) {
					drapeaux.position.y = 500
					drapeaux.position.z = 2500
					drapeaux.scale.set(5, 5, 5)

					that.group.add( drapeaux )
					resolve()
				})
			})
		})
	}

	loadTexte = () => {
		return new Promise((resolve, reject) => {
			let that = this

			this.mtlLoader.load('assets/introduction/texte.mtl', (texteMatl) => {
				texteMatl.preload()
				this.objLoader.setMaterials( texteMatl )
				
				that.objLoader.load( 'assets/introduction/texte.obj', function ( texte ) {
					texte.position.y = 500
					texte.position.z = 1000
					texte.position.x = 1300
					texte.scale.set(5, 5, 5)

					that.group.add( texte )
					resolve()
				})
			})
		})
	}

	loadMissiles = () => {
		return new Promise((resolve, reject) => {
			let that = this

			this.mtlLoader.load('assets/introduction/missiles.mtl', (missilesMatl) => {
				missilesMatl.preload()
				this.objLoader.setMaterials( missilesMatl )
				
				that.objLoader.load( 'assets/introduction/missiles.obj', function ( missiles ) {
					missiles.position.y = 250
					missiles.position.z = 600
					missiles.position.x = 1300
					missiles.scale.set(5, 5, 5)

					that.group.add( missiles )
					resolve()
				})
			})
		})
	}

	loadTexte2 = () => {
		return new Promise((resolve, reject) => {
			let that = this

			this.mtlLoader.load('assets/introduction/texte2.mtl', (texte2Matl) => {
				texte2Matl.preload()
				this.objLoader.setMaterials( texte2Matl )
				
				that.objLoader.load( 'assets/introduction/texte2.obj', function ( texte2 ) {
					texte2.position.y = 700
					texte2.position.z = -1000
					texte2.position.x = -800
					texte2.scale.set(5, 5, 5)

					that.group.add( texte2 )
					resolve()
				})
			})
		})
	}


	loadTank = () => {
		return new Promise((resolve, reject) => {
			let that = this

			this.mtlLoader.load('assets/introduction/tank.mtl', (tankMatl) => {
				tankMatl.preload()
				this.objLoader.setMaterials( tankMatl )
				
				that.objLoader.load( 'assets/introduction/tank.obj', function ( tank ) {
					tank.position.y = 150
					tank.position.z = -1000
					tank.position.x = -1300
					tank.scale.set(5, 5, 5)

					that.group.add( tank )
					resolve()
				})
			})
		})
	}


	loadBatiment = () => {
		return new Promise((resolve, reject) => {
			let that = this

			this.mtlLoader.load('assets/introduction/batiment.mtl', (batimentMatl) => {
				batimentMatl.preload()
				this.objLoader.setMaterials( batimentMatl )
				
				that.objLoader.load( 'assets/introduction/batiment.obj', function ( batiment ) {
					batiment.position.y = 500
					batiment.position.z = -1500
					batiment.position.x = 500
					batiment.scale.set(3, 3, 3)

					that.group.add( batiment )
					resolve()
				})
			})
		})
	}

}

export default ObjectsLoader
