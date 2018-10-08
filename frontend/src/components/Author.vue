<template>
  <div class="s">
    <ul>
      <li v-for="(item, index) in this.author = this.authors.filter(el => {if(el.author == decodeURI(this.$route.query.name)) return el})[0]">
        {{index}} : {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    data (){
      return {
        authors: [
            {author: "베르나르 베르베르", book : "뇌, 개미"},
            {author: "t0dd hong", book: "효율적인 개발자 다루기, 초보 개발자 괴롭히기"}
      ]
    }}
}
</script>

<style lang="css">
</style>
