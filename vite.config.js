import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const config = {
		plugins: [react()],
		server: {
			proxy: {
				'/api': {
					target: env.PIZZA_MENU_API_URL,
					changeOrigin: true,
				},
			},
		},
	};

	if (command !== 'serve') {
		config.base = '/fast-flavor-pizzeria/';
	}

	return config;
});
