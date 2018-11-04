<template>
  <div class="main">
    <div class="menutab-close">
      <button class = "hide-menu-button" type="button" v-on:click="hidemenu">메뉴 숨기기</button>
      <a href="/signin" v-if="loginCheck" class="login">로그인</a>
      <a v-on:click="logout" v-else class="logout">로그아웃</a>
      <ul>
        <li v-if="!loginCheck">{{userName.split("#")[0]}}님 환영합니다.</li>
        <a href="/">메인화면으로 가기</a>
        <a href="/booklent">책 빌리기</a>
      </ul>
    </div>
    <div class="top-bar">
      <p>{{book.name.split(" ").map(el => el[0].toUpperCase() + el.slice(1)).join(" ")}}</p>
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
        <p>책 이름 :   {{book.name.split(" ").map(el => el[0].toUpperCase() + el.slice(1)).join(" ")}}</p>
        <p>작가 : <a :href="'/author?id=' + book.author._id">{{book.author.name}}</a> </p>
        <p>장르 : {{book.genre}}</p>
        <p>책 출간일 : {{book.writtenDate.split('T')[0]}}</p>
      </ul>
    </div>
  </div>
</template>

<script>
import Menu from './Menu'
export default {
  data (){
    return {
      book: [],
      userName: String
    }
  },
  beforeCreate: function() {
    this.$http.get('/api/book/' + this.$route.query.id)
    .then(res => {
      console.log(res.data)
      if(res.data.status) {
        this.book = res.data.book
        this.userName =  window.localStorage.libraryManager
      }
    })
  },methods: {
   showmenu: function (event) {
     // 메소드 안에서 사용하는 `this` 는 Vue 인스턴스를 가리킵니다
     document.getElementsByClassName("menutab-close")[0].className="menutab-open";
   },
   hidemenu: function (event) {
   // 메소드 안에서 사용하는 `this` 는 Vue 인스턴스를 가리킵니다
   document.getElementsByClassName("menutab-open")[0].className="menutab-close";
   },
   logout: function(event){
     localStorage.removeItem('libraryManager');
     location.reload();
   }
  },
  computed: {
      // 계산된 getter
      loginCheck: function () {
        if(!window.localStorage.libraryManager){
          return true;
        }
        else{
          return false;
        }
      },
    },
    components: {
      Menu
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

.menutab-close li, .menutab-open li{
  list-style: none;
  color: white;
}
.menutab-close ul, .menutab-open ul{
  text-align: center;
}
.menutab-close ul a, .menutab-open ul a{
  color: white;
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
  .card{
    background-color: #454545;
    display: inline-flex;
    color: white;
    border-radius: 8px;
    padding: 20px 40px;
    margin: 40px;
  }
  .card ul{
    padding: 0;
  }
  .main{
    background-color: rgb(232, 234, 237);
  }
  .card a{
    color: white;
  }
</style>
