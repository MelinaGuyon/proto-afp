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
      this.bind()
    }

    bind() {
			window.addEventListener('mousewheel', this.handleScroll, {passive: true})
		}
		
		unbind() {
			window.removeEventListener('mousewheel', this.handleScroll, {passive: true})
		}
		
		initObjects() {
			this.cameraObj = {
				state: 0
			}
		}

		placeCameraAtFirstPoint = () => {
			const point = this.spline.points[0]

			anime({
				targets: Storage.CameraClasses.exp2.camera.position,
				x: point.x,
				y: point.y,
				z: point.z,
				duration: 2000,
				easing: 'easeInOutQuad'
			})
		}
 		
		handleScroll = (event) => {
			if(lethargy.check(event) !== false) this.onRealScroll(event)
		}

		onRealScroll = throttle((event) => {
			const evolution = event.deltaY < 0 ? 0.12 : -0.12
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
			const point = this.spline.getPoint(state)

			Storage.CameraClasses.exp2.camera.position.copy(point)
			Storage.CameraClasses.exp2.camera.lookAt(this.spline.getPoint(this.cameraObj.state + 0.01))

			this.lookAtRotation = Storage.CameraClasses.exp2.camera.rotation.clone()
			this.lookAtRotation.reorder('YXZ')

			Storage.CameraClasses.exp2.updateWithSpline()
		}
}

export default Spline
