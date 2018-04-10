import Typed from 'typed.js'

class TextWriting {
    constructor(options) {
		Storage.TextWriting = this
		this.options = options

		this.infoContainerStyle = window.getComputedStyle(document.querySelector('.infoContainer'), null)

		this.init(this.options)
    }

	init = (options) => {

		let newDiv = document.createElement('div')
		newDiv.className = 'textWriting'
		document.querySelector('.infoContainer').appendChild(newDiv)
		
		let textWriting = new Typed(".textWriting", options)
		document.querySelector('.textWriting').className = 'currentTextWriting'
	}

	onComplete = () => {
		document.querySelector('.currentTextWriting').style.position = "relative"
		//document.querySelector('.currentTextWriting').style.marginBottom = ""+this.infoContainerStyle.height+""
		document.querySelector('.currentTextWriting').style.marginTop = "-112px"

		document.querySelector('.currentTextWriting').className = "oldTextWriting"
	}
		
}

export default TextWriting
