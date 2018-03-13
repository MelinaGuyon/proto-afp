import anime from 'animejs'
import Inrtia from 'inrtia'
import raf from 'raf'
import { debounce } from 'lodash'

class CursorLight {
    constructor(options) {
			Storage.CursorLightClass = this

			this.initLight()
      this.bind()
    }

    bind() {
			window.addEventListener('mousemove', this.handleMouseMove, false)
		}
		
		unbind() {
			window.removeEventListener('mousemove', this.handleMouseMove, false)
		}
		
    initLight() {
      this.light = new THREE.PointLight(0xff0, 0.7, 2000, 2)
			this.light.position.set(200, 200, 800)
			Storage.scene.add(this.light)
    }

		handleMouseMove = (event) => {
			const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
			const mouseY = - (event.clientY / window.innerHeight) * 2 + 1;

			const vector = new THREE.Vector3(mouseX, mouseY, 0)
			vector.unproject(Storage.camera)
			const dir = vector.sub(Storage.camera.position).normalize()
			const distance = - Storage.camera.position.z / dir.z
			const pos = Storage.camera.position.clone().add(dir.multiplyScalar(distance))
			pos.z = 200
			pos.y -= 50

			this.light.position.copy(pos)
		}
}

export default CursorLight
