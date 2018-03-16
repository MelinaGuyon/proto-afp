import Carousel from './Carousel.js'

class Home {
    constructor(options) {
			Storage.HomeClass = this

			this.carousel = document.querySelector('.home__carousel')

			this.init()
    }

    init() {
			new Carousel(this.carousel, { index: 0})
		}
}

export default Home
