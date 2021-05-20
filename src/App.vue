<template>
  <div id="app">
    <DisplayElement :key="alternator" :src="items[i].src" :type="items[i].type" :y-t-ready="YTReady" v-on:finished="next"/>
  </div>
</template>

<script>
//import Vue from "vue";
import DisplayElement from "@/components/DisplayElement";

//const displaytime = 3_000;
export default {
  name: 'App',
  components: {
    DisplayElement
  },
  props: {
    YTReady: Boolean
  },
  data: function () {
    return {
      i: 0,
      alternator: true,
      items: [
        {type: "YTV", src: "https://www.youtube-nocookie.com/embed/vDHtypVwbHQ"},
        {type: "FRM", src: "https://stagsevenoaks.co.uk/"},
      ]
    }
  },
  methods: {
    next: function () {
      this.i = (this.i + 1 )%this.items.length;
      this.alternator = !this.alternator;
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
