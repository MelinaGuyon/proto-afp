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
    this.state.relatedBox.add(this.lightsGroup.children[1])
    this.state.relatedBox.add(this.lightsGroup.children[0])

    // this.state.relatedBox.add(this.lightsGroup.children[0])
    // Storage.SceneClasses.exp1.scene.add(this.lightsGroup.children[0])
    // this.state.relatedBox.add(this.lightsGroup.children[2])
    // Storage.SceneClasses.exp1.scene.add(this.lightsGroup.children[2])
  }

  conclusionEnding = () => {
    console.log("conclusionEnding")
    this.launchLightOne()
    setTimeout(() => { this.launchLightTwo() }, 9000)
  }

  launchLightOne = () => {
    anime({
      targets: this.state.relatedBox.children[1],
      intensity: [0, 5],
      duration: 700,
      easing: 'linear'
    })
  }

  launchLightTwo = () => {
    anime({
      targets: this.state.relatedBox.children[2],
      intensity: [0, 5],
      duration: 900,
      easing: 'linear'
    })
  }

}

export default Conclusion
