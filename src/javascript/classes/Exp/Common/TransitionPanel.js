import anime from 'animejs'

class TransitionPanel {
  constructor(options) {
    Storage.TransitionPanel = this

    console.log(this)
    this.transitionPanel = document.querySelector('.transition__panel')
  }

  avanceCarousel = (cb) => {
    anime({
      targets: this.transitionPanel,
      translateX: "-100%",
      duration: 600,
      easing: 'easeInQuad',
      complete: () => {
        cb()
        anime({
          targets: this.transitionPanel,
          translateX: "-200%",
          duration: 800,
          easing: 'easeOutQuad',
        })
      }
    })
  }

  reculeCarrousel = (cb) => {
    anime({
      targets: this.transitionPanel,
      translateX: "-100%",
      duration: 600,
      easing: 'easeInQuad',
      complete: () => {
        cb()
        anime({
          targets: this.transitionPanel,
          translateX: "0%",
          duration: 800,
          easing: 'easeOutQuad',
        })
      }
    })
  }

}

export default TransitionPanel
