import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],

	build: {
		lib: {
			entry: resolve(__dirname, 'src/lib/index.ts'),
			name: 'UseOSD',
			fileName: 'use-osd',
		},

		rollupOptions: {
			external: ['openseadragon'],
			output: {
				globals: {
					openseadragon: 'OpenSeadragon'
				}
			}
		}
	}
})
