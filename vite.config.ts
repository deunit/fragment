import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		// exclude: ['typewriter-editor', '@typewriter/document']
		include: ['typewriter-editor > @typewriter/document']

	}
});
