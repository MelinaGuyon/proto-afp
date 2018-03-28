import anime from 'animejs'

class HiddingPanel {
  constructor(options) {
    this.state = options
    this.createHiddingPanel()
  }

  createHiddingPanel() {
    const geometry = new THREE.RingGeometry( 2500, 130, 4, 1 )
    const material = new THREE.MeshBasicMaterial( { color: 0x000, side: THREE.DoubleSide } )
    this.panel = new THREE.Mesh( geometry, material )

    this.panel.position.z = -150
    this.panel.rotation.z = Math.PI / 4

    this.state.relatedCamera.add(this.panel)
  }

  hidePanel = () => {
    anime({
      targets: this.panel.position,
      z: 600,
      duration: 3000,
      easing: 'easeInOutQuad'
    })
    anime({
      targets: this.panel.rotation,
      z:  Math.PI / 1.5,
      duration: 1900,
      easing: 'easeInOutQuad',
      complete: () => this.state.relatedCamera.remove(this.panel)
    })
  }
}

export default HiddingPanel
