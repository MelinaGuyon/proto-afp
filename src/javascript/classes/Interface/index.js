import Title from './Title.js'
import TextWritting from './TextWritting.js'
import Cursor from './Cursor.js'

class Interface {
    constructor(options) {
			Storage.InterfaceClass = this
			this.init()
    }

    init() {
      this.title = new Title()
      this.cursor = new Cursor()
      new TextWritting()
		}
}

export default Interface
