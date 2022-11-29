<template>
	<div class="body">
		{{ embed }}
		<div id="mdstrm-player"></div>
	</div>
</template>

<script>
	export default {
		props: {
			embed: {
				type:String,
			},
		},
		methods: {

		},
		mounted() {
			window.player(this.embed);
		}
	};
</script>