const MTLLoader = require('three-mtl-loader')

class ModelIntro {

    constructor(options) {
      Storage.ModelIntroClass = this
      this.mtlLoader = new MTLLoader()
      this.objLoader = new THREE.OBJLoader()

      this.state = options

      this.init()
    }

    init() {
      this.createModel(this.state.model)
    }

    createModel = (modelUrl) => {
      let that = this

      that.objLoader.load( modelUrl, function ( obj ) {

        if (modelUrl === 'assets/models/douxpoison.obj') {
          obj.position.x = 0
          obj.position.y = 500
          obj.position.z = 2800
          obj.scale.set(2.2, 2.2, 2.2)
        }
        else if (modelUrl === 'assets/models/homme_politique.obj') {
          obj.position.x = 50
          obj.position.y = 250
          obj.position.z = 2700
          obj.scale.set(2.5, 2.5, 2.5)
        }
 

        that.state.relatedScene.add(obj)
      })
    }

}

export default ModelIntro
