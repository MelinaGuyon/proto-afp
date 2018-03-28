import anime from 'animejs'
import Inrtia from 'inrtia'
import raf from 'raf'
import { debounce, sort } from 'lodash'

import ShaderLoader from '../../../helpers/ShaderLoader'

const vertex_url = 'glsl/CursorLight.vert'
const fragment_url = 'glsl/CursorLight.frag'

class CursorLight {
    constructor(options) {
			Storage.CursorLightClass = this

      this.state = options

			this.raycaster = new THREE.Raycaster()
			this.mouse = new THREE.Vector2()

			this.loadSphereShaders()
			this.initLight()
			this.initInertia()
      this.bind()
		}

    bind() {
			window.addEventListener('mousemove', this.handleMouseMove, false)
		}

		unbind() {
			window.removeEventListener('mousemove', this.handleMouseMove, false)
			raf.remove(this.updateInertia)
      raf.remove(this.animate)
		}

		loadSphereShaders() {
			ShaderLoader.loadFiles([vertex_url, fragment_url])
				.then((response) => {
					this.initSphere(response)
          console.log(response)
				})
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
      this.light = new THREE.PointLight(0xff0, this.state.intensity, 10000, 2)
			this.light.position.set(200, 200, 800)
			Storage.SceneClasses.exp1.scene.add(this.light)
		}

		initSphere = (texts) => {
			const vertexSphere = texts[0]
      const fragmentSphere = texts[1]

			this.lightSphereUnif = THREE.UniformsUtils.merge([
        THREE.ShaderLib.lambert.uniforms,
        { specular: { value: new THREE.Color(0x1b1b1b) } },
        { emissive: { value: new THREE.Color(0x777777) } },
        { u_time: { type: "f", value: 1.0 } },
        { u_resolution: { type: "v2", value: new THREE.Vector2(1024, 768) } },
				{ u_glowColor: { value: new THREE.Color(0xff0) } }
			])

			const geometry = new THREE.SphereBufferGeometry( 20, 32, 32 )
			const material = new THREE.ShaderMaterial({
				uniforms: Object.assign({u_frequency:{ type: "f", value: 0.31 }}, this.lightSphereUnif),
				vertexShader: vertexSphere,
				fragmentShader: fragmentSphere,
				side: THREE.BackSide,
				transparent: true,
				blending: THREE.AdditiveBlending,
				lights: true,
				fog: true,
        alpha: 0
			})

			this.sphere = new THREE.Mesh(geometry, material)
      this.sphere.visible = this.state.sphereVisible
			Storage.SceneClasses.exp1.scene.add(this.sphere)

			raf.add(this.animate)
		}

    updateSphereVisibility = (bool) => {
      this.sphere.visible = bool
    }

    updateLightIntensity = (value) => {
      this.light.intensity = value
    }

		handleMouseMove = (event) => {
			this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
			this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1

			// Transform mouse position value into canvas values
			const vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0)
			vector.unproject(Storage.CameraClasses.exp1.camera)
			const dir = vector.sub(Storage.CameraClasses.exp1.camera.position).normalize()
			const distance = - Storage.CameraClasses.exp1.camera.position.z / dir.z
			const pos = Storage.CameraClasses.exp1.camera.position.clone().add(dir.multiplyScalar(distance))

			// Check intersections and ajust position with normals
			this.raycaster.setFromCamera( this.mouse, Storage.CameraClasses.exp1.camera)
			let intersects
			if (Storage.box1) intersects = this.raycaster.intersectObjects([Storage.box1.children[0], Storage.backgroundExp1, Storage.box1Couvercle.children[0]], true)

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

			if (!this.sphere) return
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

		animate = () => {
			if(this.lightSphereUnif) this.lightSphereUnif.u_time.value += .2
		}
}

export default CursorLight