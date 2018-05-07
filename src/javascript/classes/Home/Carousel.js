import anime from 'animejs'
import { Lethargy } from 'lethargy'
import { throttle } from 'lodash'

import datas from '../../datas/Colors.js'

const lethargy = new Lethargy()

class Carousel {
  constructor(el, options) {
		Storage.HomeCarouselClass = this

    this.numberItems = 2
		this.index = options.index
		this.carousel = el

    this.init()
		this.bind()
  }

  init = () => {
    this.infos = document.querySelector('.home__interface')
    this.infosButton = this.infos.querySelector('button')
    this.background = this.infos.querySelector('.background')
    this.paper = this.infos.querySelector('.form-paper')
  }

  bind() {
		window.addEventListener('mousewheel', this.handleScroll, false)
		this.carousel.addEventListener('click', this.handleClick, false)
    this.infosButton.addEventListener('click', this.handleClick, false)
	}

	unbind() {
    window.removeEventListener('mousewheel', this.handleScroll, false)
		this.carousel.removeEventListener('click', this.handleClick, false)
    this.infosButton.removeEventListener('click', this.handleClick, false)
	}

	handleScroll = (event) => {
		if(lethargy.check(event) !== false) this.onRealScroll(event)
	}

	onRealScroll = throttle((event) => {
		const update = event.deltaY < 0 ? -1 : 1
    const oldIndex = this.index
	  this.index = Math.max(Math.min(this.index + update, this.numberItems - 1), 0)

    if (oldIndex === this.index) return
    this.updateInfo()
    this.updateInfo()
	}, 1000, {leading: true, trailing: false})


	handleClick = (event) => {
		if (this.index == 0) Storage.Experience1Class.init()
		if (this.index == 1) Storage.Experience2Class.init()
		this.unbind()
	}

	updateExpName = () => {
		Storage.expName = 'exp' + (this.index + 1)
  }

  updateRender = () => {
    Storage.ComposerClass.effectBetweenCarousel(this.index + 1)
    this.updateExpName()
  }

  updateInfo = () => {
    this.updateRender()
    this.updateBackground()
    this.updatePaper()
  }

  updateBackground = () => {
    const color = datas.backgrounds[Storage.expName]
    anime({
      targets: this.background,
      opacity: 0,
      duration: 100,
      easing: 'easeInQuad'
    })
  }

  updatePaper = () => {
    const color = datas.backgrounds[Storage.expName]
    anime({
      targets: this.paper,
      translateY: ['-50%', '-50%'],
      translateX: -700,
      opacity: 0,
      duration: 400,
      easing: 'easeInQuad',
      complete: () => {
        anime({
          targets: this.paper,
          translateY: ['-50%', '-50%'],
          translateX: 0,
          duration: 400,
          delay: 500,
          easing: 'easeOutQuad'
        })
        anime({
          targets: this.paper,
          opacity: 1,
          delay: 500,
          duration: 600,
          easing: 'easeOutQuad',
          complete: () => {
            anime({
              targets: this.background,
              backgroundColor: color,
              opacity: 1,
              duration: 400,
              easing: 'easeOutQuad',
            })
          }
        })
      }
    })
  }

}

export default Carousel
