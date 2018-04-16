const MTLLoader = require('three-mtl-loader')

import ObjectsLoader from './ObjectsLoader'
import CursorLight from './CursorLight.js'

class Chapitre2 {
    constructor(options) {
		Storage.Chapitre2Class = this
    this.state = options

    this.modelsGroup

		this.loadChapter()
    }

	loadChapter = () => {
    this.loader = new ObjectsLoader()
    this.loader.load().then((response) => {
      console.log("RESPONSE", response)
      this.modelsGroup = response
    })
	}

  init = () => {
    this.displayChapterObjects()
    this.initLight()
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve() }, 500)
    })
  }

  initLight = () => {
    this.state.lightOpt.push(this.modelsGroup.children[0])
    this.light = new CursorLight({
      sceneIndex: 1,
      relatedCamera: this.state.relatedCamera,
      intensity: 0,
      sphereVisible: false,
      castingShadow: false,
      intersects: this.state.lightOpt
    })
    setTimeout(() => {
      this.light.updateCastingShadow(true)
      this.light.updateSphereVisibility(true)
      this.light.updateLightIntensity(1)
    }, 4000)
  }

  displayChapterObjects = () => {
    this.state.relatedBox.add(this.modelsGroup)
  }
}

export default Chapitre2
