import Typed from 'typed.js'
import anime from 'animejs'

class TextWriting {
    constructor(options) {
		Storage.TextWriting = this
		this.options = options

		this.init()
		this.bind()
    }

	init = () => {
		this.oldInfoContainer = document.querySelector('.oldInfoContainer')
		this.oldInfoContainerText = document.querySelector('.oldInfoContainerText')

		this.currentInfoContainer = document.querySelector('.currentInfoContainer')
		this.currentInfoContainerText = document.querySelector('.currentTextWriting')
	}

	bind = () => {
		this.oldInfoContainer.addEventListener('mouseenter', this.oldInfoContainerEnter)
		this.oldInfoContainer.addEventListener('mouseleave', this.oldInfoContainerLeave)
	}

	unbind = () => {
		this.oldInfoContainer.removeEventListener('mouseover', this.oldInfoContainerEnter)
		this.oldInfoContainer.removeEventListener('mouseleave', this.oldInfoContainerLeave)
	}

	writeInfo = (options) => {
		if ( Storage.currentlyWriting === true ) {
			this.storeInfo()
		}

		Storage.currentlyWriting = true
		this.typedText = new Typed(".currentTextWriting", options)
		this.currentInfoContainerText.classList.add('has-padding')
	}

	hideTextPanel = () => {
		anime({
			targets: this.currentInfoContainer,
			translateX: "300px",
			duration: 1000,
			easing: 'easeInOutQuad',
			delay: 1000,
			complete: () => {
				this.storeInfo()
				this.currentInfoContainerText.classList.remove('has-padding')
				this.currentInfoContainer.style.transform = "translateX(0)"
			}
		})
	}

	storeInfo = () => {
		this.currentInfoContainerText.innerText = ""

		let newDiv = document.createElement('div')
		newDiv.innerText = this.typedText.options.strings[0]
		this.oldInfoContainerText.appendChild(newDiv)

		Storage.currentlyWriting = false
		this.typedText.destroy()
	}

	oldInfoContainerEnter = () => {
		if (this.oldInfoContainerText.children.length === 0) return
		anime.remove(this.oldInfoContainer)
    anime({
			targets: this.oldInfoContainer,
			right: "10px",
			duration: 600,
			easing: 'easeOutQuad'
		})  
	}

	oldInfoContainerLeave = () => {
		anime.remove(this.oldInfoContainer)
		anime({
			targets: this.oldInfoContainer,
			right: "-240px",
			duration: 600,
			easing: 'easeOutQuad'
		})  
	}
}

export default TextWriting
