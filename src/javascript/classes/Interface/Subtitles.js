import anime from 'animejs'
import { map, delay } from 'lodash'

class Subtitles {
  constructor() {
    this.container = document.querySelector('.subtitles-container')
    this.subtitle = this.container.querySelector('.subtitles')

    this.actualLength = 0
  }

  writeSubtitles = (options) => {
    this.actualLength = options.length - 1
    map(options, this.write)
  }

  write = (opt, index) => {
    delay(this.writeOne, opt[1], { text: opt[0], index });
  }

  writeOne = (opt) => {
    this.subtitle.innerHTML = opt.text
    if (opt.index === this.actualLength) delay(this.remove, 2000);
  }

  remove = () => {
    this.subtitle.innerHTML = ''
  }
}

export default Subtitles
