<template>
  <main>
    <RouterView />
  </main>
</template>

<script>
	import axios from 'axios';
	import api from '@/services/api';
	export default {
		methods: {
			handleLogin() {
        
	        	var self = this;
	          	this.$store.dispatch("auth/login").then((res) => {
	            	if(res) {
	              		api.init();
	              		self.$router.push('home');
	            	} else {
	              		console.log('Login FAiled')
	            	}
	            
	          	})
	      	},
		},
		created() {
			if(this.$router.currentRoute.value.fullPath == "/") {
				var self = this
				//axios.get(import.meta.env.VITE_APP_URL+'/assets/vue/angloplay/src/assets/config.json').then(function(res) {
				axios.get('/src/config/config.json').then(function(res) {
					localStorage.setItem('api_url', res.data.api_url);
					localStorage.setItem('api_storage', res.data.api_storage);
					localStorage.setItem('api', res.data.api);
					localStorage.setItem('app_url', res.data.app_url);
					self.handleLogin();
					
				}) 
			}
			
		}
	};
</script>