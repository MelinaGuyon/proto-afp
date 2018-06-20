import Title from './Title.js'
import TextWritting from './TextWritting.js'
import TimelineExp from './TimelineExp.js'
import Subtitles from './Subtitles.js'
import Cursor from './Cursor.js'
import Intro from './Intro.js'
import Instructions from './Instructions.js'
import ActusAFP from './ActusAFP.js'

class Interface {
    constructor(options) {
			Storage.InterfaceClass = this
			this.init()

      this.menu = document.querySelector('.menu-wrapper')
    }

    init() {
      this.cursor = new Cursor()
      this.intro = new Intro()
		}

    displayExpInterface = () => {
      this.title = new Title()
      this.instructions = new Instructions()
      this.textWriting = new TextWritting()
      this.timelineExp = new TimelineExp()
      this.subtitles = new Subtitles()
      this.actus = new ActusAFP()

      // this.actus.makeActu()
      // this.actus.showActu()
    }

    updateLogo = (src) => {
      const logo = document.querySelector('.logo-website')
      logo.classList.add('hidden')
      setTimeout(() => {
        logo.setAttribute('src', src)
        logo.classList.remove('hidden')
      }, 600)
    }

    showMenu = () => {
      this.menu.classList.remove('is-hidden')
    }

    hideMenu = () => {
      this.menu.classList.add('is-hidden')
    }
}

export default Interface
