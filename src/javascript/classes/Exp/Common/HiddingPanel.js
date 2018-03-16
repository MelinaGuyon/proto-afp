import anime from 'animejs'

class HiddingPanel {
  constructor(options) {
    Storage.HiddingPanelClasses[options.name] = this
    this.name = options.name

    this.createHiddingPanel()
  }

  createHiddingPanel() {
    const geometry = new THREE.RingGeometry( 2500, 130, 4, 1 )
    const material = new THREE.MeshBasicMaterial( { color: 0x000, side: THREE.DoubleSide } )
    this.panel = new THREE.Mesh( geometry, material )

    this.panel.position.z = -150
    this.panel.rotation.z = Math.PI / 4

    Storage.CameraClasses[this.name].camera.add(this.panel)
  }

  hidePanel = () => {
    anime({
      targets: this.panel.position,
      z: 600,
      duration: 3000,
      easing: 'easeInOutQuad',
      complete: () => Storage.CameraClasses[Storage.expName].camera.remove(this.panel)
    })
    anime({
      targets: this.panel.rotation,
      z:  Math.PI / 1.5,
      duration: 1900,
      easing: 'easeInOutQuad',
      complete: () => Storage.CameraClasses[Storage.expName].camera.remove(this.panel)
    })
  }
}

export default HiddingPanel
