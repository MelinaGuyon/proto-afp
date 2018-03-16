import Renderer from '../Common/Renderer.js'
import Camera from '../Common/Camera.js'
import HiddingPanel from '../Common/HiddingPanel.js'

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
			new Camera({ lookAround: true, movementRange: .05 })
			new Renderer({ container: this.container })
			new Box()
			new Ambiance()
			new HiddingPanel()
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
			Storage.SplineClass.placeCameraAtFirstPoint()
			Storage.HiddingPanelClass.hidePanel()
			Storage.CameraClass.updateMovementRange(.5, 1000)
		}
}

export default Experience1
