import anime from 'animejs'
import { Lethargy } from 'lethargy'
import { throttle } from 'lodash'


const lethargy = new Lethargy()

class Carousel {
  constructor(el, options) {
		Storage.HomeCarouselClass = this

    this.numberItems = 2
		this.index = options.index
		this.carousel = el

		this.bind()
  }

  bind() {
		window.addEventListener('mousewheel', this.handleScroll, false)
		this.carousel.addEventListener('click', this.handleClick, false)
	}

	unbind() {
		window.removeEventListener('click', this.handleClick, false)
		this.carousel.removeEventListener('mousewheel', this.handleScroll, false)
	}

	handleScroll = (event) => {
		if(lethargy.check(event) !== false) this.onRealScroll(event)
	}

	onRealScroll = throttle((event) => {
		const update = event.deltaY < 0 ? -1 : 1
    const oldIndex = this.index
	  this.index = Math.max(Math.min(this.index + update, this.numberItems - 1), 0)

    if (oldIndex === this.index) return
    // if (update > 0) avanceCarousel
    // else reculeCarousel

	}, 1400, {leading: true, trailing: false})


	handleClick = (event) => {
		if (this.index == 0) Storage.Experience1Class.init()
		if (this.index == 1) Storage.Experience2Class.init()
		this.unbind()
	}

	updateExpName = () => {
		Storage.expName = 'exp' + (this.index + 1)
  }

}

export default Carousel
