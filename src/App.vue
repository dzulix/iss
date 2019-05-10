<template>
  <div id="app">
    <Main/>
  </div>
</template>

<script>
import Main from './components/Main.vue';

export default {
  name: 'app',
  components: {
    Main,
  },
};
</script>
<style lang="stylus">

*
  box-sizing: border-box

html, body
  height: 100%
  max-height: 100%

body
  margin: 0;
  font-family: Arial, Helvetica, sans-serif

#app
  height: 100%
</style>
