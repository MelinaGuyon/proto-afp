const THREE = require('three')
const OrbitControls = require('three-orbit-controls-loader')
OrbitControls(THREE)
const OBJLoader = require('three-obj-loader')
OBJLoader(THREE)
const MTLLoader = require('three-mtl-loader')

import Renderer from './classes/Renderer.js'
import Camera from './classes/Camera.js'
import Ambiance from './classes/Ambiance.js'
import Box from './classes/Box.js'


window.STORAGE = {}
initCanvas()

function initCanvas() {
	new Camera()
	new Renderer()
	new Box()
	new Ambiance()
 	render()
}

function render() {
	STORAGE.RendererClass.render()
	requestAnimationFrame(render)
}
