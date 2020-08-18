<template>
  <div>
    <CCard>
        <CCardHeader>
          <CIcon name="cil-justify-center"/>
          <strong> Data Sekolah</strong>
          <CButton 
            size="sm"
            style="float:right;" 
            color="primary"
            to="/support/school/create">
            Tambah Data
          </CButton>
        </CCardHeader>
        <CCardBody>
          <div>
            <CDataTable
              :loading=loading
              :items="items"
              :fields="fields"
              column-filter
              items-per-page-select
              :items-per-page="50"
              hover
              sorter
              pagination
            >
              <template #show_details="{item, index}">
                <td class="py-2">
                    <CButton size="sm" color="info" @click="edit(item.id_school)">
                        <CIcon name="cil-pencil"></CIcon>
                    </CButton>
                    <CButton size="sm" color="danger" @click="destroy(item.id_school, item.sekolah)">
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
import { mapGetters } from 'vuex'
export default {
  name: 'School',
  data () {
    return {
      items: [],
      loading:true,
      fields: 
      [
        { 
          key:'sekolah', 
          _style: 'width:30%' 
        },
        {
          key:'regency', 
          label:'Kabupaten/Kota', 
          _style: 'width:30%'},
        { 
          key: 'alamat', 
          _style: 'width:30%'
        },
        {
          key:'npsn'
        },
        {
          key:'bentuk'
        },
        { 
          key: 'show_details', 
          label: 'Action', 
          _style: 'width:10%', 
          sorter: false, 
          filter: false
        }
      ],
      details: [],
      data: this.user
    }
  },
  mounted(){
    this.getData()
    this.pesan()
  },
  computed: {
    ...mapGetters({
      'user':'auth/user'
    }),
  },
  methods: {
    getData(){
      let config = {
        headers:{
          'Authorization' : 'Bearer ' + this.user.token
        }
      }
      this.axios.get('support/school', config)
          .then((response) => {
            let values = response.data.values
            this.items = values
            this.loading = false
          })
          .catch((error) => {
            console.log(error)
          })
    },
    edit(id){
      this.$router.push({ name: 'Edit Data Sekolah', params: { id: id } });
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
        text: `Anda Yakin Ingin Menghapus Sekolah ${data} ini?`,
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
            this.axios.delete('/support/school/destroy/' + id, config)
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
