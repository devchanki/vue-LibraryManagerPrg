<template>
  <div class="main">
    <div class="top-bar">
      <p>도서관</p>
    </div>
    <div class="card">
      <ul>
          <li v-for="book in books">
            <a :href="'/book?id=' + book._id" class="card1">
              {{
                book.name.split(" ").map(el => el[0].toUpperCase() + el.slice(1)).join(" ")
              }}
            </a>
          </li>
      </ul>
    </div>
  </div>
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

<style scoped>
.top-bar{
  width: 100%;
  height: 100px;
  background-color: lightblue;
}
.top-bar p{
  padding-top: 40px;
  margin: 0;
  font-size: 1.5em;
}
.book-list{
  background-color: yellow;
}
li{
  list-style: none;
}
.card{
  background-color: rgb(232, 234, 237);
  display: inline-flex;
  border-radius: 8px;
  padding: 20px 40px;
  margin: 40px;
}
.main{
  background-color: rgb(232, 234, 237);
}
.card1{
  background-color: #454545;
  color: white;
  border-radius: 7px;
  padding : 8px;
  margin: 8px;
  display: block;
}
.card1 a{
  color: white;
}
.card1:hover{
  background:#EA575B;
}
</style>
