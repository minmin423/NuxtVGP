<template>
	<div class="w-full px-2 lg:px-10 min-h-screen">
		<h1 class="text-3xl font-semibold">Favorite Rockets</h1>

        <div v-if="store.favorites.length !== 0" class="flex gap-4 pt-5">
            <div class="w-full flex flex-col items-center justify-center py-10 border rounded cursor-pointer hover:bg-gray-100 transition-all duration-300 ease-in-out hover:scale-110 px-4 text-center" 
            v-for="rocket in filteredRockets"
            @click="handleRocketClick(rocket.id)">
                <div class="text-6xl pb-10">🚀</div>
                <div class="text-lg lg:text-xl font-semibold">{{ rocket.name }}</div>
                <div>{{ rocket.description }}</div>
            </div>
        </div>

        <div v-else class="text-xl text-center border rounded py-10 font-semibold">No favorites selected. 🌠</div>
	</div>
</template>

<script setup lang="ts">
import { useFavorites } from '~/stores/useFavorites';

const store = useFavorites();
const rocketId = useRocketId();
const test = ref('');

const filteredRockets = computed(() => {
    let filteredRockets = store.favorites ? rockets.value.filter(rocket => {
        return store.favorites.includes(rocket.id);
    }) : [...rockets.value];

    return filteredRockets;
});

const query = gql`
	query Query {
		rockets {
			id
			name
            description
		}
	}
`
const { data } = useAsyncQuery<{
	rockets: {
		id: string
		name: string
        description: string
	}[]
}>(query)
const rockets = computed(() => data.value?.rockets ?? []);

function handleRocketClick(id: string) {
    rocketId.value = id;
    navigateTo('/rockets');
}
</script>