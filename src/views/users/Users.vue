<template>
  <div>
    <CCard>
        <CCardHeader>
          <CIcon name="cil-justify-center"/>
          <strong> Data Users</strong>
          <CButton 
            size="sm"
            style="float:right;" 
            color="primary"
            to="/users/create">
            Tambah Data
          </CButton>
        </CCardHeader>
        <CCardBody>
          <div>
            <CDataTable
              :items="items"
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
              <template #show_details="{item, index}">
                <td class="py-2">
                  <CButton
                    color="primary"
                    variant="outline"
                    square
                    size="sm"
                    @click="toggleDetails(index)"
                  >
                    {{details.includes(index) ? 'Hide' : 'Show'}}
                  </CButton>
                </td>
              </template>
              <template #details="{item, index}">
                <CCollapse :show="details.includes(index)">
                  <CCardBody>
                      <div style="float:left; margin-right:20px;">
                        <CImg
                          :src="getFoto(item.foto)"
                          block
                          width="200px"
                          height="220px"
                          class="mb-2"
                        />
                      </div>
                      <div>
                        <p class="text-muted">Nama: {{item.nama}}</p>
                        <p class="text-muted">Username: {{item.username}}</p>
                        <p class="text-muted">E-mail: {{item.email}}</p>
                        <p class="text-muted">Role: {{item.role}}</p>
                        <p class="text-muted">Handphone: {{item.no_handphone}}</p>
                        <CButton size="sm" color="info" class="ml-1" @click="edit(item.id_user)">
                          <CIcon name="cil-pencil"></CIcon>
                        </CButton>
                        <CButton size="sm" color="danger" class="ml-1" @click="destroy(item.id_user, item.nama)">
                          <CIcon name="cil-trash"></CIcon>
                        </CButton>
                      </div>
                      
                  </CCardBody>
                </CCollapse>
              </template>
            </CDataTable>
          </div>
        </CCardBody>
      </CCard>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Users',
  data () {
    return {
      urlFoto: 'http://192.168.43.116:8081/foto_user/',
      items: [],
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
          label: '', 
          _style: 'width:1%', 
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
    getData(){
      let config = {
      headers:{
        'Accept': 'application/json, text/plain, */*',
        'Authorization' : 'Bearer ' + this.user.token
      }
    }
    this.axios.get('users', config)
        .then((response) => {
          let values = response.data.values
          this.items = values
          this.loading = false
        })
        .catch((error) => {
          const code = error.response.data.code
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
    toggleDetails (index) {
      const position = this.details.indexOf(index)
      position !== -1 ? this.details.splice(position, 1) : this.details.push(index)
    },
    getFoto(data){
      if(data != null){
        return this.urlFoto + data
      }else{
        return "placeholder.jpg"
      }
      
    },
    edit(id){
      this.$router.push({ name: 'Edit User', params: { id: id } });
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
    destroy(id, data){
      this.$swal({
        title: "Hapus Data",
        text: `Anda Yakin Ingin Menghapus User ${data} ini?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Hapus!"
      }).then((result) => {
          if(result.value) {
            let config = {
              headers:{
                'Authorization' : 'Bearer ' + this.user.token
              }
            }
            this.axios.delete('users/destroy/' + id, config)
                .then((response) => {
                  this.getData()
                  this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: 'Success',
                    text: response.data.message,
                    duration: 3000,
                  })
                })
                .catch((error) => {
                  this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: 'Error',
                    text: error.response.data.message,
                    duration: 3000,
                  })
                })
          }
      })
    }
  }
}
</script>
