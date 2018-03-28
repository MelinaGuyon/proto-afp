import Carousel from './Carousel.js'
import Renderer from '../Exp/Common/Renderer.js'

class Home {
    constructor(options) {
			Storage.HomeClass = this

			this.carousel = document.querySelector('.home__carousel')

      this.canvasContainer = document.querySelector('#container-exp1')

			this.init()
    }

    init() {
			new Carousel(this.carousel, { index: 0})
      new Renderer({ container: this.canvasContainer })
		}
}

export default Home
