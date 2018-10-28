<template>
  <div class="main">
    <div class="menutab-close">
      <button class = "hide-menu-button" type="button" v-on:click="hidemenu">메뉴 숨기기</button>
      <a href="/signin" v-if="loginCheck" class="login">로그인</a>
      <a v-on:click="logout" v-else class="logout">로그아웃</a>
      <ul>
        <li v-if="!loginCheck">{{userName.split("#")[0]}}님 환영합니다.</li>
        <li v-if="!loginCheck">{{userBookLent}}권 빌리셨습니다.</li>
        <a href="/">메인화면으로 가기</a>
      </ul>
    </div>
    <div class="top-bar">
      <p>책 현황</p>
      <div class="nav-bar">
        <div class="dot-nav" v-on:click="showmenu">
          <span class="dot-line" ></span>
          <span class="dot-line" ></span>
          <span class="dot-line" ></span>
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
            <button class="Lent-Button" v-if="userBookLent <= lentLimit"  v-on:click='lent(book.name.split(" ").map(el => el[0].toUpperCase() + el.slice(1)).join(" "))'>책 빌리기</button>
            <button class="Lent-Unavailable" v-else>빌릴 수 없습니다.</button>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data (){
    return {
      books: [],
      userName: String,
      lentLimit: 5,
      userInfo: [],
      admin: Boolean,
      userBookLent: Number
    }
  },
  beforeCreate: function() {
    this.$http.get('/api/books/')
    .then(res => {
      console.log(res.data)
      if(res.data.status) {
        this.books = res.data.books
        this.userName = window.localStorage.libraryManager
      }
    })
  },
  methods: {
   showmenu: function (event) {
     document.getElementsByClassName("menutab-close")[0].className="menutab-open";
   },
   hidemenu: function (event) {
   document.getElementsByClassName("menutab-open")[0].className="menutab-close";
   },
   logout: function(event){
     localStorage.removeItem('libraryManager');
     location.reload();
   },
   lent: function(bookname){
       // this.$http.post('/api/booklent/', {
       //   book: bookname,
       //   borrower: userName.split('#')[0]
       //   rentDate: (현재 서버 시간)
//          returnDueDate: 현재서버시간 + 7
       // })
     }
  },
  computed: {
      loginCheck: function () {
        if(!window.localStorage.libraryManager){
          return true;
        }
        else{
          return false;
        }
      },
    }
}
</script>

<style scoped>
.menutab-close{
  position: fixed;
  top: 0;
  right: -300px;
  background-color: #454545;
  width: 300px;
  height: 100%;
  z-index: 1;
  transition: right, 0.5s;
}
.hide-menu-button{
  padding: 8px 10px;
  color: #454545;
  background-color: white;
  margin: 10px 0 0 200px;
  border-radius: 8px;
}
.menutab-open{
  position: fixed;
  top: 0;
  right: 0px;
  background-color: #454545;
  width: 300px;
  height: 100%;
  z-index: 1;
  transition: right, 0.5s;
}

.menutab-close li,.menutab-open li{
  color: white;
}
.menutab-close a,.menutab-open a{
  color: white;
  text-decoration: none;
}
.login{
  color: white;
  display: inline-block;
  padding: 10px 30px;
  background-color: #0092ff;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
}
.logout{
  color: white;
  display: inline-block;
  padding: 10px 30px;
  background-color: #0092ff;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
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
  padding : 10px;
  margin: 8px;
  display: inline-block;
}
.card1 a{
  color: white;
}
.card1:hover{
  background:#EA575B;
}
.Lent-Button{
  width: 100px;
  height: 40px;
  background-color: #0092ff;
  outline: none;
  font-size: 15px;
  border-radius: 5px;
}
.Lent-Unavailable{
  width: 200px;
  height: 40px;
  background-color: #EA575B;
  outline: none;
  font-size: 15px;
  border-radius: 5px;
}
</style>
