<template>
  <div class="main">
    <div class="menutab">
      <ul>
        <li>로그인</li>
        <li>asdfasdf</li>
        <li>asdfasdf</li>
      </ul>
    </div>
    <div class="top-bar">
      <p>도서관</p>
      <div class="nav-bar">
        <div class="dot-nav">
          <span class="dot-line" @onclick="showMenu"></span>
          <span class="dot-line" @onclick="showMenu"></span>
          <span class="dot-line" @onclick="showMenu"></span>
        </div>
      </div>
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
.menutab{
  position: fixed;
  top: 0;
  right: 0px;
  background-color: #454545;
  width: 30%;
  height: 100%;
  z-index: 1;
  transition: right 0.3;
}
.menutab li{
  color: white;
}
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
.nav-bar {
  width: 60px;
  position: absolute;
  height: 50px;
  top: 22px;
  right: 10px;

  }
  .dot-nav {
    position: absolute;
    right: 20px;
    top: 15px;
  }
  .dot-line {
    display: inline;
    border-style: solid;
    border-bottom: 2px solid;
    color: #454545;
    height: 2px;
    margin: 2px;
  }
  .nav-bar :hover span{
    color: #EA575B
  }
.book-list{
  background-color: yellow;
}
li{
  list-style: none;
}
ul{
  padding: 0;
  margin: 0;
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
