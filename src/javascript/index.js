const THREE = require('three')
const OrbitControls = require('three-orbit-controls-loader')
OrbitControls(THREE)
const OBJLoader = require('three-obj-loader')
OBJLoader(THREE)
const MTLLoader = require('three-mtl-loader')

import Renderer from './classes/Renderer.js'
import Camera from './classes/Camera.js'
import CursorLight from './classes/CursorLight.js'
import Ambiance from './classes/Ambiance.js'
import Box from './classes/Box.js'


window.Storage = {}
initCanvas()

function initCanvas() {
	new Camera()
	new Renderer()
	new Box()
	new Ambiance()
	new CursorLight()
 	render()
}

function render() {
	Storage.RendererClass.render()
	requestAnimationFrame(render)
}
