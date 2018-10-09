<template>
  <ul>
    <li v-for="book in books">
     {{ book.name }}
     <a :href="'/book?id=' + book._id">자세한 정보를 보고 싶나요? </a>
   </li>
  </ul>
</template>

<script>
export default {
  data (){
    return {
      books: []
    }
  },
  beforeCreate: function() {
    this.$http.get('/api/books/')
    .then(res => {
      console.log(res.data)
      if(res.data.status) {
        this.books = res.data.books
      }
    })
  },
}
</script>

<style lang="css">
</style>
