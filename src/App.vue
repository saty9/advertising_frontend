<template>
  <div id="app">
    <Playlist v-if="items.length || hasInterspersed"
              :key="current_playlist + '|' + playlist_last_updated"
              :items="items" :interspersed="interspersed"/>
  </div>
</template>

<script>
import axios from "axios"
import Playlist from "./components/Playlist";
const SPECIFIC_SCREEN_VIEW_REGEX = /^\/screen\/(\d+)$/
const SPECIFIC_PLAYLIST_VIEW_REGEX = /^\/playlist\/(\d+)$/

//const displaytime = 3_000;
export default {
  name: 'App',
  components: {
    Playlist,
  },
  data: function () {
    return {
      items: [],
      interspersed: {playlist: null, screen: null},
      current_playlist: -1,
      playlist_last_updated: "",
      polling: null,
    }
  },
  computed: {
    hasInterspersed() {
      let i = this.interspersed;
      return !!(i && ((i.playlist && i.playlist.items.length) || (i.screen && i.screen.items.length)))
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
        return `/api/screen/${specific_screen[1]}`
      }
      return "/api/screen/"
    },
    getPlaylistFromURL: function(path) {
      let self = this;
      axios.get(path).then((response) => {
        self.items = response.data.playlist;
        self.interspersed = response.data.interspersed || {playlist: null, screen: null};
        self.current_playlist = response.data.current_playlist;
        self.playlist_last_updated = response.data.playlist_last_updated;
      }).catch(err => {
        console.error(err)
      })
    },
    checkForChanges: function() {
      let self = this;
      axios.get("/api/meta").then((response) => {
        let change = response.data.current_playlist !== self.current_playlist;
        change = change || (response.data.playlist_last_updated !== self.playlist_last_updated);
        if (change) {
          self.getPlaylistFromURL(self.playlistURL());
        }
      })
    }
  },
  mounted(){
    this.getPlaylistFromURL(this.playlistURL());
    this.polling = setInterval(this.checkForChanges,60000);
  },
  beforeDestroy () {
    clearInterval(this.polling)
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
