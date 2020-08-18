import '@fortawesome/fontawesome-free/css/all.min.css'
// import 'bootstrap-css-only/css/bootstrap.min.css'
// import 'mdbvue/lib/css/mdb.min.css'
// Require Froala Editor js file.
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'

import 'core-js/stable'
import Vue from 'vue'
import './plugins/axios'
import App from './App'
import router from './router'
import store from './store/index'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import VueSweetalert2 from 'vue-sweetalert2';
import Notifications from 'vue-notification'
import Select2 from 'v-select2-component'
import VueFroala from 'vue-froala-wysiwyg'
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false
Vue.use(CoreuiVue)
Vue.use(VueSweetalert2)
Vue.use(Notifications)
Vue.use(VueFroala)
Vue.component('Select2', Select2)


new Vue({
  router,
  store,
  icons,
  render: h => h(App)
}).$mount('#app')
