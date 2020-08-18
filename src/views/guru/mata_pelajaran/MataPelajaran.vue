<template>
  <div>
    <CCard>
        <CCardHeader>
          <CIcon name="cil-justify-center"/>
          <strong> Data Mata Pelajaran</strong>
          <create style="float:right" :data="getData" :token="user.token"></create>
        </CCardHeader>
        <CCardBody>
          <div>
            <CDataTable
              :items="items"
              :loading=loading
              :fields="fields"
              table-filter
              column-filter
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
                    <CButton size="sm" @click="edit(item)" color="info">
                       <CIcon name="cil-pencil"></CIcon>
                    </CButton>
                    <CButton size="sm" color="danger" @click="destroy(item.id_mata_pelajaran, item.mata_pelajaran)">
                        <CIcon name="cil-trash"></CIcon>
                    </CButton>
                </td>
              </template>
            </CDataTable>
          </div>
        </CCardBody>
      </CCard>
      <edit ref="edit" :token="user.token" :data="getData" :term.sync="term"></edit>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import create from './Create'
import edit from './Edit'
export default {
  name: 'Provinces',
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
                key:'kategori_kelas',
                label: 'Kategori Kelas',
            },
            {
                key:'kelas',
                label:'Kelas',
            },
            {
                key:'mata_pelajaran',
                label:'Mata Pelajaran',
            },
            { 
                key: 'action', 
                label: 'Action',  
                sorter: false, 
                filter: false,
                _style: 'width:10%'
            },
        ],
        details: [],
        term: '',
    }
  },
  components: {
    'create': create,
    'edit' : edit
  },
  mounted(){
      this.getData()    
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
        this.axios.get('mata-pelajaran', config)
            .then((response) => {
                let values = response.data.values
                this.items = values
                this.loading = false
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
    },
    edit(term){
        this.term = term;
        this.$refs.edit.showModal()
    },
    destroy(id, data){
      this.$swal({
        title: "Hapus Data",
        text: `Anda Yakin Ingin Menghapus Mata Pelajaran ${data} ini?`,
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
            this.axios.delete('mata-pelajaran/destroy/' + id, config)
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
