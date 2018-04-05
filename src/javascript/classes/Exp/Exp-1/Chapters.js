class Chapters {
    constructor(options) {

      this.chapterBoxes = []

      this.initObjects()
			this.init()
    }

    initObjects = () => {
      this.positions = [
        [0, 800, -2000],
        [0, 800, -8000]
      ]
      this.sizes = [
        [3000, 1600, 1600],
        [3000, 1600, 1900]
      ]
      this.colors = [0xfffff, 0xf0f6f]
    }

		init = () => {
      this.positions.forEach((el, index) => {
        const geometry = new THREE.BoxGeometry(this.sizes[0][0], this.sizes[0][1], this.sizes[0][2])
        const material = new THREE.MeshLambertMaterial({ color: this.colors[index], side: THREE.BackSide, opacity: 0.5 })
        const cube = new THREE.Mesh(geometry, material)

        cube.position.set(el[0], el[1], el[2])
        cube.material.opacity = 0.2

        this.chapterBoxes.push(cube)
        Storage.SceneClasses.exp1.scene.add(cube)
      })


		}
}

export default Chapters
