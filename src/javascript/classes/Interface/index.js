import Title from './Title.js'
import TextWritting from './TextWritting.js'
import TimelineExp from './TimelineExp.js'
import Subtitles from './Subtitles.js'
import Cursor from './Cursor.js'
import ActusAFP from './ActusAFP.js'

class Interface {
    constructor(options) {
			Storage.InterfaceClass = this
			this.init()

      // to test
      this.displayActus()
    }

    init() {
      this.cursor = new Cursor()
		}

    displayExpInterface = () => {
      this.title = new Title()
      this.textWriting = new TextWritting()
      this.timelineExp = new TimelineExp()
      this.subtitles = new Subtitles()
    }

    displayActus = () => {
      this.actus = new ActusAFP()
    }
}

export default Interface
