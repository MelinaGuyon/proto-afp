import anime from 'animejs'
import { throttle } from 'lodash'

import datas from '../../../../datas/Experience1.js'

class FrontalCity {
	constructor(options) {
		this.state = options
		this.nextStepLaunched = false
	}

	checkRaycaster = (raycaster) => {
		const meshs = this.state.objectsGroup.children[0].children
		let intersects = raycaster.intersectObjects(meshs, false)
		if (intersects[0] &&
				intersects[0].object &&
				intersects[0].distance < 1000 &&
				intersects[0].object.name === 'Cube_10') {
					this.openAnimation(intersects[0].object)
					this.launchNextStep()
				}
		else if (intersects[0]) {
			Storage.InterfaceClass.cursor.reveal()
		} else {
			Storage.InterfaceClass.cursor.reset()
		}
	}

	launchNextStep = () => {
		if (this.nextStepLaunched) return
		this.nextStepLaunched = true
		setTimeout(() => {
			Storage.Chapitre1Class.step++
			Storage.Chapitre1Class.state.cbMiddle()
			Storage.InterfaceClass.cursor.reset()
		}, 2000)
		setTimeout(() => {
			Storage.InterfaceClass.title.animeTitle(datas.chaptersTitle[0])
		}, 5000)
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
