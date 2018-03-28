const THREE = require('three')
const OBJLoader = require('three-obj-loader')
OBJLoader(THREE)
const MTLLoader = require('three-mtl-loader')

import raf from 'raf'

import Home from './classes/Home/index.js'
import Experience1 from './classes/Exp/Exp-1/index.js'
import Experience2 from './classes/Exp/Exp-2/index.js'

window.Storage = {}
Storage.CameraClasses = {}
Storage.SceneClasses = {}
Storage.HiddingPanelClasses = {}

Storage.expName = 'exp1'

initCanvas()

function initCanvas() {
	new Home()
	new Experience1()
	new Experience2()

	raf.add(render)
}

function render() {
	if(Storage.HomeCarouselClass && Storage.RendererClass)	Storage.RendererClass.render()
}
