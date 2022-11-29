<template>
	<div class="movie">
    <spinner v-if="loading"></spinner>
		<section class="breadcrumb pt-5">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/home">Home</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">{{ data.nome }}</li>
        </ol>
      </nav>
    </div>
  </section>

  <section class="movie">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-sm-12">
          <div id="mdstrm-player" style="height: 90%;"></div>
          <h6 class="text-uppercase p-0"> <b>{{ video.titulo }}</b></h6>
          <div class="row mt-2 mb-5" v-if="undefined != video.avaliacao">
              <div class="col-md-6 stars">
                <div class="rating-percent__big-star product-review__quantity-graphic-star"> 
                  <div class="rating-percent__empty"> 
                    <div class="rating-percent__empty-star">★</div> 
                    <div class="rating-percent__empty-star">★</div> 
                    <div class="rating-percent__empty-star">★</div> 
                    <div class="rating-percent__empty-star">★</div> 
                    <div class="rating-percent__empty-star">★</div> 
                  </div> 
                  <div class="rating-percent__full" v-if="video.avaliacao.total > 0">   
                    <div class="rating-percent__full-star" :style="{width: (s > 0 ? s : 0)  +'%'}" v-for="s in media" v-bind:key="s">★</div>        
                  </div> 
                  <small>{{video.avaliacao.media}} / 5</small>
                </div>
                {{ video.avaliacao.total }} avaliações <a class="link-yellow" @click="m_avaliacao = true" v-if="video.avaliado == null">Avaliar</a>
              </div>
              <div class="col-md-6 text-end icons">
                <a title="Caderno de Aulas" style="display:none;"><i class="fas fa-book-open"></i></a>
                <a title="Caderno de Estudos" style="display:none;"><i class="fas fa-book"></i></a>
                <a title="Tarefas" style="display:none;"><i class="fas fa-book-reader"></i></a>
                <a title="Continuar Vídeo" @click="continueVideo();" v-if="video.time != null">
                  <i class="fas fa-arrow-right"></i>
                </a>
                <a title="Favoritos" style="display:none;"><i class="fas fa-heart"></i></a>
                <a title="Dúvidas" style="display:none;"><i class="fas fa-user-graduate"></i></a>
              </div>
            </div>
  
          </div>
        <div class="col-md-4 col-sm-12" v-if="aulas.length > 0">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item" v-for="a in aulas" v-bind:key="a">
              <h2 class="accordion-header" id="headingOne" >
                <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse'+a.numero_apostila" aria-expanded="false" :aria-controls="'collapse'+a.numero_apostila">
                  <div class="item mx-3 d-flex justify-content-center align-items-center">{{ a.numero_apostila}} </div>
                  <div class="title">
                    <h5>{{ a.descricao_apostila }}</h5> 
                    <small v-if="aulas.length > 1">{{ a.data.length }} aulas</small>
                    <small v-else>{{ a.data.length }} aula</small>
                  </div>
                </button>
              </h2>
              <div :id="'collapse'+a.numero_apostila" class="accordion-collapse collapse" v-bind:class="a.open ? 'show' : ''" aria-labelledby="'heading'+a.numero_apostila" data-bs-parent="#accordionExample">
                <div class="accordion-body" style="max-height: 400px; overflow:auto;">
                  <ul>
                    <li v-for="v in a.data" :key="v" v-bind:class="v.id == aula.id ? 'active' : ''">
                      <a @click="setAula(v)" style="cursor:pointer">   {{ v.titulo }} </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <br>
  <br>
  <br> 
  <section class="notation">
    <div class="container">
      <ul class="nav nav-tabs responsive-tabs" id="myTab" role="tablist">
        <li class="nav-item " role="presentation">
          <button class="nav-link active" id="anexos-tab" data-bs-toggle="tab" data-bs-target="#anexos" type="button" role="tab" aria-controls="anexos" aria-selected="true">Anexos de Aula</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="getAnotacoes()" class="nav-link" id="anotacoes-tab" data-bs-toggle="tab" data-bs-target="#anotacoes" type="button" role="tab" aria-controls="anotacoes" aria-selected="false">Anotações do Aluno</button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="anexos" role="tabpanel" aria-labelledby="anexos-tab">  
          <div class="container my-4"> 
            <div class="row">
              <div class="my-2 download" v-for="a in anexos" :key="a">
                <a :href="api_url+a.arquivo" target="blank"><i class="fas fa-download"></i></a> &nbsp;
                <a :href="api+a.arquivo" target="blank">{{ a.nome }} </a> 
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="anotacoes" role="tabpanel" aria-labelledby="anotacoes-tab"> 
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label>Nova anotação</label>
                <textarea rows="3" class="form-control" v-model="anotacao"></textarea>
                <button class="btn btn-primary my-2" @click="saveAnotacao()">Salvar</button>
                <hr>
              </div>
            </div>
            <div class="col-md-12">
              <div v-for="a in anotacoes" v-bind:key="a" class="row">
                <div class="col-md-11">
                  {{ moment(a.created_at).format('DD/MM/YYYY hh:mm') }} - {{ a.anotacao }}
                </div>
                <div class="col-md-1">
                  <a @click="delAnotacao(a.id)"><i class="fas fa-trash"></i></a>
                </div>
                <hr>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="search-wrapper">
    <div class="container my-5"> 
      <div class="row">
        <h1>VÍDEOS DA AULA {{ aula.num_aula }}</h1>
        <div class="col-md-4 p-2 result" v-for="v in videos" v-bind:key="v">
          <a @click="setVideo(v)">
            <video style="width: 100%" autoplay loop muted :poster="path+'img/layout/'+data.imagem">
              <!--<source :src="https://mdstrm.com/video/'+data.embed_video+'/preview.mp4" type="video/mp4">
              <source :src="https://mdstrm.com/video/'+data.embed_video+'/preview.webm" type="video/webm"> -->
                <source :src="'https://mdstrm.com/video/'+v.embed_video+'/preview.mp4'" type="video/mp4">
                <source :src="'https://mdstrm.com/video/'+v.embed_video+'/preview.webm'" type="video/webm">

            </video>  

            <h5> {{ v.titulo }} </h5>
          </a>
        </div>
      </div>
    </div>
  </section>

  <div class="modal" style="display:block" v-if="m_avaliacao == true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Avaliação</h5>
          <button type="button" class="close" @click="m_avaliacao = false">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div>   
            <div class="star" @click="aval = 1" v-bind:class="aval >= 1 ? 'yellow': ''">★</div>
            <div class="star" @click="aval = 2" v-bind:class="aval >= 2 ? 'yellow': ''">★</div>
            <div class="star" @click="aval = 3" v-bind:class="aval >= 3 ? 'yellow': ''">★</div>
            <div class="star" @click="aval = 4" v-bind:class="aval >= 4 ? 'yellow': ''">★</div>
            <div class="star" @click="aval = 5" v-bind:class="aval == 5 ? 'yellow': ''">★</div>
            <div class="star yellow"> {{ aval }} / 5</div>
            <button class="btn btn-primary m-" @click="avaliar()" style="margin-top:10px; margin-left: 10px;">Avaliar</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="search-wrapper">
    <div class="container my-5"> 
      <div class="row">
        <h1 class="text-uppercase">CURSOS RELACIONADOS</h1>
        <div class="col-md-4 p-2 result" v-for="v in videosRelacionados" v-bind:key="v">
          <a @click="init(v.id)">
            <img :src="path+'img/layout/'+v.imagem">
            <h5> {{ v.nome }} </h5>
          </a>
        </div>
      </div>
    </div>
  </section>
	</div>
