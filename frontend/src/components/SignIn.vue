<template>
  <div class="main">
    <div class="top-bar">
      <p>로그인</p>
    </div>

    <div class="card">
      <p>로그인</p>
      <input type="email" v-model="id" placeholder="이메일">
      <input type="password" v-model="pass" placeholder="비밀번호">
      <div class="button" @click="signin">Sign In</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      pass: '',
      error: []
    }
  },
  methods: {
    signin: function(){
        this.$http.post('/api/signin/', {
          email: this.id,
          password: this.pass
        })
        .then(res => {
          console.log(res.data)
          if(res.data.status) {
            alert('로그인 성공')
            location.reload()
          } else {
            alert('실패')
            location.reload()
          }
        })
      }
    }}

</script>

<style scoped>
.main {
  text-align: center;
}
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
  display: inline-block;
  text-align: center;
  width: 400px;
  background-color: #454545;
  padding: 50px;
  border-radius: 8px;
  margin-top: 100px;
}
.card p{
  padding: 5px;
  margin:0;
  color: white;
  font-size: 22px;
}
input:focus {
outline: none;
}
.card input{
  padding: 10px;
  width: 300px;
  decoration: none;
  background-color: #fff;
  display: inline-block;
  margin-top: 15px;
  border-radius: 5px;
  font-size: 14px;
}
.card div{
  padding: 10px;
  width: 300px;
  background-color: #0092ff;
  display: inline-block;
  margin-top: 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 30px;
  font-weight: 700;
  color: white;
}

</style>
