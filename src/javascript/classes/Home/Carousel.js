import anime from 'animejs'
import { Lethargy } from 'lethargy'
import { throttle } from 'lodash'

import datas from '../../datas/Colors.js'
import datasHome from '../../datas/Home.js'

const lethargy = new Lethargy()

class Carousel {
  constructor(el, options) {
		Storage.HomeCarouselClass = this

    this.numberItems = 2
		this.index = options.index
		this.carousel = el

    this.init()
		this.bind()
    this.updateContent()
    this.animeButton()
  }

  init = () => {
    this.infos = document.querySelector('.home__interface')
    this.infosButton = this.infos.querySelector('button')
    this.background = this.infos.querySelector('.background')
    this.paper = this.infos.querySelector('.form-paper')
    this.black = this.infos.querySelector('.form-black')
    this.content = this.paper.querySelector('.content')
    this.title = this.paper.querySelector('.title')
    this.text = this.paper.querySelector('.text')
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
    this.updateBlack()
  }

  updateBlack = () => {
    anime({
      targets: this.black,
      translateX: -300,
      duration: 300,
      delay: 100,
      easing: 'easeInOutQuad',
      complete: () => {
        anime({
          targets: this.black,
          translateX: 0,
          duration: 400,
          delay: 400,
          easing: 'easeInOutQuad'
        })
      }
    })
  }

  updateBackground = () => {
    const color = datas.backgrounds[Storage.expName]

    anime({
      targets: this.background,
      translateX: -700,
      duration: 400,
      easing: 'easeInOutQuad',
      complete: () => {
        this.background.style.opacity = 1
        this.background.style.backgroundColor = color
        anime({
          targets: this.background,
          translateX: 0,
          duration: 400,
          delay: 200,
          easing: 'easeInOutQuad'
        })
      }
    })
  }

  updateContent = () => {
    this.text.innerHTML = datasHome.texts[Storage.expName]
    this.title.setAttribute('src', datasHome.titles[Storage.expName])
  }

  updatePaper = () => {
    anime({
      targets: this.paper,
      translateY: ['-50%', '-50%'],
      translateX: -700,
      duration: 400,
      easing: 'easeInOutQuad',
      complete: () => {
        this.infosButton.classList.remove('is-animated')
        this.updateContent()
        this.animeButton()
        anime({
          targets: this.paper,
          translateY: ['-50%', '-50%'],
          translateX: 0,
          duration: 400,
          delay: 200,
          easing: 'easeInOutQuad'
        })
      }
    })
  }

  animeButton = () => {
    setTimeout(() => { this.infosButton.classList.add('is-animated') }, 800)
  }

}

export default Carousel
