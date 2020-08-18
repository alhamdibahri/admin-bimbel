<template>
  <div>
    <CCard>
        <CCardHeader>
          <CIcon name="cil-justify-center"/>
          <strong> Data Berita</strong>
          <CButton 
            size="sm"
            style="float:right;" 
            color="primary"
            to="/berita/create">
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
                  {{ index+1 }}
                </td>
              </template>
              <template #action="{item}">
                <td class="py-2">
                  <CButton size="sm" color="info" class="ml-1" @click="edit(item.id_berita)">
                    <CIcon name="cil-pencil"></CIcon>
                  </CButton>
                  <CButton size="sm" color="danger" class="ml-1" @click="destroy(item.id_berita, item.judul_berita)">
                    <CIcon name="cil-trash"></CIcon>
                  </CButton>
                </td>
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
      items: [],
      loading:true,
      fields: 
      [
        { 
          key: 'show_details', 
          label: 'No',  
          sorter: false, 
          filter: false
        },
        {
          key:'kategori_berita', 
          filter: false
        },
        {
          key:'judul_berita', 
          filter: false
        },
        {
          key:'tanggal_berita', 
          filter: false
        },
        {
          key:'nama',
          label:'Uploader', 
          filter: false
        },
        { 
          key: 'action', 
          label: 'Action',  
          sorter: false, 
          filter: false,
           _style: 'width:15%'
        },
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
        'Authorization' : 'Bearer ' + this.user.token
      }
    }
    this.axios.get('berita', config)
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
    edit(id){
      this.$router.push({ name: 'Edit Berita', params: { id: id } });
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
        text: `Anda Yakin Ingin Menghapus Berita ${data} ini?`,
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
            this.axios.delete('berita/destroy/' + id, config)
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
