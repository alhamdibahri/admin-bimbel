<template>
  <div>
    <CCard>
        <CCardHeader>
          <CIcon name="cil-justify-center"/>
          <strong> Data Siswa</strong>
        </CCardHeader>
        <CCardBody>
          
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
                    <template #show_details="{item}">
                      <td class="py-2">
                        <CButton size="sm" color="primary" class="ml-1" @click="show(item.id_user)">
                          <i class="fa fa-eye" style="height:15px; width:15px;"></i>
                        </CButton>
                      </td>
                    </template>
                  </CDataTable>
          <div>
          </div>
        </CCardBody>
      </CCard>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Siswa',
  data () {
    return {
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
    this.axios.get('siswa/1', config)
        .then((response) => {
          let values = response.data.values
          // console.log(values)
          this.items = values
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
    show(id){
      this.$router.push({ name: 'Show Siswa', params: { id: id } });
    },
  }
}
</script>
