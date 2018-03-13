import anime from 'animejs'
import Inrtia from 'inrtia'
import raf from 'raf'
import { Lethargy } from 'lethargy'
import { throttle } from 'lodash'

const lethargy = new Lethargy()

class Camera {
    constructor(options) {
			Storage.CameraClass = this

			this.initObjects()
			this.initCamera()
			// this.updateCameraPos()
      // this.bind()
    }

    bind() {
			window.addEventListener('mousewheel', this.handleScroll, false)
			window.addEventListener('mousemove', this.handleMouseMove, false)
		}
		
		unbind() {
			window.removeEventListener('mousewheel', this.handleScroll, false)
			window.removeEventListener('mousemove', this.handleMouseMove, false)
			raf.remove(this.updateInertia)
		}
		
		initObjects() {
			this.cameraObj = {
				state: 0
			}
			const inrtiaOptions = {
				value: 0,
				friction: 10,
				precision: 5,
				perfectStop: true,
				interpolation: 'linear'
			}
			this.inrtia = {
				x: new Inrtia(inrtiaOptions),
				y: new Inrtia(inrtiaOptions)
			}
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

			raf.add(this.updateInertia)
		}
		
		handleScroll = (event) => {
			if(lethargy.check(event) !== false) this.onRealScroll(event)
		}

		onRealScroll = throttle((event) => {
			console.log('scroll')
			const evolution = event.deltaY < 0 ? 0.08 : -0.08
			const end = Math.max(Math.min(this.cameraObj.state + evolution, 0.89), 0.01)
			this.animeSpline(this.cameraObj.state, end)
		}, 200, {leading: true, trailing: false})

		handleMouseMove = (event) => {
			const vect = new THREE.Vector2()

			const X = (window.innerWidth - event.clientX) / window.innerWidth
			const angleX = X - .5
			const Y = (window.innerHeight - event.clientY) / window.innerHeight
			const angleY = Y - .5 

			vect.x = angleX * Math.PI * .5
			vect.y = angleY * Math.PI * .5

			this.inrtia.x.to(vect.x)
			this.inrtia.y.to(vect.y)
		}

		updateRotation () {
			this.camera.rotation.copy(this.lookAtRotation)
			this.camera.rotation.x += this.inrtia.y.value
			this.camera.rotation.y += this.inrtia.x.value
		}

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

			this.camera.position.copy(point)
			this.camera.lookAt(this.spline.getPoint(this.cameraObj.state + 0.01))

			this.lookAtRotation = this.camera.rotation.clone()
			this.lookAtRotation.reorder('YXZ')

			this.updateRotation()
		}

		updateInertia = () => {
			if (!this.inrtia.x.stopped || !this.inrtia.y.stopped) {
				this.inrtia.y.update()
				this.inrtia.x.update()
				this.updateRotation()
			}
		}
}

export default Camera
