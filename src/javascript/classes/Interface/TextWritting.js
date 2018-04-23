import anime from 'animejs'
import map from 'lodash/map'
import compact from 'lodash/compact'
import sample from 'lodash/sample'

class TextWriting {
    constructor(options) {
		Storage.TextWriting = this

    this.state = {
      target: [],
      current: [],
      index: 0,
      interval: 40,
      pass: false
    }

		this.init()
    }

	init = () => {
		this.infoContainer = document.querySelector('.infoContainer')
    this.titleContainer = document.querySelector('.panelContainer .title')
	}

  bind () {
    this.interval = window.setInterval(this.updateIndex, this.state.interval)
  }

	unbind = () => {
    clearInterval(this.interval)
    clearInterval(this.randomInterval)
    this.state.pass = false
    this.state.current = []
    this.state.current = []
	}

  addTitle = (text) => {
    this.titleContainer.innerText = text
    setTimeout(() => { this.titleContainer.classList.add('is-visible') }, 600)
  }

  updateIndex = () => {
    const { current, target } = this.state

    const numberToChange = 1

    for (let i = 0; i < Math.floor(numberToChange); i++) {
      const index = this.state.index + 1
      current[index] = target[index] || ''

      if (index > target.length && target.length < current.length) return this.unbind()

      if (index%26 === 25) this.state.pass = true
      if (this.state.pass && (current[index] === ' ' || current[index] === '') ) {
        this.createRow()
        this.state.pass = false
      }

      this.writeSpan(current[index])
      this.state.index = index
    }
  }

	writeInfo = (text) => {
    this.unbind()

    let current = compact(this.state.current)
    const target = text.text.split('')
    const length = target.length

    current = map(Array(length), (v, i) => current[i] || '')

    this.state.current = current
    this.state.target = target
    this.state.index = -1

    this.newDiv = document.createElement('div')
    this.newDiv.classList.add('info')
    this.infoContainer.appendChild(this.newDiv)

    this.createRow()
    this.bind()
	}

  createRow = () => {
    this.actualRow = document.createElement('div')
    this.actualRow.classList.add('row')
    this.newDiv.appendChild(this.actualRow)
    this.animeContainer()
    setTimeout(() => { this.actualRow.classList.add('fill') }, 30)
  }

  writeSpan = (text) => {
    const newSpan = document.createElement('span')
    newSpan.innerText = text
    this.actualRow.appendChild(newSpan)
  }

  animeContainer = () => {
    anime({
      targets: this.infoContainer,
      translateY: "-=36px",
      duration: 600,
      easing: 'easeOutQuad'
    })
  }

}

export default TextWriting
