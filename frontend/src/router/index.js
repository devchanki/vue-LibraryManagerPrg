import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index.vue'
import Book from '@/components/Book.vue'
import Author from '@/components/Author.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/book',
      component: Book
    },
    {
      path: '/author',
      component: Author
    }
  ]
})
