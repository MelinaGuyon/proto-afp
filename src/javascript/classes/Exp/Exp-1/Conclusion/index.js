import ObjectsLoader from './ObjectsLoader'
import anime from 'animejs'


class Conclusion {
    constructor(options) {
    Storage.ConclusionClass = this
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
    this.updateCamera()

    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve() }, 500)
    })
  }

  displayChapterObjects = () => {
    this.state.relatedBox.add(this.modelsGroup)
  }

  updateCamera = () => {
    setTimeout(() => { this.state.relatedCamera.updateMovementRange(1) }, 3000)
  }
}

export default Conclusion
