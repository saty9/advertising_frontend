<template>
  <transition name="fade">
    <DisplayImage v-if="type === 'IMG'" v-bind:src="src" v-on:finished="$emit('finished')" :displaytime="duration"/>
    <DisplayVideo v-if="type === 'VID'" v-bind:src="src" v-on:finished="$emit('finished')"/>
    <DisplayYoutube v-if="type === 'YTV' && YTReady" v-bind:src="src" v-on:finished="$emit('finished')"/>
    <DisplayIFrame v-if="type === 'FRM'" v-bind:src="src" v-on:finished="$emit('finished')" :displaytime="duration"/>
  </transition>
</template>

<script>
import DisplayImage from "@/components/DisplayImage";
import DisplayVideo from "@/components/DisplayVideo";
import DisplayYoutube from "@/components/DisplayYoutube";
import DisplayIFrame from "@/components/DisplayIframe";

export default {
  name: 'DisplayElement',
  components: {DisplayIFrame, DisplayYoutube, DisplayVideo, DisplayImage},
  props: {
    type: String,
    src: String,
    YTReady: Boolean,
    duration: Number,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
