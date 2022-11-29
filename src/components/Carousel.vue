<template>
	<div :id="id">
		<loading v-if="loading"></loading>
		<div class="wa-carousel">
			<div class="wa-carousel-area" :id="'area'+id">
				<div class="wa-carousel-item" :class="'item'+id" v-for="i in items" v-bind:key="i" >
					<img :src="path+'img/layout/'+i.imagem" style="z-index: 1; float: left;">
					<router-link :to="'/'+to+'/'+i.id" v-if="to != null">
						<h4 v-if="link.indexOf('.') >= 0"> 
							{{ i[link.substr(0, link.indexOf('.'))][link.substr(link.indexOf('.')+1, link.length - link.indexOf('.'))] }} <span v-if="link2 != null"> - {{ i[link2] }}</span> 
						</h4>
						<h4 v-else> 
							{{ i[link] }} 
							<i v-if="link2 != null"> - {{ i[link2] }}</i> 
						</h4>
					</router-link>
					<a :href="i[url]" target="blank" v-if="url != null" style=" float:left; margin-top: -100px; z-index: 9999; padding: 7px;"> 
						<h4> {{ i[link] }} </h4> 
						<small>{{ i.start.substring(0,5) }} - {{ i.end.substring(0,5) }}</small> <br>
						<span style="width: 45px; height: 15px; background-color:#32CD32; color: #FFF; border-radius: 5px; padding: 3px;"> {{ i.messagetime }} </span>
					</a>
				</div>
			</div>
		</div>
		<div class="row" v-if="start && items.length == 0">
			<h4>Não há informações para exibir</h4>
		</div>
		<div class="wa-dots">
			<span class="wa-carousel-button" v-for="b in buttons" v-bind:key="b" v-bind:class="b.active ? 'active' : ''" @click="page(b.page)"></span>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';
	import loading from '@/components/Loading.vue';

	export default {
		name: 'carousel',
		components: {loading},
		data () {
			return {
				loading: true,
				size: null,
				buttons: [],
				tries: 0,
				begin: false,
				path: null,
				moment: null,
			}
		},
		props: {
			items: {
				type: Array,
				default: () => []
			},
			link: {
				type:String,
			},
			link2: {
				type:String,
			},
			detalhe: {
				type:String,
			},
			destaque: {
				type: Array,
				default: () => []
			},
			text_position: {
				type: String,
				default: 'above',
			},
			loop: {
				type: Boolean,
				default: false,
			},
			id: {
				type: String
			},
			margin: {
				type: Number,
				default: 5,
			},
			quantity: {
				type: Number,
				default: 3,
			},
			start: {
				type: Boolean,
				default: false,
			},
			to: {
				type: String,
				default: null,
			},
			url: {
				type: String,
				default: null,
			}
		},
		methods: {
			init() {
				var self = this;
				let quantity = this.items.length;
				let content = $('#'+this.id);
				var sizetotal = 0;
				if(!self.start) {
					setTimeout(self.init, 1000);
				} else {
					if(quantity > 0) {
						var width = $(content).width();
						this.size = (width - (this.quantity * this.margin * 2)) / this.quantity;
						sizetotal = (quantity *10) + (quantity * this.size);
						$('#area'+self.id).css("width", sizetotal+'px');
						$('.item'+this.id).css("width", this.size+'px');
						var btn = 1;
						for(var c = 1; c <= quantity; c++) {
							if((c/btn) == this.quantity || c == quantity) {
								var buttons = {
									page: btn,
									qtd: c,
									active: (btn == 1),
								}
								this.buttons.push(buttons);
								btn++;
							}
						}
					}
					self.loading = false;
				}

				
			},
			page(page) {
				var self = this;
				this.buttons.forEach(function(row) {
					if(row.page == page) {
						row.active = true;
						var scroll = 0
						if(row.page != 1) {
							var total = (self.quantity * (row.page-1))
							scroll =  (total * self.size) + (total * 10);
							$('#area'+self.id).animate({
								'margin-left': '-='+scroll+'px'
							});
						} else {
							$('#area'+self.id).animate({
								'margin-left': '0px'
							});
						}
						
						
					} else {
						row.active = false;
					}
				})
			}
		},
		mounted() {
			this.init();
			this.path = localStorage.getItem('api_storage');//process.env.VUE_APP_API_STORAGE;
		},
	};

</script>

<style scoped>
	.wa-carousel {
		width: 100%;
		overflow: hidden;
	}

	.wa-carousel-item {
		float: left;
		margin: 5px;
		background-color: #000000;
	}

	.wa-carousel-item img {
		width: 100%;
		border-radius: 5px;
	}

	.wa-carousel-button {
		width: 10px;
		height: 10px;
		background-color: #BBB;
		border-radius: 30px;
		margin: 5px 7px;
		display: inline-block;
		cursor: pointer;
	}

	.wa-dots {
		width: 100%;
		text-align: center;
	}

	.wa-carousel-button:hover {
		background-color: #FFF;
	}
	.wa-carousel-button.active {
		background-color: #FFF !important;
	}

	.wa-carousel a {
		text-decoration: none;
		color: #FFF;
	}
</style>