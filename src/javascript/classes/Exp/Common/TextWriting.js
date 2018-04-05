import Typed from 'typed.js'

class TextWriting {
    constructor(options) {
		Storage.TextWriting = this
		this.exp = options.exp
		this.chap = options.chap

		this.options1 = {}
		this.options2 = {}

		this.init(this.exp, this.chap)
    }

	init = (exp, chap) => {

		if (exp === "exp1" && chap === "chap1") {
			this.options1 = {
			  strings: ["J'ai fui mon pays à 16 ans.", "Je lui étais jusqu'alors toujours resté fidèle."],
			  typeSpeed: 50,
			  loopCount: 1,
			  startDelay: 4000,
			}

			this.options2 = {
			  strings: ["Je m'appelle Min-Ho, je suis nord-coréen."],
			  typeSpeed: 50,
			  loopCount: 1,
			}
		}

		let typed1 = new Typed(".test_typedjs_1", this.options1)
		let typed2 = new Typed(".test_typedjs_2", this.options2)
	}
}

export default TextWriting
