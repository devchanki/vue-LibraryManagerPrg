<template>
  <ul>
    <li v-for="book in books">
     {{ book.name }}
     <a :href="'/book?name=' + book.name">자세한 정보를 보고 싶나요? </a>
   </li>
  </ul>
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
  }}
}
</script>

<style lang="css">
</style>
