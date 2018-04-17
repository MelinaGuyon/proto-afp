import Title from './Title.js'
import TextWriting from './TextWriting.js'
import Cursor from './Cursor.js'

class Interface {
    constructor(options) {
			Storage.InterfaceClass = this
			this.init()
    }

    init() {
      this.title = new Title()
      this.cursor = new Cursor()
      new TextWriting()
		}
}

export default Interface
