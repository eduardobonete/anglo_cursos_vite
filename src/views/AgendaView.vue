<template>
  <div class="agenda">
    <section>
    	<div class="container my-2" style="overflow: auto;">
    		<div class="epg-container">
    			<div class="epg-inner-container" style="overflow: auto;">
    				<div class="epg-head-row">
    					<div class="epg-head-on">
              				<p class="text">Salas</p>
            			</div>
            			<div class="epg-head-row-container">
            				<div class="epg-head-item" v-for="h in header" v-bind:key="h" style="width: 12rem;" v-bind:class="[ hora(h) ? 'epg-head-item-active' : '']">
            					<p class="text">{{ h }}</p>
            				</div>
            			</div>
    				</div>
    				<div class="epg-row" v-for="s in salas" v-bind:key="s">
    					<div class="epg-network">
    						{{ s.sala }}
    					</div>
    					<div class="epg-inner-row" >
    						<div v-for="d in s.data" v-bind:key="d">
			              		<div class="epg-item"  v-bind:style="{width: d.colspan+'rem'}" v-if="d.colspan > 0" >
			              			<div v-if="d.data == true">
			              				<small>{{ d.start }} - {{ d.end }}</small>
			                			<p class="text">{{ d.titulo }}</p>
			                		</div>
			                		<div v-else>
			                			<div class="epg-item-invalid" style="width: 400rem;">
							                <p class="text">Sem informação disponível</p>
							            </div>
			                		</div>
			              		</div>
			              	</div>
			            </div>
    				</div>
    			</div>
    		</div>
    	</div>	
    </section>
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
	import moment from 'moment';
	export default {
		data() {
			return {
				header: [],
				salas: [],
				data: null,
			}
		},
		methods :{
			get() {
				var self = this;
				api.getAll('aluno/agenda').then(function(res) {
					self.header = res.data.data.header;
					self.salas = res.data.data.salas;
				})
			},
			hora(h) {
				var hoje = moment();

				var hr = moment(hoje.format('Y-MM-DD')+ ' '+h);
				if(hr.isBefore(moment()) && hr.isAfter(moment().add(-30, 'minutes')) ) {
					return true;
				}


				return false;
			}
		},
		created() {
			api.init();
			this.get();
			this.data = moment()
			console.log(this.data.format('HH:mm'));
		}
	};
</script>
