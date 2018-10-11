<template>
  <div class="s">
    <ul>
      <li v-for="(item, index) in book" v-if="index !== 'author' ">
        {{index}} : {{item}}
      <li v-else>
        {{index}} : {{item.author}}
      <a v-if = "index == 'author'" :href="'/author?id=' + book.author._id"> 작가를 알고 싶다면 클릭하세요</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data (){
    return {
      book: []
    }
  },
  beforeCreate: function() {
    this.$http.get('/api/book/' + this.$route.query.id)
    .then(res => {
      console.log(res.data)
      if(res.data.status) {
        this.book = res.data.book
      }
    })
  },
  methods: {

  }
}

</script>

<style>
</style>
