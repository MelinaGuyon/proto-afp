const THREE = require('three')
const OBJLoader = require('three-obj-loader')
OBJLoader(THREE)
const MTLLoader = require('three-mtl-loader')

import raf from 'raf'

import Home from './classes/Home/index.js'
import Experience1 from './classes/Exp/Exp-1/index.js'

window.Storage = {}
initCanvas()

function initCanvas() {
	new Home()
	new Experience1()

	raf.add(render)
}

function render() {
	Storage.RendererClass.render()
}
