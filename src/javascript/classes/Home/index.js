import Carousel from './Carousel.js'
import Renderer from '../Exp/Common/Renderer.js'
import TransitionPanel from './TransitionPanel.js'
import HiddingPanel from './HiddingPanel.js'

class Home {
    constructor(options) {
			Storage.HomeClass = this

			this.carousel = document.querySelector('.home__carousel')
      this.canvasContainer = this.carousel.querySelector('#container')

			this.init()
    }

    init() {
			new Carousel(this.carousel, { index: 0 })
      new Renderer({ container: this.canvasContainer })
      new TransitionPanel()
      new HiddingPanel()
		}
}

export default Home
