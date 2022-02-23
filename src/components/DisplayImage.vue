<template>
  <img v-bind:src="src">
</template>

<script>

export default {
  name: 'DisplayImage',
  props: {
    src: String,
    displaytime: {
      type: Number,
      default: 3_000
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
img {
  width: 100vw;
  height: 100vh;
  object-fit: fill;
  position: absolute;
  z-index: -10;
}
</style>
