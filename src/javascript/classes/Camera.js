import anime from 'animejs'
import { debounce } from 'lodash'

class Renderer {
    constructor(options) {
			Storage.CameraClass = this

			this.cameraObj = {
				state: 0
			}
			this.angleX = 0
			this.angleY = 0

			this.initCamera()
			this.updateCamera()
      this.bind()
    }

    bind() {
			window.addEventListener('mousewheel', this.handleScroll, false)
			window.addEventListener('mousemove', this.handleMouseMove, false)
		}
		
		unbind() {
			window.removeEventListener('mousewheel', this.handleScroll, false)
			window.removeEventListener('mousemove', this.handleMouseMove, false)
    }

    initCamera() {
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50000);
			Storage.camera = this.camera
			Storage.camera.position.set(0, 400, 1500)
						
			this.spline = new THREE.SplineCurve3([
				new THREE.Vector3(500,  400, 1500),
				new THREE.Vector3( 700, 600, 0),
				new THREE.Vector3( -200, 400, 0),
				new THREE.Vector3( -800,  700, 1400),
				new THREE.Vector3( -650,  680, 1300)
			])
    }

		handleScroll = (event) => {
			const evolution = event.deltaY < 0 ? 0.025 : -0.025
			const end = Math.max(Math.min(this.cameraObj.state + evolution, 0.89), 0.01)
			this.animeSpline(this.cameraObj.state, end)
		}

		handleMouseMove = (event) => {
			const vect = new THREE.Vector2()

			const X = (window.innerWidth - event.clientX) / window.innerWidth
			const angleX = X - .5
			const Y = (window.innerHeight - event.clientY) / window.innerHeight
			const angleY = Y - .5 

			vect.x = angleX * Math.PI * .5
			vect.y = angleY * Math.PI * .5

			this.headRotation = vect
			this.updateRotation()
		}

		updateRotation () {
			this.camera.rotation.copy(this.lookAtRotation)
			if (!this.headRotation) return
			this.camera.rotation.x += this.headRotation.y
			this.camera.rotation.y += this.headRotation.x
		}

		animeSpline(start, end) {
			this.anime = anime({
				targets: this.cameraObj,
				state: [start, end],
				duration: 800,
				easing: 'easeOutCirc',
				update: this.updateCamera
			})
		}

		updateCamera = () => {
			const state = this.cameraObj.state
			const point = this.spline.getPoint(state)

			this.camera.position.set(point.x, point.y, point.z)
			this.camera.lookAt(this.spline.getPoint(this.cameraObj.state + 0.01))

			this.lookAtRotation = this.camera.rotation.clone()
			this.lookAtRotation.reorder('YXZ')

			this.updateRotation()
		}
}

export default Renderer
