<template>
  <div class="map-content">
    <div id="map"></div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import icon from '../assets/icons/iss_small.png';

const API_URL = 'https://api.wheretheiss.at/v1/';
const idIss = 25544;

export default {
  name: 'Map',
  props: {
    realtime: Boolean,
    center: Boolean,
  },
  data() {
    return {
      map: {},
      marker: {},
      error: '',
    };
  },
  watch: {
    realtime() {
      this.changeIssPosition();
    },
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.getIssPosition()
        .then((iss) => {
          this.map = new google.maps.Map(
            document.getElementById('map'), { zoom: 3, center: iss },
          );
          this.marker = new google.maps.Marker({
            position: iss,
            map: this.map,
            icon,
          });
          this.changeIssPosition();
        })
        .catch((error) => {
          this.error = error.message;
        });
    },
    async getIssPosition() {
      return fetch(`${API_URL}satellites/${idIss}`)
        .then(response => response.json())
        .catch((error) => {
          this.error = error;
        })
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          this.$emit('iss', data);
          return {
            lat: data.latitude,
            lng: data.longitude,
          };
        })
        .catch((error) => {
          this.error = error;
        });
    },
    changeIssPosition() {
      if (!this.realtime) return;
      setTimeout(() => {
        this.getIssPosition()
          .then((iss) => {
            const position = new google.maps.LatLng(iss);
            this.marker.setPosition(position);
            if (this.center) this.map.setCenter(position);
            this.changeIssPosition();
          });
      }, 1000);
    },
  },
};
</script>

<style lang="stylus" scoped>
@import "../assets/css/params.styl"

.map-content
  height: 100%
  & #map
    width: 100%
    height: 100%
    min-height: 300px
    max-height: 470px
  & .error
    padding: 8px
    margin: 16px 0
    color: colors.red
    background: rgba(244, 67, 54, .2)
    border-radius: 4px
    border-left: 3px solid colors.red

</style>
