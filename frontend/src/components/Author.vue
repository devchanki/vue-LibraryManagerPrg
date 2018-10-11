<template>
  <div class="s">
    <ul>
      <li v-for="(item, index) in author" >
        {{index}} : {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data (){
    return {
      author: []
    }
  },
  beforeCreate: function() {
    this.$http.get('/api/author/' + this.$route.query.id)
    .then(res => {
      console.log(res.data)
      if(res.data.status) {
        this.author = res.data.author
        console.log("북")
      }
    })
  }
}
</script>

<style lang="css">
</style>
