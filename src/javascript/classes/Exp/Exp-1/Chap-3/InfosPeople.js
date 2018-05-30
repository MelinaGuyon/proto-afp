import ObjectsLoader from './ObjectsLoader'
import raf from 'raf'
import anime from 'animejs'

import datas from '../../../../datas/Experience1.js'

class InfosPeople {
  constructor(options) {
    this.state = options

    this.fontLoader = new THREE.FontLoader()

    this.createPlane()

    this.status = []
    this.infos = []
    this.tiret
    this.initAllInfos()
  }

  initAllInfos = () => {
    this.writeTiret().then((response)=> {
      this.tiret = response
    }).catch((error)=> { console.warn(error) })

    datas.infosPeople.forEach((obj) => {
      this.writeStatus(obj.status).then((response)=> {
        this.status.push(response)
      }).catch((error)=> { console.warn(error) })
      this.writeDesc(obj.info).then((response)=> {
        this.infos.push(response)
      }).catch((error)=> { console.warn(error) })
    })
  }

  createPlane = () => {
    let geometry = new THREE.PlaneGeometry( 150, 200, 32 )
    let material = new THREE.MeshBasicMaterial( { color: 0xb5b5b5, side: THREE.DoubleSide, transparent: true, opacity: 0 } )
    this.plane = new THREE.Mesh( geometry, material )
    this.plane.scale.y = 0.1
    this.plane.isVisible = false

    this.plane.position.y = -400
    this.state.relatedBox.add( this.plane )
  }

  writeStatus = (status) => {
    return new Promise((resolve, reject) => {
      this.fontLoader.load( 'assets/interface/fonts/test/Poppins Light_Regular.json', (font) => {

        const geometry = new THREE.TextGeometry( status, {
          font: font,
          size: 12,
          height: 1,
          curveSegments: 5,
          bevelEnabled: true,
          bevelThickness: 1,
          bevelSize: 1,
          bevelSegments: 1
        } );

        const textMaterial = new THREE.MeshBasicMaterial( { color: 0xC40202, overdraw: true, transparent: true, opacity: 0 } )
        const text = new THREE.Mesh( geometry, textMaterial )
        text.position.set( -60, 50, 10 )
        this.plane.add( text )

        resolve(text)
      })
    })
  }

  writeTiret = () => {
    return new Promise((resolve, reject) => {
      this.fontLoader.load( 'assets/interface/fonts/test/Poppins Light_Regular.json', (font) => {

        const geometry = new THREE.TextGeometry( '--', {
          font: font,
          size: 12,
          height: 1,
          curveSegments: 5,
          bevelEnabled: true,
          bevelThickness: 1,
          bevelSize: 1,
          bevelSegments: 1
        } );

        const textMaterial = new THREE.MeshBasicMaterial( { color: 0xC40202, overdraw: true, transparent: true, opacity: 0 } )
        const text = new THREE.Mesh( geometry, textMaterial )
        text.position.set( -60, 20, 10 )
        this.plane.add( text )

        resolve(text)
      })
    })
  }

  writeDesc = (info) => {
    return new Promise((resolve, reject) => {
      this.fontLoader.load( 'assets/interface/fonts/test/Poppins Light_Regular.json', (font) => {

        let descTab = ['']
        let index = 0
        let pass = false
        let moduloIndex = -1
        let table = info.split('')

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

        let textTable = []
        let top = -20
        for (var i = 0; i < descTab.length; i ++) {
          const geometry = new THREE.TextGeometry(descTab[i], {
            font: font,
            size: 8,
            height: 1,
            curveSegments: 5,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 1
          } );

          const textMaterial = new THREE.MeshBasicMaterial( { color: 0xC40202, overdraw: true, transparent: true, opacity: 0 } )
          const text = new THREE.Mesh( geometry, textMaterial )
          text.position.set( -60, top, 10 )
          top -= 18
          textTable.push(text)
          this.plane.add(text)
        }
        resolve(textTable)
      })
    })
  }

  checkRaycaster = (raycaster, objectsGroup) => {
		const people = objectsGroup.children[0]

		let intersectsPeople = raycaster.intersectObjects(people.children, false)

		if (intersectsPeople[0] && intersectsPeople[0].distance < 1500) {
      if (!this.plane.isVisible) this.showInfos(people)
		} else {
      if (this.plane.isVisible && !this.plane.isHidding) this.hideInfos(people)
    }

		if (intersectsPeople[0]) {
			Storage.InterfaceClass.cursor.reveal()
		} else {
			Storage.InterfaceClass.cursor.reset()
		}
	}

  showInfos = (people) => {
    this.plane.isVisible = true

    this.plane.position.x = people.position.x
    this.plane.position.z = people.position.z - 600

    if (people.isGroup1) this.plane.rotation.y = Math.PI / 8
    else if (people.isGroup2) this.plane.rotation.y = -Math.PI / 8

    anime.remove(this.plane.scale)
    anime.remove(this.plane.material)
    anime({
      targets: this.plane.scale,
      y: 1,
      duration: 500,
      easing: 'easeOutQuad'
    })
    anime({
      targets: this.plane.material,
      opacity: 0.2,
      duration: 100,
      easing: 'easeOutQuad'
    })

    anime.remove(this.tiret.material)
    anime.remove(this.status[0].material)
    anime({
      targets: [this.tiret.material, this.status[0].material],
      opacity: 0.8,
      duration: 500,
      delay: 500,
      easing: 'easeOutQuad'
    })

    this.infos[0].forEach((el) => {
      anime.remove(el.material)
      anime({
        targets: el.material,
        opacity: 0.8,
        duration: 500,
        delay: 500,
        easing: 'easeOutQuad'
      })
    })
  }

  hideInfos = () => {
    this.plane.isHidding = true

    this.plane.children.forEach((el) => {
      anime.remove(el.material)
      anime({
        targets: el.material,
        opacity: 0,
        duration: 300,
        easing: 'easeOutQuad'
      })
    })

    anime.remove(this.plane.scale)
    anime.remove(this.plane.material)
    anime({
      targets: this.plane.scale,
      y: 0.002,
      duration: 300,
      delay: 300,
      easing: 'easeOutQuad',
      complete: () => {
        this.plane.isVisible = false
        this.plane.isHidding = false
      }
    })
    anime({
      targets: this.plane.material,
      opacity: 0,
      duration: 100,
      delay: 600,
      easing: 'easeOutQuad'
    })
  }

}

export default InfosPeople
