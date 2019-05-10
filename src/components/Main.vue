<template>
  <div class="main">
    <header>Where is ISS?</header>
    <div class="main-content">
      <aside class="side-menu">
        <label for="center">
          <input id="center" type="checkbox" value="Center ISS" v-model="center">
          {{ texts.center_iss }}
        </label>

        <button @click="realtime = !realtime" :class="{ 'realtime': !realtime }">
          {{ realtime ? texts.pause_updates : texts.resume_updates }}
        </button>

        <p v-if="iss.latitude"><b>Latitude:</b> {{ iss.latitude }}</p>
        <p v-if="iss.longitude"><b>Longitude:</b> {{ iss.longitude }}</p>
        <p v-if="iss.altitude"><b>Altitude:</b> {{ iss.altitude }}</p>

      </aside>
      <section class="content">
        <Map :realtime="realtime" :center="center" v-on:iss="setIss"/>
      </section>
    </div>

    <footer>{{ texts.email }}</footer>
  </div>
</template>

<script>
import Map from './Map.vue';
import texts from '../assets/texts/main';

export default {
  name: 'Main',
  components: { Map },
  data() {
    return {
      realtime: true,
      center: true,
      texts,
      iss: {},
    };
  },
  methods: {
    setIss(iss) {
      this.iss = iss;
    },
  },
};

</script>

<style scoped lang="stylus">
@import "../assets/css/params.styl"

.main
  column()
  height: 100%

  header
    row(center,center)
    background: colors.primary
    padding: 16px
    color: white
    font-size: 1.5em
    width: 100%
    height: 60px

  & .main-content
    row()
    height: 100%
    flex-wrap: wrap

    & .side-menu
      column(flex-start, center)
      background: #eee
      width: 15%
      min-width: 200px
      padding: 16px
      flex-grow: 1
      & > button
        width: 100%
        color: white
        background: colors.red
        margin: 16px 8px
        padding: 8px
        border-radius: 4px
        border: none
        &.realtime
          background: colors.green
        &:hover
          opacity: .7
        &:focus
          outline: none
      & > p
        width: 100%
        text-align: left
        padding: 8px
        margin: 0
        &:nth-child(odd)
          background: #fbfbfb
          border-top: .5px solid #aaa
          border-bottom: .5px solid #aaa
        &:nth-child(even)
          background: #d9d9d9

    & > .content
      min-width: 400px
      padding: 16px
      flex-grow: 2

  & > footer
    row(center,center)
    font-size: .8em
    background: #ccc
    width: 100%
    height: 50px

</style>
