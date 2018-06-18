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
      this.loader.loadLights().then((response) => {
        this.lightsGroup = response
      })
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

  conclusionEnding = () => {
    this.launchLightOne()
    setTimeout(() => { this.launchLightTwo() }, 9000)
  }

  launchLightOne = () => {
    this.state.relatedBox.add(this.lightsGroup.children[1])
    console.log("light one")
  }

  launchLightTwo = () => {
    this.state.relatedBox.add(this.lightsGroup.children[0])
    console.log("light two")
  }

}

export default Conclusion
