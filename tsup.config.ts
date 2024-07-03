import { defineConfig } from 'tsup'

export default defineConfig({
	external: ['openseadragon', 'react', 'react-dom']
})