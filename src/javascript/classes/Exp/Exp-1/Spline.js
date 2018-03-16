import anime from 'animejs'
import raf from 'raf'
import { Lethargy } from 'lethargy'
import { throttle } from 'lodash'

const lethargy = new Lethargy()

class Spline {
    constructor(options) {
			Storage.SplineClass = this

			this.spline = options.spline

			this.initObjects()
			this.updateCameraPos()
      this.bind()
    }

    bind() {
			window.addEventListener('mousewheel', this.handleScroll, false)
		}
		
		unbind() {
			window.removeEventListener('mousewheel', this.handleScroll, false)
		}
		
		initObjects() {
			this.cameraObj = {
				state: 0
			}
		}
		
		handleScroll = (event) => {
			if(lethargy.check(event) !== false) this.onRealScroll(event)
		}

		onRealScroll = throttle((event) => {
			const evolution = event.deltaY < 0 ? 0.08 : -0.08
			const end = Math.max(Math.min(this.cameraObj.state + evolution, 0.89), 0.01)
			this.animeSpline(this.cameraObj.state, end)
		}, 200, {leading: true, trailing: false})

		animeSpline(start, end) {
			anime.remove(this.cameraObj)
			this.anime = anime({
				targets: this.cameraObj,
				state: [start, end],
				duration: 800,
				easing: 'easeOutSine',
				update: this.updateCameraPos
			})
		}

		updateCameraPos = () => {
			const state = this.cameraObj.state
			const point = this.spline.getPoint(state)

			Storage.camera.position.copy(point)
			Storage.camera.lookAt(this.spline.getPoint(this.cameraObj.state + 0.01))

			this.lookAtRotation = Storage.camera.rotation.clone()
			this.lookAtRotation.reorder('YXZ')

			Storage.CameraClass.updateWithSpline()
		}
}

export default Spline
