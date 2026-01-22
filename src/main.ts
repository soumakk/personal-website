import { getWebGLErrorMessage, isWebGLAvailable } from 'three-stdlib'
import App from './app/App'
import './style.css'

const root = document.getElementById('app') as HTMLDivElement

window.addEventListener('DOMContentLoaded', () => {
	if (isWebGLAvailable()) {
		App.init(root)
	} else {
		const warning = getWebGLErrorMessage()
		console.warn(warning)
		root.textContent = 'WebGL is not supported'
	}
})
