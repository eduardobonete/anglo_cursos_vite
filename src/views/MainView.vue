<template>
	<section class="aovivo">
		<div class="container my-5">
			<div class="row">
				<h1>AO VIVO</h1>
				<carousel id="aulaaovivo" :items="aulasaovivo" link="subject" detalhe="horario" :destaque="destaques" url="hiperlink" :start="startvivo"></carousel>
			</div>
		</div>
	</section>
	<br>
	<section class="auladodia" v-if="exibir_aula_dia">
		<div class="container my-5"> 
			<div class="row">
				<h1>AULAS DO DIA</h1>
				<carousel id="auladia" :items="aulasdodia" to="aula" link="setor.nome" link2="titulo" :start="startdia"></carousel>
			</div>
		</div>
	</section>
	<section>
		<div class="container">
			<ul class="nav nav-tabs responsive-tabs" id="myTab" role="tablist">
				<li class="nav-item " role="presentation" v-for="(a, k) in aulaspormateria" v-bind:key="a">
					<button class="nav-link" v-bind:class="k == tab_active ? 'active' : ''" @click="setTab(k)" :aria-selected="k == tab_active">
						{{ a.nome }}
					</button>
				</li>
			</ul>
			<div class="tab-content" v-for="(a, k) in aulaspormateria" v-bind:key="a" >
				<div class="tab-pane fade active" v-bind:class="tab_active == k ? 'show' : ''" v-if="tab_active == k">
					<div class="container my-5"> 
						<div class="row">
							<div id="taboptions" class="owl-carousel owl-theme owl-loaded owl-drag">
								<carousel :id="'tab_aulas'+k" :items="a.setores" link="nome" :start="tab_active == k" to="setor"></carousel>
							</div>	
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="revisoes py-4" v-if="revisoes.data.length > 0">
		<div class="container">
			<div class="row mx-1 d-flex justify-content-between">
				<div class="d-flex flex-row justify-content-between flex-sm-row d-sm-block box-revisao mt-2 pt-3" v-for="r in revisoes.data" v-bind:key="r" @click="showRevisoes(r)" v-bind:class="[revisao_ativa == r.id ? 'active': '']">          
					<div class="row d-flex">
						<div class="icon-revision">
							<font-awesome-icon icon="fas fa-address-book" size="3x"/>
						</div>
						<div class="info-revision">
							<h4> {{ r.nome }} </h4>
							<small>{{ r.num_videos }} Vídeos</small>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="list-materias p-5" v-if="mat_revisoes.length > 0">
			<div class="container">
				<h1>LISTA DE MATÉRIAS</h1>
				<div class="row">
					<div class="col-md-3 nav flex-column nav-pills">
						<button class="nav-link" v-for="m in mat_revisoes" 
						v-bind:key="m" @click="set_revisao = m.setor">
							{{ m.nome }}
						</button>
					</div>
					<div class="col-md-9">
						<div class="tab-content box" id="v-pills-tabContent">
							<div class="row">

								<router-link :to="'/aula/'+s.id" v-for="s in set_revisao" v-bind:key="s">
									<div class="col box-list-materias" >
										<img :src="file_storage+'img/layout/'+s.img" class="d-block w-100" alt="Banner 01">
										<h5 class="mt-2">{{ s.nome }}</h5>
									</div>
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<div id="separator_revisao"></div>
</template>

<script>
	import carousel from '../components/Carousel.vue';
	import api from '../services/api';
	export default {
		components: {carousel},
		data() {
			return {
				aulasaovivo: [],
				aulasdodia: [],
				aulaspormateria: [],
				revisoes: {
					data: [],
					num_videos: 0,
				},
				startvivo: false,
				startdia: false,
				startmateria: false,
				startrev: false,
				tab_active: 0,
				tab_aulas: [],
				mat_revisoes: [],
				set_revisao: [],
				revisao_ativa: 0,
				exibir_aula_dia: true,
			}
		},
		methods: {
			setTab(k) {
				this.tab_active = k;
			},
			aulasvivo() {
		        var self = this;
		        api.getAll('aluno/aulas-ao-vivo').then(function(res) {
		          self.aulasaovivo =  res.data.data;
		          self.startvivo = true;
		        })
		    },
		    aulasdia() {
		        var self = this;
		          api.getAll('aluno/aulas-do-dia').then(function(res) {
		            self.aulasdodia = res.data.data;
		            self.exibir_aula_dia = (res.data.exibir == 1)
		            self.startdia = true;
		          })
		    },
		    aulasmateria() {
		        var self = this;
		          api.getAll('aluno/aulas-por-materias').then(function(res) {
		            self.aulaspormateria = res.data.data;
		          })
		    },
		    getrevisoes() {
		        var self = this;
		          api.getAll('aluno/revisoes').then(function(res) {
		            self.revisoes = res;
		            self.mat_revisoes = self.revisoes.data[0].disciplinas;
		            self.revisao_ativa = self.revisoes.data[0].id
		          })
		    },
		    showRevisoes(r) {
		    	this.mat_revisoes = r.disciplinas
		    	this.set_revisao = []
		    	this.revisao_ativa = r.id;
		    	var div = document.getElementById('separator_revisao');
		    	window.scrollTo(0, div.offsetTop);
		    }
		},
		created() {
			this.file_storage = localStorage.getItem('api_storage');
			this.aulasvivo();
	        this.aulasdia(); 
	        this.aulasmateria();
	        this.getrevisoes();
		}
	};
</script>

<style type="text/css">
	.nav-link {
		text-align: left;
	}
	.nav-link {
		color: var(--white-color) !important;
	}
	.nav-link:active {
		background: transparent !important;
		border-color: var(--orange-color) var(--orange-color) var(--orange-color) !important;
		border-bottom-color: var(--black-color) !important;
		color: var(--orange-color) !important;
	}
	.box a {
		color: var(--white-color);
		text-decoration: none;
		width: 33%;
	}
</style>