<template>
  <div>
    <CCard>
        <CCardHeader>
          <CIcon name="cil-justify-center"/>
          <strong> Verifikasi Guru</strong>
        </CCardHeader>
        <CCardBody>
          <CTabs add-tab-classes="mt-1">
              <CTab>
                <template slot="title">
                  <i class="fa fa-user"></i> {{tabs[0]}}
                </template>
                <br/>
                <CDataTable
                    :items="itemsBelum"
                    :fields="fields"
                    column-filter
                    :loading="loading"
                    table-filter
                    items-per-page-select
                    :items-per-page="5"
                    hover
                    sorter
                    pagination
                  >
                    <template #show_details="{item}">
                      <td class="py-2">
                        <CButton size="sm" color="info" class="ml-1" @click="terima(item.id_user, item.nama)">
                          <i class="fa fa-check"></i>
                        </CButton>
                        <CButton size="sm" color="danger" class="ml-1" @click="tolak(item.id_user, item.nama)">
                          <i class="fa fa-times"></i>
                        </CButton>
                        <CButton size="sm" color="primary" class="ml-1" @click="show(item.id_user)">
                          <i class="fa fa-eye" style="height:15px; width:15px;"></i>
                        </CButton>
                      </td>
                    </template>
                  </CDataTable>
              </CTab>
              <CTab>
                <template slot="title">
                  <i class="fa fa-times"></i> {{tabs[1]}}
                </template>
                <CDataTable
                    :items="itemsDitolak"
                    :fields="fields"
                    column-filter
                    :loading="loading"
                    table-filter
                    items-per-page-select
                    :items-per-page="5"
                    hover
                    sorter
                    pagination
                  >
                    <template #show_details="{item}">
                      <td class="py-2">
                        <CButton size="sm" color="info" class="ml-1" @click="terima(item.id_user, item.nama)">
                          <i class="fa fa-check"></i>
                        </CButton>
                        <CButton size="sm" color="primary" class="ml-1" @click="show(item.id_user)">
                          <i class="fa fa-eye" style="height:15px; width:15px;"></i>
                        </CButton>
                      </td>
                    </template>
                  </CDataTable>
              </CTab>
              <CTab>
                <template slot="title">
                  <i class="fa fa-check"></i> {{tabs[2]}}
                </template>
                <CDataTable
                    :items="itemsDiterima"
                    :fields="fields"
                    column-filter
                    :loading="loading"
                    table-filter
                    items-per-page-select
                    :items-per-page="5"
                    hover
                    sorter
                    pagination
                  >
                    <template #show_details="{item}">
                      <td class="py-2">
                        <center>
                          <CButton size="sm" color="primary" class="ml-1" @click="show(item.id_user)">
                            <i class="fa fa-eye" style="height:15px; width:15px;"></i>
                          </CButton>
                        </center>
                      </td>
                    </template>
                  </CDataTable>
              </CTab>
            </CTabs>
          <div>
          </div>
        </CCardBody>
      </CCard>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Guru',
  data () {
    return {
      tabs: [
        'Belum Verifikasi',
        'Verifikasi Ditolak',
        'Verifikasi Diterima'
      ],
      activeTab: 1,
      itemsBelum: [],
      itemsDiterima: [],
      itemsDitolak:[],
      loading:true,
      fields: 
      [
        { 
          key:'nama',
          _style: 'width:30%' 
        },
        {
          key:'username'
        },
        {
          key:'email'
        },
        { 
          key:'role'
        },
        { 
          key: 'show_details', 
          label: 'Action', 
          _style: 'width:15%', 
          sorter: false, 
          filter: false
        }
      ],
      details: [],
      data: this.user
    }
  },
  mounted(){
    this.pesan()
    this.getDataBelum()
    this.getDataTolak()
    this.getDataTerima()
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
    getDataTerima(){
      let config = {
        headers:{
          'Authorization' : 'Bearer ' + this.user.token
        }
      }
    this.axios.get('guru/1', config)
        .then((response) => {
          let values = response.data.values
          // console.log(values)
          this.itemsDiterima = values
          this.loading = false
        })
        .catch((error) => {
          const code = error.response.data.code
          this.loading = false
          if(code == 400){
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
    },
    getDataBelum(){
      let config = {
        headers:{
          'Authorization' : 'Bearer ' + this.user.token
        }
      }
    this.axios.get('guru/0', config)
        .then((response) => {
          let values = response.data.values
          this.itemsBelum = values
          this.loading = false
        })
        .catch((error) => {
          const code = error.response.data.code
          this.loading = false
          if(code == 400){
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
    },
    getDataTolak(){
      let config = {
        headers:{
          'Authorization' : 'Bearer ' + this.user.token
        }
      }
    this.axios.get('guru/2', config)
        .then((response) => {
          let values = response.data.values
          this.itemsDitolak = values
          this.loading = false
        })
        .catch((error) => {
          const code = error.response.data.code
          this.loading = false
          if(code == 400){
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
    },
    getFoto(data){
      if(data != null){
        return this.urlFoto + data
      }else{
        return "placeholder.jpg"
      }
      
    },
    terima(id, data){
      this.$swal({
        title: "Terima Verifikasi Data",
        text: `Anda Yakin Ingin Menerima Verifikasi Data ${data} ini?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Terima"
      }).then((result) => {
          if(result.value) {
            let config = {
        headers:{
          'Authorization' : 'Bearer ' + this.user.token
        }
      }
    this.axios.get('users/terima/' + id, config)
        .then((response) => {
          let message = response.data.message
          this.$notify({
              group: 'foo',
              type: 'success',
              title: 'Berhasil',
              text: message,
              duration: 3000,
          })

          this.getDataBelum()
          this.getDataTolak()
          this.getDataTerima()
        })
        .catch((error) => {
          const code = error.response.data.code
          this.loading = false
          if(code == 400){
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
      })
    },
    tolak(id, data){
      this.$swal({
        title: "Tolak Verifikasi Data",
        text: `Anda Yakin Ingin Menolak Verifikasi Data ${data} ini?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Tolak"
      }).then((result) => {
          if(result.value) {
            let config = {
        headers:{
          'Authorization' : 'Bearer ' + this.user.token
        }
      }
    this.axios.get('users/tolak/' + id, config)
        .then((response) => {
          let message = response.data.message
          this.$notify({
              group: 'foo',
              type: 'success',
              title: 'Berhasil',
              text: message,
              duration: 3000,
          })

          this.getDataBelum()
          this.getDataTolak()
          this.getDataTerima()
        })
        .catch((error) => {
          const code = error.response.data.code
          this.loading = false
          if(code == 400){
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
      })
    },
    show(id){
      this.$router.push({ name: 'Detail Verifikasi Guru', params: { id: id } });
    },
    pesan(){
      if(this.$route.params.foo){
        this.$notify({
          group: 'foo',
          type: 'info',
          title: 'Info',
          text: this.$route.params.foo,
          duration: 3000,
        })
      }
    },
  }
}
</script>
