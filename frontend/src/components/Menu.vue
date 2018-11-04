<template>
  <div class="menutab-close">
    <button class = "hide-menu-button" type="button" v-on:click="hidemenu">메뉴 숨기기</button>
      <a href="/signin" v-if="loginCheck" class="login">로그인</a>
      <a v-on:click="logout" v-else class="logout">로그아웃</a>
    <ul>
      <li v-if="!loginCheck">{{userName.split("#")[0]}}님 환영합니다.</li>
      <li v-if="!loginCheck">{{userBookLent}}권 빌리셨습니다.</li>
      <a href="/" class="menuLink">메인화면으로 가기</a>
      <a href="/booklent" class="menuLink">책빌리러가기</a>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Article'
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
</style>
