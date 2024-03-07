<template>
	<div class="px-2 md:px-10 h-full min-h-screen">
		<h1 class="text-3xl font-semibold">Rockets</h1>

		<div v-if="rockets" class="flex font-semibold">
			<div v-for="rocket in rockets" :key="rocket.id"
            @click="rocketId = rocket.id"
            class=" w-1/4 border px-2 py-1 lg:text-lg cursor-pointer hover:bg-slate-200 transition-colors ease-in-out duration-300"
            :class="{ 'bg-slate-200' : rocketId === rocket.id }">
				{{ rocket.name }} 
			</div>
		</div>

		<div class="text-xl text-center border rounded py-10 font-semibold">No Rockets found. 🐱‍🚀</div>

        <RocketDetails v-if="rocketId !== ''" />
	</div>
</template>

<script setup lang="ts">
const rocketId = useRocketId();

const query = gql`
	query Query {
		rockets {
			id
			name
		}
	}
`
const { data } = useAsyncQuery<{
	rockets: {
		id: string
		name: string
	}[]
}>(query)
const rockets = computed(() => data.value?.rockets ?? []);

watch(rockets, (newVal) => {
    if (newVal && newVal.length > 0) {
        rocketId.value = newVal[0].id;
    }
});
</script>
