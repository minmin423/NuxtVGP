export default defineNuxtConfig({
	srcDir: 'client/',
	// build: { transpile: ['vuetify'] },
	imports: { dirs: ['./stores'] },
	apollo: {
		autoImports: true,
		proxyCookies: true,
		clients: {
			default: { httpEndpoint: 'https://spacex-production.up.railway.app/' },
		},
	},
	modules: [
        '@nuxtjs/apollo',
        ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }],
        "@nuxtjs/tailwindcss"
    ],
})