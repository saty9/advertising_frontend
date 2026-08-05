<template>
  <div class="video-container">
    <video
      ref="vid"
      :src="usedSrc"
      autoplay
      muted
      playsinline
      preload="auto"
      @playing="started"
      @timeupdate="timeUpdated"
      @ended="finished"
      @error="playbackFailed"
    />

    <!-- Only shown when required by the Android WebView workaround -->
    <div
      v-if="showCover"
      class="video-cover"
    />
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "DisplayVideo",

  props: {
    src: String
  },

  data() {
    return {
      usedSrc: this.src,
      isWebView: false,
      showCover: false,
      finishing: false
    };
  },

  methods: {
    started() {
      /*
       * Wait for two render cycles before removing the cover.
       * This gives the first decoded video frame time to appear.
       */
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.showCover = false;
        });
      });
    },

    timeUpdated() {
      const video = this.$refs.vid;

      if (
        !this.isWebView ||
        !video ||
        this.finishing ||
        !Number.isFinite(video.duration)
      ) {
        return;
      }

      /*
       * Put the cover back shortly before the video ends so the
       * WebView's play logo cannot flash onto the screen.
       */
      const remaining = video.duration - video.currentTime;

      if (remaining <= 0.15) {
        this.showCover = true;
      }
    },

    finished() {
      if (this.finishing) {
        return;
      }

      this.finishing = true;

      /*
       * Restore the cover only on WebView devices.
       * Normal browsers should never display it.
       */
      this.showCover = this.isWebView;
      this.usedSrc = "";

      Vue.nextTick(() => {
        this.$emit("finished");
      });
    },

    playbackFailed(event) {
      console.error("Video playback failed", event);
      this.finished();
    }
  },

  mounted() {
    /*
     * iiSignage² includes the "wv" WebView marker in its user agent.
     * Normal Linux browsers will not match this.
     */
    this.isWebView = /\bwv\b/i.test(navigator.userAgent);
    this.showCover = this.isWebView;

    this.$refs.vid.play().catch(error => {
      console.error("Video autoplay failed", error);
      this.finished();
    });
  }
};
</script>

<style scoped>
.video-container {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #000;
}

/*
 * Keep the normal hardware-accelerated video fullscreen.
 */
video {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: fill;
  background: #000;
  z-index: 1;
}

/*
 * This sits above the video on the Android WebView during startup
 * and immediately before the video ends.
 */
.video-cover {
  position: absolute;
  inset: 0;
  background: #000;
  z-index: 9999;
  pointer-events: none;
}

/*
 * Secondary attempt to suppress Chromium/WebView controls.
 */
video::-webkit-media-controls,
video::-webkit-media-controls-enclosure,
video::-webkit-media-controls-panel,
video::-webkit-media-controls-overlay-play-button,
video::-webkit-media-controls-start-playback-button {
  display: none !important;
  -webkit-appearance: none;
}
</style>
