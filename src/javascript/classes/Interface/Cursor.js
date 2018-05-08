import anime from 'animejs'
import Inrtia from 'inrtia'
import raf from 'raf'
import { forEach } from 'lodash'

import datas from '../../datas/Colors.js'

class Cursor {
  constructor() {
    this.cursorContainer = document.querySelector('.cursor-container')

    this.dot = this.cursorContainer.querySelector('.dot')
    this.ring = this.cursorContainer.querySelector('.ring')
    this.innerRing = this.ring.querySelector('.inner')
    this.boundingDot = this.dot.getBoundingClientRect()
    this.boundingRing = this.ring.getBoundingClientRect()

    this.initInertia()
    this.bind()
  }

  bind = () => {
    window.addEventListener('mousemove', this.handleMove, { passive: true })
    raf.add(this.updateInertia)
    setTimeout(() => { this.bindEls() }, 1000)
  }

  bindEls = () => {
    this.domElsConcerned = document.querySelectorAll('.cursor-reveal')
    this.domElsConcerned.forEach((el) => {
      el.addEventListener('mouseenter', this.handleMouseEnter, { passive: true })
      el.addEventListener('mouseleave', this.handleMouseLeave, { passive: true })
    })
  }

  unbind = () => {
    window.removeEventListener('mousemove', this.handleMove, { passive: true })
    this.domElsConcerned.forEach((el) => {
      el.removeEventListener('mouseenter', this.handleMouseEnter, { passive: true })
      el.removeEventListener('mouseleave', this.handleMouseLeave, { passive: true })
    })
    raf.remove(this.updateInertia)
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
      x: new Inrtia(inrtiaOptions),
      y: new Inrtia(inrtiaOptions)
    }
  }

  handleMove = (event) => {
    this.dot.style.left = (event.clientX - this.boundingDot.width / 2) + "px"
    this.dot.style.top = (event.clientY - this.boundingDot.height / 2) + "px"

    let val = 26
    if (this.cursorContainer.classList.contains('reveal')) val = 33
    else if (this.cursorContainer.classList.contains('target')) val = 13

    const x = event.clientX - val
    const y = event.clientY - val
    this.inrtia.x.to(x)
		this.inrtia.y.to(y)
  }

  updateInertia = () => {
    if (!this.inrtia.x.stopped || !this.inrtia.y.stopped) {
      this.inrtia.y.update()
      this.inrtia.x.update()
      this.ring.style.left = this.inrtia.x.value + "px"
      this.ring.style.top = this.inrtia.y.value + "px"
    }
  }

  handleMouseEnter = (event) => {
    this.reveal()
  }

  handleMouseLeave = (event) => {
    this.reset()
  }

  reveal = () => {
    this.cursorContainer.classList.add('reveal')
    this.innerRing.style.border = datas.reveal[Storage.expName]
  }

  target = () => {
    this.cursorContainer.classList.add('target')
    this.innerRing.style.border = datas.target[Storage.expName]
  }

  reset = () => {
    this.cursorContainer.classList.remove('reveal', 'target')
    this.innerRing.style.removeProperty('border');
  }
}

export default Cursor
