<template>
  <iframe ref="frame" :src="iframeSrc" class="advert tube" allow="autoplay" />
</template>

<script>
export default {
  name: 'DisplayYoutube',
  props: {
    src: String
  },
  data() {
    return {
      player: null,
      iframeSrc: `${ this.src }?controls=0&enablejsapi=1&iv_load_policy=3`
    }
  },
  mounted() {
    let self = this;
    //eslint-disable-next-line no-undef
    this.player = new YT.Player(this.$refs.frame)
    this.player.addEventListener("onStateChange", (event) => {
      //eslint-disable-next-line no-undef
      if (event.data !== YT.PlayerState.ENDED) { return }
      self.player.stopVideo();

      self.$emit("finished")
    })
    if (self.player.playVideo) {
      return self.player.playVideo();
    }
    self.player.addEventListener("onReady", () => {
      self.player.playVideo()
    })
  },
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
