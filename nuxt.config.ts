export default defineNuxtConfig({
	srcDir: 'client/',
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
	ssr: false
})