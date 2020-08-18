<template>
<CHeaderNavItem class="d-md-down-none mx-2" >
        <CDropdown
          inNav
          class="c-header-nav-items"
          placement="bottom-end"
          add-menu-classes="pt-0"
        >
        <template #toggler >
          <CHeaderNavLink>
            <CIcon name="cil-bell"/>
              <span class="badge badge-danger badge-up">{{count}}</span>
          </CHeaderNavLink>
        </template>
          <CDropdownHeader tag="div" class="text-center" color="light" >
            <strong>Verifikasi User</strong>
          </CDropdownHeader>
          <div v-for="notif in notification">
            <CDropdownItem @click="show(notif.id_user, notif.role)">
                <a class="dropdown-item" href="#">
                <div class="message">
                <div class="py-3 mfe-3 float-left">
                    <div class="c-avatar">
                    <img class="c-avatar-img" :src="getFoto(notif.foto)" alt="user@email.com">
                    </div>
                </div>
                <div><small class="text-muted">{{notif.email}}</small><small class="text-muted float-right mt-1">{{notif.role}}</small></div>
                <div class="font-weight-bold">{{notif.nama}} <br><small class="text-muted">{{notif.username}}</small> </div>
                <div class="small text-truncate" style="color:transparent;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</div>
                </div>
                </a>
            </CDropdownItem>
          </div>
          <a class="dropdown-item text-center border-top" href="#" @click="semua()" v-if="count != 0"><strong>Lihat Semua</strong></a>
        </CDropdown>
      </CHeaderNavItem>
   
    
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
   data () {
    return {
      urlFoto: 'http://192.168.43.116:8081/foto_user/',
      itemsCount: 42,
      warningModal: false,
      notification: [],
      count: 0
    }
  },
  mounted(){
    this.getNotif()
  },
  computed: {
    ...mapGetters({
      'user':'auth/user'
    }),
  },
  methods:{
   getFoto(data){
      if(data != null){
        return this.urlFoto + data
      }else{
          return "placeholder.jpg"
      }
      
    },
    getNotif(){
      let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
        this.axios.get('users/notifikasi', config)
        .then((response) => {
            let values = response.data.values.data
            if(values.length == 0){
                this.notification = {}
                this.count = 0
            }else{
                this.notification = values
                this.count = response.data.values.count
            }
            
          })
          .catch(error => {
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Error',
              text: error.response.data.message,
              duration: 3000,
            })
          });
    },
    show(id, data){
        let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
       
        this.axios.get('users/verifikasi/update/' + id, config)
        .then((response) => {
            let values = response.data.values.data
            if(data == 'SISWA'){
                this.$router.push({ name: 'Detail Verifikasi Siswa', params: { id: id } });
            }else{
                this.$router.push({ name: 'Detail Verifikasi Guru', params: { id: id } });
            }
     
            this.getNotif()
          })
          .catch(error => {
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Error',
              text: error.response.data.message,
              duration: 3000,
            })
          });
        
    },
    semua(){
        let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
        let formData = new FormData();
        formData.append('id', null)
        this.axios.get('users/verifikasi/updateall', config)
        .then((response) => {
            let values = response.data.values.data
            this.$router.push({ name: 'Verifikasi Akun' });
            this.count = 0
            this.getNotif()
          })
          .catch(error => {
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Error',
              text: error.response.data.message,
              duration: 3000,
            })
          });
        
    }
  }
}
</script>