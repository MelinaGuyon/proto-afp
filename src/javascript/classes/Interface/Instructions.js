import anime from 'animejs'
import datas from '../../datas/Experience1.js'

class Instructions {
  constructor() {
    this.instruction = document.querySelector('.chapters-instructions img')
    this.srcIndex = -1

    this.updateInstruction()
  }

  showInstruction = () => {
    anime({
      targets: this.instruction,
      opacity: [0, 1],
      duration: 700,
      easing: 'easeInOutQuad',
      complete: this.hideInstruction
    })
  }

  hideInstruction = () => {
    anime({
      targets: this.instruction,
      opacity: [1, 0],
      duration: 700,
      delay: 1500,
      easing: 'easeInOutQuad',
      complete: this.updateInstruction
    })
  }

  updateInstruction = () => {
    this.srcIndex++
    this.instruction.setAttribute('src', datas.instructions[this.srcIndex])
  }
}

export default Instructions
