<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  destroyed: function() {
    localStorage.removeItem('libraryManager')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
html{
  background-color: rgb(232, 234, 237);
}
body{
  padding: 0;
  margin: 0;
}

</style>
