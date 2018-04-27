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
    this.group.position.z = -300
  }

	load = () => {

		this.addWall()

    return new Promise((resolve, reject) => {
  		this.loadOrelsanArtist().then((response)=> {
    		this.loadMlleKArtist().then((response)=> {
    		    console.log('Chapter 2 objects loaded')
    		    resolve(this.group)
    		}).catch((error)=> { console.warn(error) })
  		}).catch((error)=> { console.warn(error) })
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

    // invert normals
    for ( var i = 0; i < geometry.faces.length; i ++ ) {
      var face = geometry.faces[ i ]
      var temp = face.a
      face.a = face.c
      face.c = temp
    }
    geometry.computeFaceNormals()
    geometry.computeVertexNormals()
    var faceVertexUvs = geometry.faceVertexUvs[ 0 ]
    for ( var i = 0; i < faceVertexUvs.length; i ++ ) {
      var temp = faceVertexUvs[ i ][ 0 ]
      faceVertexUvs[ i ][ 0 ] = faceVertexUvs[ i ][ 2 ]
      faceVertexUvs[ i ][ 2 ] = temp
    }

    this.group.add(plane)
	}

	loadOrelsanArtist = () => {
      return new Promise((resolve, reject) => {
        let that = this
        this.mtlLoader.load('assets/persos/orelsan/model_orelsan.mtl', function(matl) {
          matl.preload()
          that.objLoader.setMaterials( matl )

          that.objLoader.load( 'assets/persos/orelsan/model_orelsan.obj', function ( object ) {
            object.scale.x = 2
            object.scale.y = 2
            object.scale.z = 2

            object.traverse(function(o) {
              if (o.type === 'Mesh') {
                o.castShadow = false
              }
            })

            that.group.add(object)
            resolve()
        })
      })
    })

  }

    loadMlleKArtist = () => {
      return new Promise((resolve, reject) => {
        let that = this

          let matl = new THREE.ShadowMaterial({ fog: false })
          matl.opacity = 0

          that.objLoader.load( 'assets/persos/mademoiselle-k/MademoiselleK_Guitar_Playing.obj', function ( object ) {
            object.scale.x = 4
            object.scale.y = 4
            object.scale.z = 4

            object.traverse(function(o) {
              if (o.type === 'Mesh') {
                o.castShadow = true
                o.receiveShadow = true
                o.material = matl
              }
            })

            that.group.add(object)
            resolve()
          })
      })
    }
}

export default ObjectsLoader
