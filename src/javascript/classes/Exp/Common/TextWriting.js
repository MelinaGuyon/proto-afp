import Typed from 'typed.js'
import anime from 'animejs'

// quand stockage du texte pendant écriture du suivant supprimer le delay de l'anim
// fixer bug sur la valeur de textStored quand stockage de la deuxième info

class TextWriting {
    constructor(options) {
		Storage.TextWriting = this
		this.options = options
		Storage.textStored = false

		this.init(this.options)
    }

	init = (options) => {
		if ( Storage.currentlyWriting === true ) {
			Storage.textStored = true

			this.storeInfo()
			this.writeInfo(options)
		}

		else {
			this.writeInfo(options)
		}
	}

	writeInfo = (options) => {
		Storage.currentlyWriting = true

		let newDiv = document.createElement('div')
		newDiv.className = 'textWriting'
		document.querySelector('.currentInfoContainer').appendChild(newDiv)
		
		this.textWriting = new Typed(".textWriting", options)
		document.querySelector('.textWriting').className = 'currentTextWriting'
	}

	storeInfo = () => {
		anime({
	      targets: document.querySelector('.currentTextWriting'),
	      translateX: "300px",
	      duration: 1000,
	      easing: 'easeInOutQuad',
	      delay: 1000,
	      complete: () => {
	        document.querySelector('.oldInfoContainerText').appendChild(document.querySelector('.currentTextWriting'))
			anime({
		      	targets: document.querySelector('.currentTextWriting'),
	    		translateX: "0px",
	    		duration: 1000,
	      		easing: 'easeInOutQuad',
	      		complete: () => { 
	      			Storage.currentlyWriting = false
	      			Storage.textStored = true 
	      		}
	    	})
	    	document.querySelector('.currentTextWriting').className = "oldTextWriting"
			document.querySelector('.oldInfoContainer').addEventListener('mouseover', this.oldInfoContainerOver)
	      }
    	})
	}

	oldInfoContainerOver = () => {
    	anime({
    		targets: document.querySelector('.oldInfoContainer'),
		    right: "10px",
	        duration: 1200,
			complete: () => {
				document.querySelector('.oldInfoContainer').removeEventListener('mouseover', this.oldInfoContainerOver)
				document.querySelector('.oldInfoContainer').addEventListener('mouseleave', this.oldInfoContainerLeave)
			}
      	})  
    }
    oldInfoContainerLeave = () => {
      	anime({
	        targets: document.querySelector('.oldInfoContainer'),
		    right: "-240px",
	        duration: 1200,
	        complete: () => {
	        	document.querySelector('.oldInfoContainer').removeEventListener('mouseleave', this.oldInfoContainerLeave)
				document.querySelector('.oldInfoContainer').addEventListener('mouseover', this.oldInfoContainerOver)
			}
      	})  
    }
}

export default TextWriting
