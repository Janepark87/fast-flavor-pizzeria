import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const config = {
		base: command === 'serve' ? '/' : '/fast-flavor-pizzeria/',
		plugins: [react()],
		server: {
			proxy: {
				'/api': {
					target: env.VITE_PIZZA_MENU_API_URL,
					changeOrigin: true,
				},
			},
		},
		define: {
			'process.env.VITE_PIZZA_MENU_API_URL': JSON.stringify(env.VITE_PIZZA_MENU_API_URL),
		},
	};

	return config;
});