</template>

<script>
  import api from '../services/api';
  import Spinner from '../components/Spinner.vue';
  import moment from 'moment';

  export default {
    components: {Spinner},
    data() {
      return {
        pathanexo: null,
        api: null,
        loading: true,
        result: [],
        aulas: [],
        videos: [],
        videosRelacionados: [],
        anexos: [],
        aula: {
          id: 0,
          num_aula: 1,
          titulo: null,
        },
        video: {
          id: 0,
        },
        data: {
          id: 0,
          nome: null,
        },
        id: null,
        aula_id: null,
        url: null,
        embed: null,
        carrelacionados: false,
        timevideo: 0,
        anotacoes:[],
        anotacao: null,
        moment: null,
        m_avaliacao: false,
        aval:0,
        media: [],
        isFullScreen: false,
      }
    },
    methods: {
      getData(type) {
        if(type == 'Aula'){
            this.getAula();
          } else {
            this.getAulasSetor(); 
          }  
      },
      getAula() {
        var self = this
        api.getAll('aluno/aula/'+this.aula_id).then(function(res) {
          self.result = res.data.data;
          self.id = self.result[0].id_setor;
          self.anotacoes = self.result[0].anotacao;
          if(self.result[0].revisao == 1) {
            self.getAulasRevisao();
          } else {
            self.getAulasSetor();
          }
          
        })
      },
      getAulasRevisao() {
        var self = this;
        api.getAll('aluno/aulas-revisoes/'+this.aula_id).then(function(res) {
          self.aulas = res.data.data;
          self.data = res.data.setor;
          self.videosRelacionados = res.data.relacionados;
          if(self.aula_id ==  null) {
            if(self.aulas.length > 0 ) {
              self.aula = self.aulas[0].data[0];
            }
          } else {
            self.aulas[0].data.forEach(function(r) {
              if(r.id == self.aula_id) {
                self.aula = r;
              }
            })
          }
          self.getVideos();
        })
      },
      getAulasSetor() {
        var self = this 
        api.getAll('aluno/aulas-por-setor/'+this.id).then(function(res) {
          self.aulas = res.data.data;
          self.data = res.data.setor;
          self.videosRelacionados = res.data.relacionados;
          if(self.aula_id ==  null) {
            if(self.aulas.length > 0 ) {
              self.aula = self.aulas[0].data[0];
            }
          } else {
            self.aulas.forEach(function(g, index) {
              g.data.forEach(function(r) {
                if(r.id == self.aula_id) {
                  self.aula = r;
                  self.aulas[index].open = true
                } else {
                  self.aulas[index].open = false
                }
              })
            });
          }
          self.getVideos();
        })
      },
      avaliar() {
        var data = {
          id_aula: this.video.id_aula,
          id_video: this.video.id_video,
          nota: this.aval,
        }
        var self = this
        api.create('/aluno/avaliacao', data).then(function() {
          self.getVideos(false);
          self.m_avaliacao = false;
        })

      },
      setAula(a) {
        this.loading = true;
        this.aula = a;
        this.anotacoes = a.anotacao;
        this.getVideos();
        this.getAnotacoes();
      },
      getVideos(set = true) {
        var self = this;
        this.carvideos = false;
        api.getAll('/aluno/videos-da-aula/'+this.aula.id).then(function(res) {
          self.videos = res.data.data;
          self.anexos = res.data.anexos;
          if(set) {
            if(self.videos.length > 0) {
              self.video = self.videos[0];
              self.setVideo(self.video);
            }
          } else {
            self.videos.forEach(function(r) {
              if (r.id_video == self.video.id_video) {
                self.setVideo(r)
              } 
            })
          }
          self.loading = false;
          
          
        });
      },
      nextVideo() {
        var self = this;
        var x = 0;
        this.videos.forEach(function(n, k) {
          if(n.embed_video == self.video.embed_video) {
            x = k+1;
          }
        })
        if(this.videos[x] != undefined){
          this.setVideo(this.videos[x], 1);
        }
      },
      setVideo(v, starttime = 0) {
        this.video = v;
        this.media = [];
        var md = v.avaliacao.media;
        this.media[0] = md >= 1 ? 20 : md * 20;
        this.media[1] = md >= 2 ? 20 : (md -1) * 20;
        this.media[2] = md >= 3 ? 20 : (md -2) * 20;
        this.media[3] = md >= 4 ? 20 : (md -3) * 20;
        this.media[4] = md >= 5 ? 20 : (md -4) * 20;
        console.log(this.media)
        window.scrollTo(0 , 0);
        window.player(v.embed_video, starttime, this);
      },
      continueVideo() {
        window.player(this.video.embed_video, this.video.time, this);
      },
      init(id = null) {
        if(id != null && this.$route.name == 'Aula') {
          this.$router.push('/setor/'+id)
        }
        if(this.$route.name == 'Aula') {
          this.aula_id = this.$route.params.id;
        } else {
          if(id != null) {
            this.$route.params.id = id;
            this.$router.push('/setor/'+id)
          }
          this.id = this.$route.params.id;
        }
        this.url = localStorage.getItem('app_url');;
        this.getData(this.$route.name);
        this.path = localStorage.getItem('api_storage');;
        this.pathanexo = localStorage.getItem('api_url');
        this.api = localStorage.getItem('api');
      },
      updateTime(time) {
        var obj = {
          embed: this.video.embed_video,
          time: time
        }

        api.create('aluno/video/savetime', obj);
      },
      saveAnotacao() {
        var obj = {
          anotacao: this.anotacao
        }
        var self = this;
        api.create('aluno/anotacao/'+this.aula.id+'/save', obj).then(function() {
          self.getAnotacoes();
        });
      },
      delAnotacao(id) {
        var self = this;
        api.delete('aluno/anotacao',id).then(function() {
          self.getAnotacoes();
        })
      },
      getAnotacoes() {
        var self = this
        api.getAll('aluno/anotacao/'+this.aula.id).then(function(res) {
          self.$nextTick(function() {
            self.anotacoes = res.data.data;
            self.anotacao = null;
          })
          
        })
      }
    },
    created() {
      api.init();
      this.init();
      this.moment = moment;
      window.aula = this;
    }
  };
