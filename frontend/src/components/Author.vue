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
  </div>
</template>

<script>
export default {
  data (){
    return {
      author: null
    }
  },
  beforeCreate: function() {
    this.$http.get('/api/author/' + this.$route.query.id)
    .then(res => {
      console.log(res.data)
      if(res.data.status) {
        this.author = res.data.author
        console.log("북")
      }
    })
  }
}
</script>

<style lang="css">
  *{
    margin: 0;
    padding: 0;
  }
  #app{
    margin: 0;
  }
  .top-bar{
    width: 100%;
    height: 100px;
    background-color: lightblue;
  }
  .top-bar p{
    padding-top: 40px;
    font-size: 1.5em;
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
  .card a{
    color: white;
  }
</style>
