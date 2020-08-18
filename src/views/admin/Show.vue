<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>
            <i class="fa fa-eye"></i> Detail Admin
          </CCardHeader>
          <CCardBody>
            <CTabs add-tab-classes="mt-1">
              <CTab>
                <template slot="title">
                  <i class="fa fa-user"></i> {{tabs[0]}}
                </template>
                <table class="table">
                  <tbody>
                    <tr>
                      <th scope="row">Username</th>
                      <td>
                        {{ values.username ? values.username : '-' }}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">E-Mail</th>
                      <td> {{ values.email ? values.email : '-' }} </td>
                    </tr>
                    <tr>
                      <th scope="row">Role</th>
                      <td>{{ values.roles ? values.roles.role : '-' }}</td>
                    </tr>
                  </tbody>
                </table>
              </CTab>
              <CTab>
                <template slot="title">
                  <i class="fa fa-info"></i> {{tabs[1]}}
                </template>
                <table class="table">
                  <tbody>
                    <tr>
                      <th scope="row">Nama</th>
                      <td>{{ values.nama ? values.nama : '-' }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Jenis Kelamin</th>
                      <td>{{ values.genders ? values.genders.gender : '-' }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Agama</th>
                      <td>{{ values.religions ? values.religions.religion : '-' }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Tempat Lahir</th>
                      <td>{{ values.tempat_lahir ? values.tempat_lahir : '-' }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Provinsi</th>
                      <td>{{ values.provinces ? values.provinces.province : '-' }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Kabupaten / Kota</th>
                      <td>{{ values.regencies ? values.regencies.regency : '-' }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Kecamatan</th>
                      <td>{{ values.districts ? values.districts.district : '-' }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Desa</th>
                      <td>{{ values.villages ? values.villages.village : '-' }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Alamat</th>
                      <td>{{ values.alamat ? values.alamat : '-' }}</td>
                    </tr>
                    <tr>
                      <th scope="row">No Handphone</th>
                      <td>{{ values.no_handphone ? values.no_handphone : '-' }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Foto</th>
                      <td>
                        <CImg
                          :src="getFoto(values.foto)"
                          block
                          width="100px"
                          height="100px"
                          class="mb-2"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CTab>
            </CTabs>
          </CCardBody>
        </CCard>
        <CButton
            to="/hak-akses/admin"
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
      tabs: [
        'Akun',
        'Detail',
      ],
      activeTab: 1,
      values: [],
      urlFoto: 'http://192.168.43.116:8081/foto_user/',
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
    getFoto(data){
      if(data != null){
        return this.urlFoto + data
      }else{
        return "placeholder.jpg"
      }
      
    },
    getData(){
        let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
        this.axios.get('admin/show/' + this.$route.params.id, config)
        .then((response) => {
            let values = response.data.values[0]
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
  }
}
</script>