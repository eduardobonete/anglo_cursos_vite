<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar">
        <div class="container">
          <div class="col-12">
            <div class="row">
              <div class="col-md-1 col-2">
                <router-link to="/home">
                  <img :src="home+'assets/vue/angloplay/src/assets/logo.png'" class="img-fluid" alt=""></router-link>
              </div>
              <div class="col-md-3 col-3 d-flex align-items-center">
                <router-link to="/agenda" class="nav-link">Programação</router-link>
              </div>
              <div class="col-md-5 col-2 live d-flex align-items-center">    
              </div>
              <div class="col-md-3 col-5 d-flex align-items-center">
                <form class="input-group align-items-end" onsubmit="return false">
                  <input type="text" class="form-control" placeholder="Pesquisa" aria-label="Pesquisa" >
                  <button class="btn btn-anglo"> 
                    <font-awesome-icon icon="fa-solid fa-search" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <RouterView />
</template>
<script>
  export default {
    data() {
      return {
        home: '/',
      }
    }
  };
</script>
