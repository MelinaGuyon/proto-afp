import ObjectsLoader from './ObjectsLoader'
import raf from 'raf'
import anime from 'animejs'

class InfosPeople {
  constructor(options) {
    this.state = options

    this.fontLoader = new THREE.FontLoader()

    this.createPlane()
    this.writeStatus()
    this.writeTiret()
    this.writeDesc()

    this.tab = ['Son grand père était partisant pour la Corée du Sud durant la guerre']
  }

  createPlane = () => {
    let geometry = new THREE.PlaneGeometry( 150, 200, 32 )
    let material = new THREE.MeshBasicMaterial( {color: 0xb5b5b5, side: THREE.DoubleSide, transparent: true, opacity: 0.2} )
    this.plane = new THREE.Mesh( geometry, material )
    this.plane.scale.y = 0

    this.plane.position.y = -400
    this.state.relatedBox.add( this.plane )
  }

  writeStatus = () => {
    this.fontLoader.load( 'assets/interface/fonts/test/Poppins Light_Regular.json', (font) => {

      const geometry = new THREE.TextGeometry( 'HOSTILE', {
        font: font,
        size: 12,
        height: 0,
        curveSegments: 2,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1
      } );

      const textMaterial = new THREE.MeshBasicMaterial( { color: 0xea2a2a, overdraw: true, transparent: true, opacity: 0 } )
      const text = new THREE.Mesh( geometry, textMaterial )
      text.position.set( -60, 50, 10 )
      this.plane.add( text )
    })
  }

  writeTiret = () => {
    this.fontLoader.load( 'assets/interface/fonts/test/Poppins Light_Regular.json', (font) => {

      const geometry = new THREE.TextGeometry( '--', {
        font: font,
        size: 12,
        height: 0,
        curveSegments: 2,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1
      } );

      const textMaterial = new THREE.MeshBasicMaterial( { color: 0xea2a2a, overdraw: true, transparent: true, opacity: 0 } )
      const text = new THREE.Mesh( geometry, textMaterial )
      text.position.set( -60, 20, 10 )
      this.plane.add( text )
    })
  }

  writeDesc = () => {
    this.fontLoader.load( 'assets/interface/fonts/test/Poppins Light_Regular.json', (font) => {

      let descTab = ['']
      let index = 0
      let pass = false
      let moduloIndex = -1
      let table = this.tab[0].split('')

      for (var i = 0; i < table.length; i ++) {
        moduloIndex++
        let test = [descTab[index], table[i]]
        descTab[index] = test.join('')

        if (moduloIndex%15 === 14) pass = true
        if (pass == true & table[i] == ' ') {
          pass = false
          index++
          moduloIndex = -1
          descTab.push('')
        }
      }

      let top = -20
      for (var i = 0; i < descTab.length; i ++) {
        const geometry = new THREE.TextGeometry( descTab[i], {
          font: font,
          size: 8,
          height: 0,
          curveSegments: 2,
          bevelEnabled: true,
          bevelThickness: 1,
          bevelSize: 1,
          bevelSegments: 1
        } );

        const textMaterial = new THREE.MeshBasicMaterial( { color: 0xea2a2a, overdraw: true, transparent: true, opacity: 0 } )
        const text = new THREE.Mesh( geometry, textMaterial )
        text.position.set( -60, top, 10 )
        top -= 18
        this.plane.add( text )
      }
    })
  }

  checkRaycaster = (raycaster, objectsGroup) => {
		const people = objectsGroup.children[0]

		let intersectsPeople = raycaster.intersectObjects(people.children, false)

		if (intersectsPeople[0] && intersectsPeople[0].distance < 1000) {
			this.showInfos(people)
		}

		if (intersectsPeople[0]) {
			Storage.InterfaceClass.cursor.reveal()
		} else {
			Storage.InterfaceClass.cursor.reset()
		}
	}

  showInfos = (people) => {
    this.plane.position.x = people.position.x
    this.plane.position.z = people.position.z - 600

    if (people.isGroup1) this.plane.rotation.y = Math.PI / 6
    else if (people.isGroup2) this.plane.rotation.y = -Math.PI / 6

    anime.remove(this.plane.scale)
    anime({
      targets: this.plane.scale,
      y: 1,
      duration: 500,
      easing: 'easeOutQuad'
    })

    this.plane.children.forEach((el) => {
      anime.remove(el.material)
      anime({
        targets: el.material,
        opacity: 0.8,
        duration: 600,
        delay: 600,
        easing: 'easeOutQuad'
      })
    })
  }

}

export default InfosPeople
