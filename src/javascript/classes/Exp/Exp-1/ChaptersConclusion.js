import anime from 'animejs'

class ChaptersConclusion {
    constructor(options) {
		Storage.ChaptersConclusionClass = this
    this.state = options
    this.state.media = 'video'

		this.conclusion
    this.clicked = false

    this.bindConclu()

    this.init()
  }

  init = () => {
    const geometry = new THREE.PlaneGeometry( window.innerWidth, window.innerWidth/1.8, 32 )
    const material = this.getMaterial()

		this.conclusion = new THREE.Mesh( geometry, material )
		this.conclusion.position.z = -600
    this.conclusion.position.y = 0

    this.state.relatedCamera.add(this.conclusion)
  }

  getMaterial = (url) => {
    let material 

    if (this.state.media == 'video') material = this.makeVideoTex(url)
    else material = this.makePhotoTex(url)

    return material
  }

  makeVideoTex = (url) => {
    this.video = document.createElement( 'video' )
    this.video.autoplay = false
    this.video.loop = true
    url ? this.video.src = url : ''

    const texture = new THREE.VideoTexture( this.video )
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.format = THREE.RGBFormat

    const parameters = { map: texture }
    const material = new THREE.MeshBasicMaterial( parameters )
    material.needsUpdate = true
    material.transparent = true
    material.opacity = 0

    return material
  }

  makePhotoTex = (url) => {
    
  }
  
  updateMedia = (url, type) => {
    if (type !== this.state.media) {
      // create new material with good texture type
      this.state.media = type
      this.conclusion.material = this.getMaterial(url)
    } else {
      // just update material src
      this.conclusion.material.map.image.src = url  
    }
  }

  playConclusion = () => {
    // anime.remove(this.conclusion.material)
    // anime({
    //   targets: this.conclusion.material,
    //   opacity: 1,
    //   duration: 300,
    //   delay: 300,
    //   easing: 'easeOutQuad'
    // })
    // this.state.media === 'video' ? this.video.play() : ''
    Storage.ComposerClass.activate()
  }


  stopConclusion = () => {
    // anime.remove(this.conclusion.material)
    // anime({
    //   targets: this.conclusion.material,
    //   opacity: 0,
    //   duration: 300,
    //   delay: 300,
    //   easing: 'easeOutQuad'
    // })
    // this.state.media === 'video' ? this.video.pause() : ''
    Storage.ComposerClass.unactivate()
  }

  bindConclu = () => {
    document.addEventListener('mousedown', this.onMouseDown, false )
    document.addEventListener('mouseup', this.onMouseUp, false )
  }

  unbindConclu = () => {
    document.removeEventListener('mousedown', this.onMouseDown, false )
    document.removeEventListener('mouseup', this.onMouseUp, false )
  }

  onMouseDown = () => {
    if ( this.clicked === false ) {
      this.playConclusion()
      this.clicked = true
    }
  }

  onMouseUp = () => {
    if ( this.clicked === true ) {
      this.stopConclusion()
      this.clicked = false
    }
  }
}

export default ChaptersConclusion
