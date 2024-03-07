export const useFavorites = defineStore('favorites', {
	state: () => ({ favorites: [] as string[] }),
	actions: {
		addFavorite(id: string) {
            if(!this.favorites.includes(id)) this.favorites.push(id);
		},
		removeFavorite(id: string) {
			console.log("id: ", id);
            this.favorites = this.favorites.filter(favId => favId !== id);
		}
	},
})
