import anime from 'animejs'

class HiddingPanel {
  constructor(options) {
    Storage.HiddingPanelClass = this

    this.createHiddingPanel()
  }

  createHiddingPanel() {
    const geometry = new THREE.RingGeometry( 2500, 130, 4, 1 )
    const material = new THREE.MeshBasicMaterial( { color: 0x000, side: THREE.DoubleSide } )
    this.panel = new THREE.Mesh( geometry, material )

    this.panel.position.z = -150
    this.panel.rotation.z = Math.PI / 4

    Storage.camera.add(this.panel)
  }

  hidePanel = () => {
    anime({
      targets: this.panel.position,
      z: 600,
      duration: 2200,
      easing: 'easeInOutQuad',
      complete: () => Storage.camera.remove(this.panel)
    })
    anime({
      targets: this.panel.rotation,
      z:  Math.PI / 1.5,
      duration: 1400,
      easing: 'easeInOutQuad',
      complete: () => Storage.camera.remove(this.panel)
    })
  }
}

export default HiddingPanel
