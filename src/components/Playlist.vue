<template>
  <DisplayElement v-if="currentItem" :key="alternator" :src="currentItem.src" :type="currentItem.type"
                  :y-t-ready="YTReady" v-on:finished="next"
                  :duration="(currentItem.duration || 10) * 1000"/>
</template>

<script>
import DisplayElement from "@/components/DisplayElement";

// A "stream" is just an object with a next() that returns items forever.
// We build the playback order by composing three of them:
//
//   base   = the screen's own playlist, cycled endlessly
//   stage1 = base with the PLAYLIST-level interspersed playlist mixed in,
//            one every `rate` *base* items (so it behaves as though the
//            screen-level interspersion isn't happening)
//   stage2 = stage1 with the SCREEN-level interspersed playlist mixed in,
//            one every `rate` *stage1* items (so the screen one always
//            happens at its configured rate)
//
// Cursors live inside each stream's closure, so round-robin position
// naturally persists across base loops instead of restarting every loop.
// Example (playlist B rate 1, screen C rate 1): A, C, B, C, A, C, B, C, ...

// Cycle `items` forever. Returns null when there is nothing to cycle.
function cyclicStream(items) {
  if (!items || items.length === 0) return null
  let i = 0
  return {
    next() {
      const x = items[i]
      i = (i + 1) % items.length
      return x
    }
  }
}

// Emit `rate` items from `base`, then one from `insert`, repeating.
// With no `insert` stream the pipeline is just `base` unchanged.
function intersperse(base, insert, rate) {
  if (!insert) return base
  const every = Math.max(1, rate || 1)
  let sinceInsert = 0
  return {
    next() {
      if (sinceInsert >= every) {
        sinceInsert = 0
        return insert.next()
      }
      sinceInsert += 1
      return base.next()
    }
  }
}

export default {
  name: 'Playlist',
  components: {
    DisplayElement
  },
  props: {
    items: {type: Array, default: () => []},
    interspersed: {type: Object, default: () => ({playlist: null, screen: null})},
    YTReady: Boolean
  },
  data: function () {
    return {
      currentItem: null,
      // Toggled on every item so DisplayElement remounts (via :key) and
      // replays its fade/transition for the next item.
      alternator: true,
    }
  },
  methods: {
    // Compose the playback pipeline once. App.vue remounts this component
    // (keyed on playlist + last-updated) whenever the content changes, so
    // there is no need to rebuild it on prop updates.
    buildPipeline() {
      const i = this.interspersed || {}

      if (this.items && this.items.length) {
        const playlist = i.playlist || {}
        const screen = i.screen || {}
        let pipeline = cyclicStream(this.items)
        pipeline = intersperse(pipeline, cyclicStream(playlist.items), playlist.rate)
        pipeline = intersperse(pipeline, cyclicStream(screen.items), screen.rate)
        return pipeline
      }

      // No base playlist: just cycle whatever interspersed items exist,
      // with no further interspersion.
      const fallback = [].concat(
        i.playlist && i.playlist.items ? i.playlist.items : [],
        i.screen && i.screen.items ? i.screen.items : []
      )
      return cyclicStream(fallback)
    },
    advance() {
      this.currentItem = this.pipeline ? this.pipeline.next() : null
    },
    next() {
      this.advance()
      this.alternator = !this.alternator
    },
  },
  created() {
    // Non-reactive: a plain stream closure, not component state.
    this.pipeline = this.buildPipeline()
  },
  mounted() {
    this.advance()
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  background-color: black;

}


</style>
