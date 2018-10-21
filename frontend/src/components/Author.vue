<template>
  <div class="main">
    <div class="top-bar">
      <p>{{author.name}}</p>
    </div>

    <div class="card">
      <ul>
        <p>작가의 이름 : {{author.name}}</p>
        <p>작가의 생년월일 : {{author.birthDate.split("T")[0]}}</p>
      </ul>
    </div>

    <div class="card">
      <div class="author-books">
        <div v-if="books.length == 0" >
          <p>작가는 다른 작품이 없습니다.</p>
        </div>
        <div v-else>
          <p class="author-books-top">작가의 다른 도서들입니다.</p>
          <ul>
              <a :href="'/book?id=' + books[key]._id" class="card1" v-for="(value, key) in books"> {{books[key].name.split(" ").map(el => el[0].toUpperCase() + el.slice(1)).join(" ")}}</a>
          </ul>
        </div>
      </div>
    </ul>
    </div>
  </div>
</template>

<script>
export default {
  data (){
    return {
      author: null,
      books: []
    }
  },
  beforeCreate: function() {
    this.$http.get('/api/author/' + this.$route.query.id)
    .then(res => {
      console.log(res.data)
      if(res.data.status) {
        this.author = res.data.author,
        this.books = res.data.books
      }
    })
  }
}
</script>

<style scoped>

  .top-bar{
    width: 100%;
    height: 100px;
    background-color: lightblue;
  }
  .top-bar p{
    padding-top: 40px;
    font-size: 1.5em;
    margin: 0px;
  }
  .card{
    background-color: #454545;
    display: inline-flex;
    color: white;
    border-radius: 8px;
    padding: 20px 40px;
    margin: 40px;
  }
  .main{
    background-color: rgb(232, 234, 237);
  }

  .author-books-top{
    margin: 10px;
    font-size: 25px;
  }
  .card ul{
    padding: 0;
  }
  .card1{
    color: black;
    background-color: rgb(232, 234, 237);
    border-radius: 7px;
    padding : 8px;
    margin: 8px;
    display: block;
  }
  .card1:hover {
  background:#EA575B;
}

</style>
