const MTLLoader = require('three-mtl-loader')

import ObjectsLoader from './ObjectsLoader'


class Chapitre1 {
    constructor(options) {
		Storage.Chapitre2Class = this
    this.state = options

		this.modelsGroup

		this.init()
    }

	init = () => {
    this.loader = new ObjectsLoader()
    this.loader.load().then((response) => {
      this.modelsGroup = response
      this.displayChapterObjects()
    })
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

export default Chapitre1
