import Renderer from '../Common/Renderer.js'
import Camera from '../Common/Camera.js'

import CursorLight from './CursorLight.js'
import Ambiance from './Ambiance.js'
import Spline from './Spline.js'
import Box from './Box.js'

class Experience1 {
    constructor(options) {
			Storage.Experience1Class = this

			this.container = document.querySelector('#container-exp1')

			this.initPreview()
    }

    initPreview() {
			new Camera({ lookAround: true })
			new Renderer({ container: this.container })
			new Box()
			new Ambiance()
		}

		init() {
			new Spline({
				spline: new THREE.SplineCurve3([
					new THREE.Vector3(0, 400, 1500),
					new THREE.Vector3( 700, 600, 0),
					new THREE.Vector3( -200, 400, 0),
					new THREE.Vector3( -800,  700, 1400),
					new THREE.Vector3( -650,  680, 1300)
				])
			})
		}
}

export default Experience1
