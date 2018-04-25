import datas from '../../../datas/Experience1.js'

class TimelineExp {
    constructor(options) {
			Storage.TimelineExpClass = this
			this.state = options

      this.totalSplines = this.getTotalSpline()
      this.beginings = this.getBeginings()
      this.splinesInChapters = this.getSplinesInChapters()
      this.totalChapters = datas.timelineIndicators.length
      this.splineStepInChapter = 1
      this.totalSplineIndex = 0
      this.chapterIndex = 0
      this.initObjects()
    }

    initObjects() {
			this.timelineObj = {
				state: 0
			}
		}

    getTotalSpline = () => {
      let total = 0
       datas.timelineIndicators.forEach((chapter) => {
         total += chapter[2]
       })
       return total
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

      if (this.totalSplineIndex !== SplineIndex ) {
        this.totalSplineIndex = SplineIndex
        this.timelineObj.state += ratio

        if (this.beginings.includes(SplineIndex)) this.updateChapter()
        ratio = ( 1 / this.totalChapters ) / this.splinesInChapters[this.chapterIndex]
      }

      const time = this.timelineObj.state + state * ratio
      const timeState = Math.max(Math.min(time, 1), 0)
      console.log(timeState)
    }

    updateChapter = () => {
      this.chapterIndex++
    }
}

export default TimelineExp
