import anime from 'animejs'

class CanvasPanel {
  constructor(options) {
    Storage.CanvasPanelClass = this
    this.panel = document.querySelector('.canvas-panel')
  }

  hidePanel = () => {
    anime({
      targets: this.panel,
      scale: 6,
      rotate: '-140deg',
      duration: 3000,
      easing: 'easeInOutQuad',
      complete: () => {
        this.panel.style.display = 'none'
      }
    })
  }
}

export default CanvasPanel
