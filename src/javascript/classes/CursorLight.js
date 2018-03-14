import anime from 'animejs'
import Inrtia from 'inrtia'
import raf from 'raf'
import { debounce, sort } from 'lodash'

class CursorLight {
    constructor(options) {
			Storage.CursorLightClass = this

			this.raycaster = new THREE.Raycaster()
			this.mouse = new THREE.Vector2()

			this.initLight()
			this.initShpere()
			this.initInertia()
      this.bind()
    }

    bind() {
			window.addEventListener('mousemove', this.handleMouseMove, false)
		}
		
		unbind() {
			window.removeEventListener('mousemove', this.handleMouseMove, false)
			raf.remove(this.updateInertia)
		}

		initInertia() {
			const inrtiaOptions = {
				value: 0,
				friction: 15,
				precision: 5,
				perfectStop: true,
				interpolation: 'linear'
			}
			this.inrtia = {
				x: new Inrtia(inrtiaOptions),
				y: new Inrtia(inrtiaOptions),
				z: new Inrtia(inrtiaOptions)
			}

			raf.add(this.updateInertia)
		}
		
    initLight() {
      this.light = new THREE.PointLight(0xff0, 1, 10000, 2)
			this.light.position.set(200, 200, 800)
			Storage.scene.add(this.light)
		}
		
		initShpere() {
			const geometry = new THREE.SphereGeometry(5, 32, 32)
			const material = new THREE.MeshBasicMaterial({color: 0xffff00})
			this.sphere = new THREE.Mesh(geometry, material)
			Storage.scene.add(this.sphere)
		}

		handleMouseMove = (event) => {
			this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
			this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1

			// Transform mouse position value into canvas values
			const vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0)
			vector.unproject(Storage.camera)
			const dir = vector.sub(Storage.camera.position).normalize()
			const distance = - Storage.camera.position.z / dir.z
			const pos = Storage.camera.position.clone().add(dir.multiplyScalar(distance))

			// Check intersections and ajust position with normals 
			this.raycaster.setFromCamera( this.mouse, Storage.camera )
			let intersects
			if (Storage.box) intersects = this.raycaster.intersectObjects([Storage.box.children[0], Storage.background, Storage.boxCouvercle.children[0]], true)

			if (intersects && intersects.length > 0) {
				const { point, face } = intersects[0]
				const offset = -300
				pos.x = point.x + offset * face.normal.x
				pos.y = point.y + -offset * face.normal.y
				pos.z = point.z + (offset - 500) * face.normal.z
				this.inrtia.x.to(pos.x)
				this.inrtia.y.to(pos.y)
				this.inrtia.z.to(pos.z)
			} else {
				pos.z = 200
				pos.y = -50
				this.inrtia.y.to(pos.y)
				this.inrtia.z.to(pos.z)
			}
		}

		updatePosition () {
			this.light.position.x = this.inrtia.x.value
			this.light.position.y = this.inrtia.y.value
			this.light.position.z = this.inrtia.z.value

			this.sphere.position.x = this.inrtia.x.value
			this.sphere.position.y = this.inrtia.y.value
			this.sphere.position.z = this.inrtia.z.value
		}

		updateInertia = () => {
			if (!this.inrtia.x.stopped || !this.inrtia.y.stopped || !this.inrtia.z.stopped) {
				this.inrtia.y.update()
				this.inrtia.x.update()
				this.inrtia.z.update()
				this.updatePosition()
			}
		}
}

export default CursorLight
