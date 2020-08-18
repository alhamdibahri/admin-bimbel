<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>
            <i class="fa fa-history"></i> Detail History
          </CCardHeader>
          <CCardBody>
                <table class="table">
                  <tbody>
                    <tr>
                      <th scope="row">Tanggal History</th>
                      <td>
                        {{ values.tanggal_history ? values.tanggal_history : '-' }}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Jadwal Bimbingan</th>
                      <td> {{ values.jadwal_history ? values.jadwal_history : '-' }} </td>
                    </tr>
                    <tr>
                      <th scope="row">Nama Siswa</th>
                      <td>{{ values.nama ? values.nama : '-' }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Kategori Harga</th>
                      <td>{{ values.jenis_harga ? values.jenis_harga : '-' }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Harga</th>
                      <td>{{ values.harga ? values.harga : '-' }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Status History</th>
                      <td>{{ status(values.status_history) }}</td>
                    </tr>
                  </tbody>
                </table>
          </CCardBody>
        </CCard>
        <CButton
            to="/hak-akses/guru"
            style="float:right; width:50px; height:50px; margin-bottom:20px;" color="success">
            <CIcon name="cil-chevron-left" size="xl" style="margin-top:6px;"/>
        </CButton>
      </CCol>
    </CRow>
  </div>
</template>

<script>


import { mapGetters } from 'vuex'
export default {
  name: 'Show',
  data () {
    return {
      values: [],
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
  methods:{
     getData(){
        let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
        this.axios.get('history_detail_guru/' + this.$route.params.id, config)
        .then((response) => {
            let values = response.data.values
            this.values = values
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
    status(data){
        if(data == "0"){
            return 'Menunggu Persetujuan'
        }else if(data=="1"){
            return 'Sedang Berlangsung'
        }else if(data=="2"){
            return 'Selesai'
        }else if(data=="3"){
            return 'Ditolak'
        }else{
            return 'Dibatalkan'
        }
    }
  }
}
</script>