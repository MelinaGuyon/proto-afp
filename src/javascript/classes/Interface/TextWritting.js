import anime from 'animejs'
import map from 'lodash/map'
import compact from 'lodash/compact'
import sample from 'lodash/sample'
import { throttle } from 'lodash'
import Inrtia from 'inrtia'
import raf from 'raf'

class TextWriting {
    constructor(options) {
		Storage.TextWriting = this

		this.init()
    this.initInertia()
    this.bindScroll()

    this.state = {
      target: [],
      current: [],
      index: 0,
      interval: 20,
      pass: false,
      baseHeight: this.wrapper.getBoundingClientRect().height,
      infoHeight: 0,
      infoHSupToBaseH: false,
      transformSaved: 0,
      transform: 0
    }
  }

  initInertia() {
    const inrtiaOptions = {
      value: 0,
      friction: 10,
      precision: 5,
      perfectStop: true,
      interpolation: 'linear'
    }
    this.inrtia = {
      y: new Inrtia(inrtiaOptions)
    }
  }

	init = () => {
    this.wrapper = document.querySelector('.infoContainerWrapper')
		this.infoContainer = document.querySelector('.infoContainer')
    this.titleContainer = document.querySelector('.panelContainer .title')
	}

  bindScroll = () => {
    this.infoContainer.addEventListener('mousewheel', this.handleScroll, { passive: true })
    raf.add(this.updateInertia)
  }

  unbindScroll = () => {
    this.infoContainer.removeEventListener('mousewheel', this.handleScroll)
    raf.remove(this.updateInertia)
  }

  bindInterval () {
    this.interval = window.setInterval(this.updateIndex, this.state.interval)
  }

	unbindInterval = () => {
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

      if (index > target.length && target.length < current.length) return this.unbindInterval()

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
    this.unbindInterval()

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

    this.createRow(true)
    this.bindInterval()
	}

  createRow = (bool) => {
    this.actualRow = document.createElement('div')
    this.actualRow.classList.add('row')
    this.newDiv.appendChild(this.actualRow)
    bool ? this.animeContainer(49) : this.animeContainer(34)
    setTimeout(() => { this.actualRow.classList.add('fill') }, 30)

    this.state.infoHeight = this.infoContainer.getBoundingClientRect().height

    if (!this.state.infoHSupToBaseH) {
      if (this.state.infoHeight > this.state.baseHeight - 20) this.state.infoHSupToBaseH = true
    }
  }

  writeSpan = (text) => {
    const newSpan = document.createElement('span')
    newSpan.innerText = text
    this.actualRow.appendChild(newSpan)
  }

  animeContainer = (Y) => {
    anime.remove(this.infoContainer)
    const formatedY = '-='+Y+'px'
    anime({
      targets: this.infoContainer,
      translateY: formatedY,
      duration: 600,
      easing: 'easeOutQuad'
    })
    this.state.transformSaved -= Y
    this.state.transform = this.state.transformSaved
  }

  handleScroll = (event) =>  {
    if (!this.state.infoHSupToBaseH) return
    const evolution = event.deltaY < 0 ? 50 : -50
    const end = Math.max(Math.min(this.state.transform + evolution , -this.state.baseHeight), this.state.transformSaved)
		this.inrtia.y.to(end)
  }

  updateInertia = () => {
    if (!this.inrtia.y.stopped) {
      this.inrtia.y.update()
      this.state.transform = this.inrtia.y.value
      this.infoContainer.style.transform = 'translateY('+ this.inrtia.y.value +'px)'
    }
  }

}

export default TextWriting
