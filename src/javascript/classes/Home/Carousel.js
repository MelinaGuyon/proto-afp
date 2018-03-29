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

			this.resizeWrapper()
			this.bind()
    }

    bind() {
			window.addEventListener('mousewheel', this.handleScroll, false)
			window.addEventListener('click', this.handleClick, false)
			window.addEventListener('resize', this.resizeWrapper, false)
		}

		unbind() {
			window.removeEventListener('click', this.handleClick, false)
			window.removeEventListener('mousewheel', this.handleScroll, false)
		}

		resizeWrapper = () => {
			this.carousel.style.width = window.innerWidth * this.numberItems + 'px'
		}

		handleScroll = (event) => {
			if(lethargy.check(event) !== false) this.onRealScroll(event)
		}

		onRealScroll = throttle((event) => {
			const update = event.deltaY < 0 ? -1 : 1
		  this.index = Math.max(Math.min(this.index + update, this.numberItems - 1), 0)

			Storage.expName = 'exp' + (this.index + 1)
      console.log(Storage.expName)

      // this.animeCanvas()

		}, 500, {leading: true, trailing: false})

    animeCanvas = () => {
      Storage.RendererClass.updateCanvasPos(-window.innerWidth * this.index, 0, window.innerWidth, window.innerHeight)
    }

		handleClick = (event) => {
			if (this.index == 0) Storage.Experience1Class.init()
			if (this.index == 1) Storage.Experience2Class.init()
			this.unbind()
		}
}

export default Carousel
