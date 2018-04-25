import Inrtia from 'inrtia'
import raf from 'raf'

import datas from '../../../datas/Experience1.js'

class TimelineExp {
    constructor(options) {
			Storage.TimelineExpClass = this
			this.state = options

      this.beginings = this.getBeginings()
      this.splinesInChapters = this.getSplinesInChapters()
      this.totalChapters = datas.timelineIndicators.length
      this.splineIndex = 0
      this.chapterIndex = 0

      this.initObjects()
      this.initInertia()
      this.init()
      this.bind()

      this.createDots()
    }

    bind = () => {
      raf.add(this.updateInertia)
    }

    unbind = () => {
      raf.remove(this.updateInertia)
    }

    init = () => {
      this.timelineWrapper = document.querySelector('.timeline-wrapper')
      this.timeline = this.timelineWrapper.querySelector('.timeline')
      this.time = this.timelineWrapper.querySelector('.current-time')
      setTimeout(() => { this.timelineWrapper.classList.add('is-active') }, 2000)
    }

    initInertia() {
			const inrtiaOptions = {
				value: 0,
				friction: 20,
				precision: 5,
				perfectStop: true,
				interpolation: 'linear'
			}
			this.inrtia = {
				height: new Inrtia(inrtiaOptions)
			}
		}

    initObjects() {
			this.timelineObj = {
				stateSave: 0,
        state: 0
			}
		}

    getBeginings = () => {
      let tab = []
       datas.timelineIndicators.forEach((chapter) => {
         tab.push(chapter[3])
       })
       return tab
    }

    getSplinesInChapters = () => {
      let tab = []
       datas.timelineIndicators.forEach((chapter) => {
         tab.push(chapter[2])
       })
       return tab
    }

    check = (state, SplineIndex) => {
      let ratio = ( 1 / this.totalChapters ) / this.splinesInChapters[this.chapterIndex]

      if (this.splineIndex !== SplineIndex ) {
        this.splineIndex = SplineIndex
        this.timelineObj.stateSave += ratio

        if (this.beginings.includes(SplineIndex)) this.updateChapter()
        ratio = ( 1 / this.totalChapters ) / this.splinesInChapters[this.chapterIndex]
      }

      const time = this.timelineObj.stateSave + state * ratio
      this.timelineObj.state = Math.max(Math.min(time, 1), 0)

      this.inrtia.height.to(this.timelineObj.state)
    }

    updateChapter = () => {
      this.chapterIndex++
    }

    updateInertia = () => {
      if (!this.inrtia.height.stopped) {
				this.inrtia.height.update()
        this.time.style.height = this.inrtia.height.value * 100 + '%'
			}
    }

    createDots = () => {
      const height = this.timeline.getBoundingClientRect().height
      for (let i = 0; i < this.totalChapters; i++) {
        const dot = document.createElement('div')
        dot.classList.add('timeline-dot')
        this.timeline.appendChild(dot)
        dot.style.transform = 'translateY(' + height / (i + 1) + 'px) translateX(-50%)'
      }
    }
}

export default TimelineExp
