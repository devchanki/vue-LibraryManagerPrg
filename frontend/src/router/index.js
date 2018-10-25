import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index.vue'
import Book from '@/components/Book.vue'
import Author from '@/components/Author.vue'
import SignUp from '@/components/SignUp.vue'
import SignIn from '@/components/SignIn.vue'
import BookLent from '@/components/BookLent.vue'

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
    },
    {
      path: '/signup',
      component: SignUp
    },
    {
      path: '/signin',
      component: SignIn
    },
    {
      path: '/booklent',
      component: BookLent
    },
  ]
})
