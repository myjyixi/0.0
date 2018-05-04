import index from '../../index.vue'
import eventDetail from './eventDetail.vue'

export default {
  path: '/eventDetail',
  component: index,
  children: [
    {
      path: '',
      component: eventDetail
    }
  ]
}
