import ObjectsLoader from './ObjectsLoader'

class Chapitre1 {
    constructor(options) {
		Storage.Chapitre1Class = this
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
    //new TextWriting({ exp: 'exp1', chap: 'chap1'})
    this.displayChapterObjects()
  }

  displayChapterObjects = () => {
    this.state.relatedBox.add(this.modelsGroup)
  }
}

export default Chapitre1
