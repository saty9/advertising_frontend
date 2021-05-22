<template>
  <div id="app">
    <Playlist :items="items" :interspersed="interspersed" :y-t-ready="YTReady"/>
  </div>
</template>

<script>
import Playlist from "./components/Playlist";
const SPECIFIC_SCREEN_VIEW_REGEX = /^\/screens\/(\d)+$/
const SPECIFIC_PLAYLIST_VIEW_REGEX = /^\/playlist\/(\d)+$/

//const displaytime = 3_000;
export default {
  name: 'App',
  components: {
    Playlist,
  },
  props: {
    YTReady: Boolean
  },
  data: function () {
    return {
      items: [
        //{type: "YTV", src: "https://www.youtube-nocookie.com/embed/vDHtypVwbHQ"},
        {type: "FRM", src: "https://stagsevenoaks.co.uk/"},
        {type: "IMG", src: "/battery.png"},
      ],
      interspersed: [
        {type: "YTV", src: "https://www.youtube-nocookie.com/embed/vDHtypVwbHQ"},
        {type: "IMG", src: "/followup_resolved_alert.png"}
      ]
    }
  },
  methods: {
    playlistURL: function() {
      let specific_playlist = SPECIFIC_PLAYLIST_VIEW_REGEX.exec(window.location.pathname);
      if (specific_playlist) {
        return `/api/playlist/${specific_playlist[1]}`
      }
      let specific_screen = SPECIFIC_SCREEN_VIEW_REGEX.exec(window.location.pathname);
      if (specific_screen) {
        return `/api/screens/${specific_screen[1]}`
      }
      return "/api/screens/"
    },
    getPlaylistFromURL: function(path) {
      console.log(path)
    },
  },
  mounted(){
    this.getPlaylistFromURL(this.playlistURL())
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
