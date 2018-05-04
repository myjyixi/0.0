import index from '../index.vue'
import eventManager from './eventManager.vue'

export default {
  path: '/eventManager',
  component: index,
  children: [
    {
      path: '',
      component: eventManager
    }
  ]
}
