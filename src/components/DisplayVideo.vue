<template>
  <div>
    <video ref="vid" v-bind:src="usedSrc" v-on:ended="finished" :poster="poster" autoplay/>
    <canvas ref="canvas" style="display: none" width="1920" height="1080"/>
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
      usedSrc: this.src,
      poster: undefined,
    }
  },
  methods: {
    finished() {
      let context = this.$refs.canvas.getContext('2d');
      context.drawImage(this.$refs.vid, 0, 0, 1920, 1080);
      this.poster = this.$refs.canvas.toDataURL();
      this.usedSrc=""
      Vue.nextTick(() => this.$emit('finished'))
    }
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
</style>
