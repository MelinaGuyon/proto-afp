import Camera from '../Common/Camera.js'
import Scene from '../Common/Scene.js'
import HiddingPanel from '../Common/HiddingPanel.js'
import Spline from '../Common/Spline.js'

import CursorLight from './CursorLight.js'
import Ambiance from './Ambiance.js'
import Box from './Box.js'

class Experience1 {
    constructor(options) {
			Storage.Experience1Class = this
			this.initPreview()
    }

    initPreview = () => {
			this.camera = new Camera({ name: 'exp1', lookAround: true, movementRange: .05  })
      this.scene = new Scene({ name: 'exp1'  })
			this.box = new Box()
			this.ambiance = new Ambiance()
			this.panel = new HiddingPanel({ relatedCamera: this.camera.camera })
      this.light = new CursorLight({ intensity: 0, sphereVisible: false })
		}

		init = () => {
			this.spline = new Spline({
				spline: new THREE.SplineCurve3([
					new THREE.Vector3(0, 400, 1500),
					new THREE.Vector3( 700, 600, 0),
					new THREE.Vector3( -200, 400, 0),
					new THREE.Vector3( -800,  700, 1400),
					new THREE.Vector3( -650,  680, 1300)
				]),
        relatedCamera: this.camera
			})

			this.spline.placeCameraAtFirstPoint()
			this.panel.hidePanel()
      this.camera.updateMovementRange(0, 1900)

      this.light.updateSphereVisibility(true)
      this.light.updateLightIntensity(1)
		}
}

export default Experience1
