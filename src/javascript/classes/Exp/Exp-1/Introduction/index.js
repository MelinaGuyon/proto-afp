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

  remove = () => {
    setTimeout(() => {
      this.state.relatedBox.remove(this.modelsGroup)
      console.log(this.state.relatedBox, 'intro')
    }, 4000)
  }

  displayChapterObjects = () => {
    this.state.relatedBox.add(this.modelsGroup)
    console.log(this.state.relatedBox, 'intro')
  }

}

export default Introduction
