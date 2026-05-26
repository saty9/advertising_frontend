import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

if ('serviceWorker' in navigator) {
  console.log("registering service worker")
  navigator.serviceWorker.register('/service-worker.js');
} else {
  console.warn("cant start service worker")
}
