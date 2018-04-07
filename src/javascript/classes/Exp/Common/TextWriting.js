import Typed from 'typed.js'

class TextWriting {
    constructor(options) {
		Storage.TextWriting = this
		this.options = options

		this.init(this.options)
    }

	init = (options) => {

		/*this.options = {
		  strings: ["...solide et protectrice.", "...exécute froidement ses citoyens."],
		  typeSpeed: 50,
		  startDelay: 3000,
		}*/

		let newDiv = document.createElement('div')
		newDiv.className = 'textWriting'
		document.querySelector('.infoContainer').appendChild(newDiv)
		
		let textWriting = new Typed(".textWriting", options)
		document.querySelector('.textWriting').className = 'oldTextWriting'
	}
}

export default TextWriting
