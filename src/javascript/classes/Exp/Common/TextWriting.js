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

		console.log(exp, chap)

		if (exp === "exp1" && chap === "chap2") {
			this.options1 = {
			  strings: ["...solide et protectrice.", "...exécute froidement ses citoyens."],
			  typeSpeed: 50,
			  startDelay: 3000,
			}

			this.options2 = {
			  strings: ["L'armée..."],
			  typeSpeed: 30,
			  loopCount: 1,
			}
		}

		let typed1 = new Typed(".test_typedjs_1", this.options1)
		let typed2 = new Typed(".test_typedjs_2", this.options2)
	}
}

export default TextWriting
