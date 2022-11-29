<template>
  <div>
  	<RouterView />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script>
	import api from '../services/api';
	export default {
		created() {
			api.init();
		}
	};
</script>