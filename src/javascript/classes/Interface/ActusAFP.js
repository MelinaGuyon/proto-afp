import anime from 'animejs'
import datas from '../../datas/Experience1.js'
import { map } from 'lodash'
import Inrtia from 'inrtia'
import raf from 'raf'

class ActusAFP {
  constructor() {
    this.init()
    this.initInertia()

    this.windowHeight = window.innerHeight
    this.store = []
  }

  initInertia = () => {
    this.inrtia = new Inrtia({
        value: 0,
        friction: 5,
        precision: 5,
        perfectStop: true,
        interpolation: 'linear'
      })
  }

  init = () => {
    this.actusPage = document.querySelector('.actus-page')
    this.intro = this.actusPage.querySelector('.intro')
    this.contentWrapper = this.actusPage.querySelector('.content .wrapper')
  }

  bind = () => {
    document.addEventListener('mousewheel', this.handleScroll)
    raf.add(this.update)
  }

  showActu = () => {
    document.body.classList.add('actus-page-visible')
    this.bind()
  }

  makeActu = () => {
    this.datas = datas.actus
    map(this.datas, this.create)
  }

  create = (actu, index) => {
    const item = document.createElement('div')
    item.classList.add('item')

    const media = document.createElement('div')
    media.classList.add('media')
    const titleContainer = document.createElement('div')
    titleContainer.classList.add('title-container')
    const text = document.createElement('div')
    text.classList.add('text')
    text.innerHTML = actu.text

    const img = document.createElement('img')
    img.classList.add('img')
    img.setAttribute('src', 'assets/actusAFP/title.png')
    const title = document.createElement('div')
    title.classList.add('title')
    title.innerHTML = actu.title

    titleContainer.appendChild(img)
    titleContainer.appendChild(title)
    item.appendChild(media)
    item.appendChild(titleContainer)
    item.appendChild(text)
    this.contentWrapper.appendChild(item)

    const top = item.getBoundingClientRect().top
    this.store.push({ item, top, animated: false })
  }

  handleScroll = (event) => {
    this.inrtia.to(this.actusPage.scrollTop)
  }

  resetBottom = (item) => {
    item.item.classList.remove('animated')
    item.animated = false
  }

  animeTop = (item) => {
    item.item.classList.add('animated')
    item.animated = true
  }

  update = (force) => {
    if (this.inrtia.stopped) return
    const scrollTop = this.inrtia.update()
    const offset = (this.windowHeight / 2) >> 0

    this.store.forEach((item) => {
      const distance = scrollTop - item.top + this.windowHeight
      const ratio = distance / offset

      if (distance < -100 && item.animated) this.resetBottom(item)
      else if (distance > 50 && !item.animated) this.animeTop(item)
    })

  }
}

export default ActusAFP
