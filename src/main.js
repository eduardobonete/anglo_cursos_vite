import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {BootstrapVue3 } from 'bootstrap-vue-3'
import {BootstrapVueIcons } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import './assets/bootstrap.scss';

library.add(
	faSearch,
	faAddressBook
	)

const app = createApp(App)

app.use(router)
app.use(store)
app.use(BootstrapVue3)
app.use(BootstrapVueIcons)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