</script>

<style scoped>
  .result img {
    width: 100%;
    border-radius: 5px;
  }
  a {
    cursor: pointer;
  }
  .download a{
    color: #FFF;
    text-decoration: none;
  }
  .rating-percent__big-star .rating-percent__full {
    position: absolute;
    top: 0px;
  }
  .rating-percent__big-star .rating-percent__empty {
    position: relative;
  }
  .rating-percent__big-star .rating-percent__full-star {
    float: left;
    overflow: hidden;
    width: 20%;
    color: #FFCC03;
  }
  .rating-percent__big-star .rating-percent__empty-star {
    float: left;
    color: #E5E5E5;
  }
  .product-review__quantity-graphic-star {
    height: 60px;
    margin: -10px auto 0;
    position: relative;
  }
  .rating-percent__big-star {
      font-size: 38px;
      overflow: hidden;
  }
  .link-yellow {
    color:  #FFCC03;
    cursor:pointer;
    font-weight: bold;
    text-decoration: none;
  }
  button.close {
    padding: 0;
    background-color: transparent;
    border: 0;
    -webkit-appearance: none;
  }
  .modal-title {
    color: #000;
  }
  .star {
    float: left;
    font-size: 40px;
    color: #CCC;
    cursor: pointer;
  }

  .star.yellow {
    color: #FFCC03;
  }

  .star:hover{
    color: #FFCC03;
  }
</style>