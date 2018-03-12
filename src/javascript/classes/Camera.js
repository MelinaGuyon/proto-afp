import anime from 'animejs'
import raf from 'raf'
import { debounce } from 'lodash'

class Renderer {

    constructor(options) {
			STORAGE.CameraClass = this

			this.cameraObj = {
				state: 0
			}

			this.initCamera()
			this.updateCamera()
      this.bind()
    }

    bind() {
			window.addEventListener( 'resize', this.onWindowResize, false )
			window.addEventListener( 'mousewheel', debounce(this.handleScroll, 10) , false )
    }

    initScene() {
      this.scene = new THREE.Scene()
      STORAGE.scene = this.scene
    }

    initCamera() {
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50000);
			STORAGE.camera = this.camera
			STORAGE.camera.position.x = 0
			STORAGE.camera.position.y = 400
      STORAGE.camera.position.z = 1500	
			
			this.spline = new THREE.SplineCurve3([
				new THREE.Vector3(500,  400, 1500),
				new THREE.Vector3( 700, 600, 0),
				new THREE.Vector3( -200, 400, 0),
				new THREE.Vector3( -500,  700, 700)
			])

			this._needsUpdate = true
			raf.add(this.tick)
    }

    onWindowResize() {
      STORAGE.camera.aspect = window.innerWidth / window.innerHeight
      STORAGE.camera.updateProjectionMatrix()
      STORAGE.renderer.setSize(window.innerWidth, window.innerHeight)
		}

		handleScroll = (event) => {
			const evolution = event.deltaY < 0 ? 0.025 : -0.025
			const end = Math.max(Math.min(this.cameraObj.state + evolution, 0.99), 0)
			this.animeSpline(this.cameraObj.state, end)
		}

		animeSpline(start, end) {
			this.anime = anime({
				targets: this.cameraObj,
				state: [start, end],
				duration: 800,
				easing: 'easeOutCirc',
				update: () => (this._needsUpdate = true)
			})
		}

		updateCamera() {
			const state = this.cameraObj.state
			const point = this.spline.getPoint(state)

			const x = point.x
			const y = point.y
			const z = point.z

			this.camera.position.set(x, y, z)
			this.camera.lookAt(this.spline.getPoint(this.cameraObj.state + 0.01));
			// this.camera.lookAt(this.spline.getTangent(this.cameraObj.state + 0.01));
		}
		
		tick = () => {
			if (!this._needsUpdate) return
			this.updateCamera()
			this._needsUpdate = false
		}
}

export default Renderer
