<template>
	<div class="loading d-flex justify-content-center">
		<div class="spinner-border" role="status">
			<span class="sr-only spinner">Loading...</span>
		</div>
	</div>
</template>
<style scoped>
	.loading {
		width: 100%;
		height: 100%;
		position: absolute;
		min-height: 200px;
		left: 0;
		background-color: #000;
		color: #EEE;
	}
</style>
<script>
	export default {
		name: 'Spinner'
	};
</script>