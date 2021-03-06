import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

const vueApp = new Vue({
  render: function(h) { return h(App, {props: {YTReady: this.YTReady}})},
  data: function () {
    return {
      YTReady: false
    }
  },
  methods: {
    initYoutube(){
      console.log("YT Ready")
      this.YTReady = true
    }
  }
}).$mount('#app')

window.onYouTubeIframeAPIReady = () => {
  console.log("onYouTubeIframeAPIReady");
  vueApp.initYoutube();
};

if('serviceWorker' in navigator) {
  console.log("registering service worker")
  navigator.serviceWorker.register('/service-worker.js');
} else {
  console.warn("cant start service worker")
}
