const THREE = require('three')
const OBJLoader = require('three-obj-loader')
OBJLoader(THREE)
const MTLLoader = require('three-mtl-loader')

import raf from 'raf'

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

	raf.add(render)
}

function render() {
	Storage.RendererClass.render()
}
