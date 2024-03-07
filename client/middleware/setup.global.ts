export default defineNuxtRouteMiddleware((to) => {
	if (to.name !== 'favorites' && to.name !== 'rockets') {
		if (to.path !== '/') {
			return navigateTo('/')
		}
	}
})
