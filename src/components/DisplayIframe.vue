<template>
  <iframe v-bind:src="src"/>
</template>

<script>
const displaytime = 3_000;

export default {
  name: 'DisplayIFrame',
  props: {
    src: String
  },
  mounted() {
    let self = this;
    window.setTimeout(()=>{self.$emit("finished")}, displaytime)
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
}
</style>
