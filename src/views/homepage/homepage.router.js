import index from '../index.vue'
import homepage from './homepage.vue'

export default {
  path: '/homepage',
  component: index,
  children: [
    {
      path: '',
      component: homepage
    }
  ]
}
