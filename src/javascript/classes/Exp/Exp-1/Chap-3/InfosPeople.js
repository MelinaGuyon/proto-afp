import ObjectsLoader from './ObjectsLoader'
import raf from 'raf'
import anime from 'animejs'

class InfosPeople {
  constructor(options) {
    this.state = options

    this.fontLoader = new THREE.FontLoader()

    this.createPlane()
    this.writeName()
    this.writeStatus()
    this.writeDesc()

    this.tab = ['Son grand père était partisant pour la Corée du Sud durant la guerre']
  }

  createPlane = () => {
    let geometry = new THREE.PlaneGeometry( 200, 300, 32 )
    let material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} )
    this.plane = new THREE.Mesh( geometry, material )

    this.plane.position.y = -400
    this.state.relatedBox.add( this.plane )
  }

  writeName = () => {
    this.fontLoader.load( 'assets/interface/fonts/test/Poppins Light_Regular.json', (font) => {

    	const geometry = new THREE.TextGeometry( 'Chung-Su', {
    		font: font,
    		size: 15,
    		height: 0,
    		curveSegments: 2,
    		bevelEnabled: true,
    		bevelThickness: 1,
    		bevelSize: 1,
    		bevelSegments: 1
    	} );

      const textMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: true, transparent: true, opacity: 0 } )
      const text = new THREE.Mesh( geometry, textMaterial )
      text.position.set( -90, 100, 10 )
      this.plane.add( text )
    })
  }

  writeStatus = () => {
    this.fontLoader.load( 'assets/interface/fonts/test/Poppins Light_Regular.json', (font) => {

      const geometry = new THREE.TextGeometry( 'Hostile au régime', {
        font: font,
        size: 12,
        height: 0,
        curveSegments: 2,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1
      } );

      const textMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: true, transparent: true, opacity: 0 } )
      const text = new THREE.Mesh( geometry, textMaterial )
      text.position.set( -90, 65, 10 )
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

        if (moduloIndex%20 === 19) pass = true
        if (pass == true & table[i] == ' ') {
          pass = false
          index++
          moduloIndex = -1
          descTab.push('')
        }
      }

      let top = 0
      for (var i = 0; i < descTab.length; i ++) {
        const geometry = new THREE.TextGeometry( descTab[i], {
          font: font,
          size: 10,
          height: 0,
          curveSegments: 2,
          bevelEnabled: true,
          bevelThickness: 1,
          bevelSize: 1,
          bevelSegments: 1
        } );

        const textMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: true, transparent: true, opacity: 0 } )
        const text = new THREE.Mesh( geometry, textMaterial )
        text.position.set( -90, top, 10 )
        top -= 25
        this.plane.add( text )
      }
    })
  }

  checkRaycaster = (raycaster, objectsGroup) => {
    console.log(objectsGroup)
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

    if (people.isGroup1) this.plane.rotation.y = Math.PI / 5
    else if (people.isGroup2) this.plane.rotation.y = -Math.PI / 5

    this.plane.children.forEach((el) => {
      anime.remove(el.material)
      anime({
        targets: el.material,
        opacity: 1,
        duration: 600,
        delay: 300,
        easing: 'easeOutQuad'
      })
    })
  }

}

export default InfosPeople
