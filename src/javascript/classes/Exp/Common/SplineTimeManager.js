import raf from 'raf'
import { debounce } from 'lodash'

import datas from '../../../datas/Experience1.js'

class SplineTimeManager {
    constructor(options) {
			Storage.SplineTimeManagerClass = this
			this.state = options

      this.step = 0
    }

    check = (state, index) => {
      if (state > 0.9) {
        console.log('end of actual spline')
        this.end()
        return
      }

      let previousStep = this.step
      let newStep = 0
      datas.keyPoints[Object.keys(datas.keyPoints)[index]].forEach((value, index) => {
        if (state > value) newStep ++
      })
      if (newStep > this.step) this.step = newStep

      if (this.step == 0 || previousStep === this.step) return
      Storage.BetweenChaptersClass.updateScene(index, this.step)
    }

    end = () => {
      Storage.SplineClass.unbind()
      setTimeout(() => {
        Storage.SplineClass.state.cbEnd && Storage.SplineClass.state.cbEnd()
      }, 3000)
    }
}

export default SplineTimeManager
