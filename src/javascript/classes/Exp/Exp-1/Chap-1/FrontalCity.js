import anime from 'animejs'
import { throttle } from 'lodash'

class FrontalCity {
	constructor(options) {
		this.state = options
	}

	checkRaycaster = (raycaster) => {
		const meshs = this.state.objectsGroup.children[0].children
		let intersects = raycaster.intersectObjects(meshs, false)
		if (intersects[0] &&
				intersects[0].object &&
				intersects[0].distance < 2000 &&
				intersects[0].object.name === 'Cube_10')
			this.openAnimation(intersects[0].object)
	}

	openAnimation = throttle((object) => {
		anime.remove(object.rotation)
		anime({
      targets: object.rotation,
      z: -Math.PI / 4,
      duration: 300,
			easing: 'easeOutQuad',
			complete: this.closeAnimation(object)
    })
	}, 400, { leading: true, trailing: false })
	
	closeAnimation = (object) => () => {
		anime.remove(object.rotation)
		anime({
      targets: object.rotation,
      z: 0,
			duration: 300,
			delay: 2000,
			easing: 'easeInQuad'
		})
	}
}

export default FrontalCity
