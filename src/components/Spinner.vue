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
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		background-color: #FFF;
		color: #333;
		opacity: 0.8; 
	}
	.spinner-border {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -20px;
		margin-left: -25px;
		width: 50px;
		height: 40px;
		text-align: center;
		font-size: 10px;
	}
</style>
<script>
	export default {
		name: 'Spinner'
	};
</script>