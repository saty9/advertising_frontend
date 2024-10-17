<template>
  <iframe v-bind:src="src" scrolling="no"/>
</template>

<script>

export default {
  name: 'DisplayIFrame',
  props: {
    src: String,
    displaytime: {
      type: Number,
      default: 3000
    }
  },
  mounted() {
    let self = this;
    window.setTimeout(()=>{
      self.$emit("finished")
    }, this.displaytime)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
iframe {
  width: 100vw;
  height: 100vh;
  object-fit: fill;
  position: absolute;
  z-index: -10;
  border: 0;
  overflow: hidden;
}
</style>
