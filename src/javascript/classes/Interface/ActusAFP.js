import anime from 'animejs'
import datas from '../../datas/Experience1.js'
import { map } from 'lodash'

class ActusAFP {
  constructor() {
    this.init()
  }

  init = () => {
    this.actusPage = document.querySelector('.actus-page')
    this.intro = this.actusPage.querySelector('.intro')
    this.contentWrapper = this.actusPage.querySelector('.content .wrapper')
  }

  bind = () => {
    document.addEventListener('mousewheel', this.handleScroll)
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
  }

  handleScroll = (event) => {
    console.log(document.scrollingElement.scrollTop)
  }

  animeActuItemUp = () => {

  }
}

export default ActusAFP
