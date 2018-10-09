<template>
  <div class="s">
    <ul>
      <li v-for="(item, index) in this.book = this.books.filter(el => {if(el.name == this.$route.query.name) return el})[0]">
        {{index}} : {{item}}
      <a v-if = "index == 'author'" :href="'/author?name=' + book.author"> 작가를 알고 싶다면 클릭하세요</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data (){
    return {
      books: [
        {name: "개미", author: "베르나르 베르베르", 출간일: "1994-07-13"},
        {name: "뇌", author: "베르나르 베르베르", 출간일: "1994-07-13"},
        {name: "제3인류", author: "베르나르 베르베르", 출간일: "1994-07-13"},
        {name: "초보 개발자 괴롭히기", author: "t0dd hong", 출간일: "1994-07-13"}
      ]
    }
  },
  beforeCreate: function() {
    this.$http.get('/api/books')
    .then(res => {
      console.log(res.data)
      if(res.data.status) {
        this.books = res.data.books
      }
    })
  },
  methods: {

  }
}

</script>

<style>
</style>
