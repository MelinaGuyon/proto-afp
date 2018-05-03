import ObjectsLoader from './ObjectsLoader'
import anime from 'animejs'


class Introduction {
    constructor(options) {
    Storage.IntroductionClass = this
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

    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve() }, 500)
    })
  }

  displayChapterObjects = () => {
    this.state.relatedBox.add(this.modelsGroup)
  }
}

export default Introduction
