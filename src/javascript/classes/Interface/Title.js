import anime from 'animejs'

class Titles {
  constructor() {
    //this.title = document.querySelector('.chapters-title span')
    this.title = document.querySelector('.chapters-title img')
  }

  animeTitle = (title) => {
    // this.title.innerText = title
    this.title.src = title

    let timeline = anime.timeline();

    timeline
      .add({
        targets: this.title,
        opacity: 1,
        scale: 0.4,
        duration: 600,
        easing: 'easeOutQuad'
      })
      .add({
        targets: this.title,
        opacity: 0,
        scale: 0.6,
        duration: 300,
        delay: 800,
        easing: 'easeInQuad'
      })
      .add({
        targets: this.title,
        scale: .1,
        duration: 0,
        delay: 1500, 
        //complete: () => { this.title.innerText = '' }
        complete: () => { this.title.src = '' }
      })
  }
}

export default Titles