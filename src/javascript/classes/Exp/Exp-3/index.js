import Scene from '../Common/Scene.js'
import Camera from '../Common/Camera.js'
import Spline from '../Common/Spline.js'

import ModelIntro from '../Common/ModelIntro.js'

import Ambiance from './Ambiance.js'

class Experience3 {
    constructor(options) {
			Storage.Experience3Class = this
			this.initPreview()
    }

    initPreview = () => {
      this.camera = new Camera({ name: 'exp3', lookAround: true, movementRange: .05  })
      this.scene = new Scene({ name: 'exp3'  })

			this.ambiance = new Ambiance()
      this.modelIntro = new ModelIntro({ relatedScene: this.scene.scene, color: 0x550F6C, model: 'assets/models/homme_politique.obj' })
		}

		init = () => {
			this.spline = new Spline({
				spline: new THREE.SplineCurve3([
					new THREE.Vector3(0, 400, 1500),
          new THREE.Vector3(0, 400, 800),
					new THREE.Vector3( 700, 600, 0),
					new THREE.Vector3( -200, 400, 0),
					new THREE.Vector3( -800,  700, 1400),
					new THREE.Vector3( -650,  680, 1300)
				]),
        relatedCamera: this.camera,
        step: .12
			})
			this.spline.placeCameraAtFirstPoint()
			this.camera.updateMovementRange(.5, 1900)
		}
}

export default Experience3
