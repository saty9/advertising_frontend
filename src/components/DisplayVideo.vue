<template>
  <video v-bind:src="usedSrc" v-on:ended="finished" autoplay/>
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
