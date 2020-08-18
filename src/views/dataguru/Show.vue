<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>
            <i class="fa fa-eye"></i> Detail Guru
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
                    <tr>
                      <th scope="row">Pendidikan Terakhir</th>
                      <td>
                        {{ values.guru ? values.guru.educations.education : '-' }}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Kategori Kelas</th>
                      <td> {{ values.guru ? values.guru.kategori_kelas.kategori_kelas : '-' }} </td>
                    </tr>
                    <tr>
                      <th scope="row">Kelas</th>
                      <td>{{ values.guru ? values.guru.kelas.kelas : '-' }}</td>
                    </tr>
                    <tr>
                      <th scope="row">Mata Pelajaran</th>
                      <td>{{ values.guru ? values.guru.mata_pelajaran.mata_pelajaran : '-' }}</td>
                    </tr>
                  </tbody>
                </table>
              </CTab>
              <CTab>
                <template slot="title">
                  <i class="fa fa-history"></i> {{tabs[2]}}
                </template>
                <CDataTable
                  :items="dataHistory"
                  :fields="fields"
                  column-filter
                  table-filter
                  items-per-page-select
                  :items-per-page="5"
                  hover
                  sorter
                  pagination
                >
                  <template #status="{item}">
                    <td>
                      <CBadge :color="getBadge(item.status)">
                        {{item.status}}
                      </CBadge>
                    </td>
                  </template>
                  <template #show_details="{item, index}">
                    <td class="py-2">
                        <CButton size="sm" color="primary" class="ml-1" @click="show(item.id_history)">
                          <i class="fa fa-eye" style="height:15px; width:15px;"></i>
                        </CButton>
                        <CButton size="sm" color="danger" class="ml-1" @click="destroy(item.id_history, item.nama)">
                          <i class="fa fa-trash" style="height:15px; width:15px;"></i>
                        </CButton>
                      </td>
                  </template>
                </CDataTable>
              </CTab>
            </CTabs>
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
      tabs: [
        'Akun',
        'Data Diri',
        'History Bimbingan Belajar'
      ],
      activeTab: 1,
      values: [],
      urlFoto: 'http://192.168.43.116:8081/foto_user/',
      dataHistory: [],
      fields: [
        { key: 'nama', _style:'width:30%', label: 'Nama Siswa' },
        { key: 'tanggal_history', _style:'width:20%;' },
        { key: 'kategori_kelas', _style:'width:20%;' },
         { key: 'sekolah', _style:'width:20%;', label: 'Sekolah Siswa' },
        { 
          key: 'show_details', 
          label: 'Action', 
          _style: 'width:25%', 
          sorter: false, 
          filter: false
        }
      ]
    }
  },
  mounted(){
    this.getData()
    this.getDataHistory()
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
        this.axios.get('guru/show/' + this.$route.params.id, config)
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
    getDataHistory(){
        let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
        this.axios.get('history_guru/' + this.$route.params.id, config)
        .then((response) => {
            let values = response.data.values
            this.dataHistory = values
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
    show(id){
      this.$router.push({ name: 'Detail History', params: { id: id } });
    },
    destroy(id, data){
      this.$swal({
        title: "Hapus Data",
        text: `Anda Yakin Ingin Menghapus History Guru dengan ${data} ini?`,
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
            this.axios.delete('history/destroy/' + id, config)
                .then((response) => {
                  this.getDataHistory()
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