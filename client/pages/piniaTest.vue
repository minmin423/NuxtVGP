<template>
	<div class="flex flex-col justify-center items-center w-full text-center">
		<div class="text-2xl">{{ store.count }}</div>
		<button class="bg-blue-400 w-fit rounded-lg px-2 text-white py-1" @click="store.increment()">Increment</button>
	</div>
</template>

<script setup lang="ts">
const store = useCounter();
</script>