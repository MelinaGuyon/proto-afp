import anime from 'animejs'

class Titles {
  constructor() {
    //this.title = document.querySelector('.chapters-title span')
    this.title = document.querySelector('.chapters-title img')
  }

  animeTitle = (title) => {
    // this.title.innerText = title
    console.log(title)
    this.title.setAttribute('src', title)

    let timeline = anime.timeline();

    timeline
      .add({
        targets: this.title,
        opacity: 1,
        scale: [0.2, 0.3],
        duration: 500,
        easing: 'easeInOutQuad'
      })
      .add({
        targets: this.title,
        opacity: 0,
        scale: [0.3, 0.4],
        duration: 500,
        delay: 1300,
        easing: 'easeInOutQuad'
      })
      .add({
        targets: this.title,
        scale: 0.2,
        duration: 0,
        delay: 1500
      })
  }
}

export default Titles
