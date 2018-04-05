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
      this.modelsGroup = response
    })
	}

  init = () => {
    this.displayChapterObjects()
  }

  initLight = () => {
    this.light = new CursorLight({
      sceneIndex: 1,
      relatedCamera: this.state.relatedCamera,
      intensity: 1,
      sphereVisible: true,
      intersects: this.state.lightOpt })
  }

  displayChapterObjects = () => {
    this.state.relatedBox.add(this.modelsGroup)
  }

  displayOrelsan = () => {
    this.state.relatedBox.add(this.modelsTab[0])
  }

  displayMlleKArtist = () => {
    this.state.relatedBox.add(this.modelsTab[1])
  }
}

export default Chapitre2
