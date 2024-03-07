export const useFavorites = defineStore('favorites', {
	state: () => ({ favorites: [] as string[] }),
	// getters: {
	// 	doubleCount: (state) => state.count * 2,
	// },
	actions: {
		addFavorite(id: string) {
            if(!this.favorites.includes(id)) this.favorites.push(id);
		},
	},
})
