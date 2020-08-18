<template>
  <CRow>
      <CCol sm="6" md="3">
        <CWidgetProgressIcon
          :header="users"
          text="User"
          color="info"
          inverse
        >
          <CIcon name="cil-user" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="6" md="3">
        <CWidgetProgressIcon
          :header="kelas"
          text="Kelas"
          color="success"
          inverse
        >
          <CIcon name="cil-dialpad" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="6" md="3">
        <CWidgetProgressIcon
          :header="pelajaran"
          text="Mata Pelajaran"
          color="warning"
          inverse
        >
          <CIcon name="cil-book" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="6" md="3">
        <CWidgetProgressIcon
          :header="berita"
          text="Berita"
          color="primary"
          inverse
        >
          <CIcon name="cil-speech" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
      
    </CRow>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Dashboard',
  data () {
    return {
      users: '',
      kelas: '',
      pelajaran: '',
      berita: '',
    }
  },
  mounted(){
    this.pesan()
    this.getData()
  },
  computed: {
    ...mapGetters({
      'user':'auth/user'
    }),
    
  },
  methods: {
    ...mapActions({
      setAuth: 'auth/set'
    }),
    pesan(){
      if(this.$route.params.foo){
        this.$notify({
          group: 'foo',
          type: 'info',
          title: 'Welcome',
          text: this.$route.params.foo,
          duration: 3000,
        })
      }
    },
    getData(){
      let config = {
      headers:{
        'Authorization' : 'Bearer ' + this.user.token
      }
    }
    this.axios.get('', config)
        .then((response) => {
          let values = response.data.values
          this.users =  values.user.toString()
          this.pelajaran = values.pelajaran.toString()
          this.kelas = values.kelas.toString()
          this.berita = values.berita.toString()
        })
        .catch((error) => {
          const code = error.response.data.code
          if(code == 401){
            this.setAuth({})
            this.$router.push({name: 'Login'})
          }else{
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Error',
              text: error.response.data.message,
              duration: 3000,
            })
          }
          
        })
    }
  }
}
</script>
