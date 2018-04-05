import Typed from 'typed.js'

class TextWriting {
    constructor(options) {
		Storage.TextWriting = this

		this.init()
    }

	init = () => {
		let options1 = {
		  strings: ["La Corée du Nord c'est trop fort", "Kom le rokfor."],
		  typeSpeed: 50,
		  loop: true,
		}

		let options2 = {
		  strings: ["La Corée du Nord c'est trop fort"],
		  typeSpeed: 50,
		  loop: false,
		  loopCount: 1,
		}

		let typed1 = new Typed(".test_typedjs_1", options1)
		let typed2 = new Typed(".test_typedjs_2", options2)

	}


}

export default TextWriting
