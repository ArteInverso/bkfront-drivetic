import Vue from 'vue'
import App from './App.vue'
import AxiosPlugin from 'vue-axios-cors';

Vue.config.productionTip = false
Vue.use(AxiosPlugin)

new Vue({
    render: h => h(App),
}).$mount('#app')