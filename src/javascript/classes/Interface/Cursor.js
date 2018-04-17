import anime from 'animejs'
import Inrtia from 'inrtia'
import raf from 'raf'

class Cursor {
  constructor() {
    this.cursorContainer = document.querySelector('.cursor-container')
    
    this.dot = this.cursorContainer.querySelector('.dot')
    this.ring = this.cursorContainer.querySelector('.ring')
    this.boundingDot = this.dot.getBoundingClientRect()
    this.boundingRing = this.ring.getBoundingClientRect()

    this.initInertia()
    this.bind()
  }

  bind = () => {
    window.addEventListener('mousemove', this.handleMove, { passive: true })
  }
  
  unbind = () => {
    window.removeEventListener('mousemove', this.handleMove, { passive: true })
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
    raf.add(this.updateInertia)
  }

  handleMove = (event) => {
    

    this.dot.style.left = (event.clientX - this.boundingDot.width / 2) + "px" 
    this.dot.style.top = (event.clientY - this.boundingDot.height / 2) + "px"

    const x = event.clientX - this.boundingRing.width / 2
    const y = event.clientY - this.boundingRing.height / 2
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
}

export default Cursor
