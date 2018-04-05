import anime from 'animejs'
import raf from 'raf'
import { Lethargy } from 'lethargy'
import { throttle } from 'lodash'

const lethargy = new Lethargy()

class Spline {
    constructor(options) {
			Storage.SplineClass = this

			this.state = options

			this.initObjects()
      this.bind()
    }

    bind() {
			window.addEventListener('mousewheel', this.handleScroll)
		}

		unbind() {
			window.removeEventListener('mousewheel', this.handleScroll)
		}

		initObjects() {
			this.cameraObj = {
				state: 0
			}
		}

		placeCameraAtFirstPoint = () => {
      this.unbind()
			const point = this.state.spline.points[0]
			anime({
				targets: this.state.relatedCamera.camera.position,
				x: point.x,
				y: point.y,
				z: point.z,
				duration: 2000,
				easing: 'easeInOutQuad',
        complete: () => { this.bind() }
			})
		}

		handleScroll = (event) => {
			if (lethargy.check(event) !== false) this.onRealScroll(event)
		}

		onRealScroll = throttle((event) => {
			const evolution = event.deltaY < 0 ? this.state.step : -this.state.step
			const end = Math.max(Math.min(this.cameraObj.state + evolution, 0.89), 0.01)
			this.animeSpline(this.cameraObj.state, end)
		}, 200, {leading: true, trailing: false})

		animeSpline(start, end) {
			anime.remove(this.cameraObj)
			this.anime = anime({
				targets: this.cameraObj,
				state: [start, end],
				duration: 1800,
				easing: 'easeOutSine',
				update: this.updateCameraPos
			})
		}

		updateCameraPos = () => {
			const state = this.cameraObj.state
			const point = this.state.spline.getPoint(state)

			this.state.relatedCamera.camera.position.copy(point)
			this.state.relatedCamera.camera.lookAt(this.state.spline.getPoint(this.cameraObj.state + 0.01))

			this.lookAtRotation = this.state.relatedCamera.camera.rotation.clone()
			this.lookAtRotation.reorder('YXZ')

			this.state.relatedCamera.updateWithSpline()
		}
}

export default Spline
