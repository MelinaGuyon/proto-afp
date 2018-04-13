import Typed from 'typed.js'
import anime from 'animejs'


class TextWriting {
    constructor(options) {
		Storage.TextWriting = this
		this.options = options
		this.id = options.id

		this.init(this.options)
    }

	init = (options) => {
		document.querySelector('.oldInfoContainer').addEventListener('mouseover', this.oldInfoContainerOver)

		if ( Storage.currentlyWriting === true ) {
			document.querySelector('.currentInfoContainer').removeChild(document.querySelector('.currentTextWriting'))

			let previousId = this.id-1

			let newDiv = document.createElement('div')
			newDiv.innerHTML = Storage.textWriting.strings[0]
			newDiv.id = '#currentTextWriting'+previousId+''
			newDiv.className = 'oldTextWriting'

	        document.querySelector('.oldInfoContainerText').appendChild(newDiv)

	        Storage.textWriting.destroy()
			
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
		
		Storage.textWriting = new Typed(".textWriting", options)

		this.currentTextWritingId = 'currentTextWriting'+this.id+''
		document.querySelector('.textWriting').id = this.currentTextWritingId
		document.querySelector('.textWriting').className = 'currentTextWriting'
	}

	storeInfo = () => {
		anime({
	      targets: document.querySelector('#'+this.currentTextWritingId+''),
	      translateX: "300px",
	      duration: 1000,
	      easing: 'easeInOutQuad',
	      delay: 1000,
	      complete: () => {
	      	document.querySelector('.currentInfoContainer').removeChild(document.querySelector('.currentTextWriting'))

	        let id = this.id
			let newDiv = document.createElement('div')
			newDiv.innerHTML = Storage.textWriting.strings[0]
			newDiv.id = '#currentTextWriting'+id+''
			newDiv.className = "oldTextWriting"

	        document.querySelector('.oldInfoContainerText').appendChild(newDiv)

  			Storage.currentlyWriting = false
  			Storage.textWriting.destroy()
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
