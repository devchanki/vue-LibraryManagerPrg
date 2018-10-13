<template>
  <div class="main">
    <div class="top-bar">
      <p>책 제목</p>
    </div>
    <div class="card">
      <ul>
        <p>책 이름 :   {{book.name}}</p>
        <p>작가 : <a :href="'/author?id=' + book.author._id">{{book.author.name}} </a> </p>
        <p>장르 : {{book.genre}}</p>
        <p>책 출간일 : {{book.writtenDate.split('T')[0]}}</p>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data (){
    return {
      book: []
    }
  },
  beforeCreate: function() {
    this.$http.get('/api/book/' + this.$route.query.id)
    .then(res => {
      console.log(res.data)
      if(res.data.status) {
        this.book = res.data.book
      }
    })
  },
  methods: {

  }
}

</script>

<style>
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
