import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		// Service worker for offline use: precaches the whole app on the first visit and serves it cache-first after that.
		// A new deploy installs in the background and takes over right away, but an open page keeps running the version it
		// loaded; the update shows up on the next launch or reload, so nobody loses what they're typing.
		VitePWA({
			// The manifest lives in public/manifest.webmanifest and is linked from index.html.
			manifest: false,
			injectRegister: "script-defer",
			registerType: "autoUpdate",
			workbox: {
				// woff2 only: every browser with service workers supports it, so the woff fallbacks never get used.
				globPatterns: ["**/*.{html,js,css,woff2,svg,png,webmanifest}"],
				// Deep links (/copy, /paste) are client-side routes, so they all load the app shell.
				navigateFallback: "/index.html",
				cleanupOutdatedCaches: true,
				skipWaiting: true,
				clientsClaim: true,
			},
		}),
	],
});
