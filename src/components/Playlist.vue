<template>
  <Playlist v-if="current_is_playlist" :key="alternator" :items="interspersed" :y-t-ready="YTReady" v-on:looped="next"/>
  <DisplayElement v-else :key="alternator" :src="current.src" :type="current.type" :y-t-ready="YTReady" v-on:finished="next"/>
</template>

<script>
import DisplayElement from "@/components/DisplayElement";

export default {
  name: 'Playlist',
  components: {
    DisplayElement
  },
  props: {
    items: {type: Array, default: () =>[]},
    interspersed: {type: Array, default: () => []},
    YTReady: Boolean
  },
  data: function () {
    return {
      i: 0,
      alternator: true,
    }
  },
  methods: {
    next: function () {
      let old_i = this.i;
      this.i = (this.i + 1 )%this.length;
      if (old_i >= this.i) {
        this.$emit('looped')
      }
      this.alternator = !this.alternator;
    },
  },
  computed: {
    current_is_playlist() {
      return this.interspersed.length && (this.i % 2) || this.items.length === 0
    },
    current() {
      console.warn("computing current")
      if (!this.interspersed.length){
        return this.items[this.i];
      }
      if (this.i%2) {
        return this.items[this.i]
      }
      return this.items[this.i/2]
    },
    length() {
      return this.interspersed.length? this.items.length*2:this.items.length
    }
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
