<template>
  <div>
    <video ref="vid" v-bind:src="usedSrc" v-on:ended="finished" autoplay muted/>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: 'DisplayVideo',
  props: {
    src: String
  },
  data() {
    return {
      usedSrc: this.src
    }
  },
  methods: {
    finished() {
      this.usedSrc=""
      Vue.nextTick(() => this.$emit('finished'))
    }
  },
  mounted() {
    const playPromise = this.$refs.vid.play()
    const timeout = new Promise(resolve => setTimeout(() => {resolve("timeout")}, 10000))
    Promise.race([playPromise, timeout]).then(result => {
      if (result !== "timeout")
        return;
      console.warn("video playback start stalled")
      Vue.nextTick(() => this.$emit('finished'))
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
video {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: -10;
  object-fit: fill;
}

/* Chromium/WebKit native play overlay */
video::-webkit-media-controls-overlay-play-button {
  display: none !important;
  -webkit-appearance: none;
}

video::-webkit-media-controls-start-playback-button {
  display: none !important;
  -webkit-appearance: none;
}
</style>
