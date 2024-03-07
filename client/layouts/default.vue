<template>
	<div class="w-full">
		<Header />
		<slot />

		<Footer />
	</div>
</template>
<script>
export default {
	name: 'DefaultLayout',
}
</script>
