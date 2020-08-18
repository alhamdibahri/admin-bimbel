<template>
    <CContainer>
    <form v-on:submit.prevent="save" enctype="multipart/form-data">
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <i class="fa fa-edit"></i> EDIT DATA SISWA
            <div style="float:right;">
              <CImg
                :src="getFoto(foto_get)"
                block
                width="50px"
                height="50px"
                class="mb-2"
              />
            </div>
          </CCardHeader>
          <CCardBody>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Username</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="username">
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="email">
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Nama</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" placeholder="Nama" v-model="nama">
                <div v-if="errors.get('nama')" style="color:red;">
                    <small>{{ errors.get('nama') }}</small>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Jenis Kelamin</label>
              <div class="col-sm-10">
                <Select2 v-model="jenis_kelamin" :options="valueGender"  :settings="{ placeholder: '-Pilih Jenis Kelamin-', width: '100%' }"
                    />
                <div v-if="errors.get('jenis_kelamin')" style="color:red;">
                  <small>{{ errors.get('jenis_kelamin') }}</small>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Agama</label>
              <div class="col-sm-10">
                <Select2 v-model="agama" :options="valueReligion"  :settings="{ placeholder: '-Pilih Agama-', width: '100%' }"
                    />
                <div v-if="errors.get('agama')" style="color:red;">
                  <small>{{ errors.get('agama') }}</small>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Tempat Lahir</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" placeholder="Tempat Lahir" v-model="tempat_lahir">
                <div v-if="errors.get('tempat_lahir')" style="color:red;">
                    <small>{{ errors.get('tempat_lahir') }}</small>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Tanggal Lahir</label>
              <div class="col-sm-10">
                <input type="date" class="form-control" placeholder="Tanggal Lahir" v-model="tanggal_lahir">
                <div v-if="errors.get('tanggal_lahir')" style="color:red;">
                    <small>{{ errors.get('tanggal_lahir') }}</small>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Provinsi</label>
              <div class="col-sm-10">
                <Select2 v-model="provinsi" :options="value"  :settings="{ placeholder: '-Pilih Provinsi-', width: '100%' }" @change="getKabupaten"
                    />
                <div v-if="errors.get('provinsi')" style="color:red;">
                  <small>{{ errors.get('provinsi') }}</small>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Kabupaten</label>
              <div class="col-sm-10">
                <Select2 v-model="kabupaten" :options="valueKabupaten"  @change="getKecamatan(), getSchool()" :settings="{ placeholder: '-Pilih Kabupaten/Kota-', width: '100%' }"
                    />
                <div v-if="errors.get('kabupaten')" style="color:red;">
                  <small>{{ errors.get('kabupaten') }}</small>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Kecamatan</label>
              <div class="col-sm-10">
                <Select2 @change="getDesa" v-model="kecamatan" :options="valueKecamatan"  :settings="{ placeholder: '-Pilih Kecamatan-', width: '100%' }"
                    />
                <div v-if="errors.get('kecamatan')" style="color:red;">
                  <small>{{ errors.get('kecamatan') }}</small>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Desa</label>
              <div class="col-sm-10">
                <Select2 v-model="desa" :options="valueDesa"  :settings="{ placeholder: '-Pilih Desa-', width: '100%' }"
                    />
                <div v-if="errors.get('desa')" style="color:red;">
                  <small>{{ errors.get('desa') }}</small>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Alamat</label>
              <div class="col-sm-10">
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="alamat"></textarea>
                <div v-if="errors.get('alamat')" style="color:red;">
                  <small>{{ errors.get('alamat') }}</small>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">No Handphone</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" placeholder="No Handphone" v-model="no_handphone">
                <div v-if="errors.get('no_handphone')" style="color:red;">
                    <small>{{ errors.get('no_handphone') }}</small>
                </div>
              </div>
            </div>
            <hr>
            <h4 class="text-center"><small>Bimbingan Belajar</small></h4>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Kategori Kelas</label>
              <div class="col-sm-10">
                <Select2 @change="getKelas(), getSchool()" v-model="kategori_kelas" :options="valueKategori"  :settings="{ placeholder: '-Pilih Kategori Kelas-', width: '100%' }"
                    />
                <div v-if="errors.get('kategori_kelas')" style="color:red;">
                  <small>{{ errors.get('kategori_kelas') }}</small>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Kelas</label>
              <div class="col-sm-10">
                <Select2 v-model="kelas" :options="valueKelas"  :settings="{ placeholder: '-Pilih Kelas-', width: '100%' }"
                    />
                <div v-if="errors.get('kelas')" style="color:red;">
                  <small>{{ errors.get('kelas') }}</small>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Sekolah</label>
              <div class="col-sm-10">
                <Select2 v-model="sekolah" :options="valueSekolah"  :settings="{ placeholder: '-Pilih Sekolah-', width: '100%' }"
                    />
                <div v-if="errors.get('sekolah')" style="color:red;">
                  <small>{{ errors.get('sekolah') }}</small>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label"></label>
              <div class="col-sm-10">
                <CButton type="submit" color="primary" style="width:100%;">Save</CButton>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
        <CButton
            to="/hak-akses/siswa"
            style="float:right; width:50px; height:50px; margin-bottom:20px;" color="success">
            <CIcon name="cil-chevron-left" size="xl" style="margin-top:6px;"/>
        </CButton>
    </form>
  </CContainer>
</template>

<script>
import { mapGetters } from 'vuex'
import { Errors } from '../../containers/errors'
export default {
  name: "edit",
  data () {
    return {
        urlFoto: 'http://192.168.43.116:8081/foto_user/',
        nama: '',
        username: '',
        role: '',
        provinsi: '',
        kabupaten:'',
        email: '',
        no_handphone:'',
        foto: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        kecamatan:'',
        agama: '',
        jenis_kelamin: '',
        alamat: '',
        desa: '',
        foto_get: '',
        kategori_kelas: '',
        kelas: '',
        sekolah: '',
        value: [],
        valueKecamatan: [],
        valueKabupaten: [],
        valueDesa: [],
        valueReligion: [],
        valueGender: [],
        valueSekolah: [],
        valueKategori: [],
        valueKelas: [],
        errors: new Errors()
    }
  },
  computed: {
    ...mapGetters({
      'user':'auth/user'
    }),
  },
  mounted(){
    this.getProvinces()
    this.getData()
    this.getReligion()
    this.getGender()
    this.getKategoriKelas()
  },
  methods: {
    getFoto(data){
      if(data != null){
        return this.urlFoto + data
      }else{
        return "placeholder.jpg"
      }
      
    },
    getSchool(){
        let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
        this.axios.get(`ddlschool/${this.kabupaten}/${this.ubahKelas(this.kategori_kelas)}`, config)
        .then((response) => {
            let values = response.data.values
            this.valueSekolah = []
            for(let x = 0; x<values.length; x++){
              this.valueSekolah.push({id: values[x].id_school, text: values[x].sekolah})
            }
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
    getReligion(){
      let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
        this.axios.get('ddlreligion', config)
        .then((response) => {
            let values = response.data.values
            for(let x = 0; x<values.length; x++){
              this.valueReligion.push({id: values[x].id_religion, text: values[x].religion})
            }
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
    getGender(){
      let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
        this.axios.get('ddlgender', config)
        .then((response) => {
            let values = response.data.values
            for(let x = 0; x<values.length; x++){
              this.valueGender.push({id: values[x].id_gender, text: values[x].gender})
            }
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
    getProvinces(){
      let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
        this.axios.get('ddlprovinces', config)
        .then((response) => {
            let values = response.data.values
            for(let x = 0; x<values.length; x++){
              this.value.push({id: values[x].id_province, text: values[x].province})
            }
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
    getKabupaten(){
      let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
        this.axios.get('ddlkabupaten/' + this.provinsi, config)
        .then((response) => {
            let values = response.data.values
            this.valueKabupaten = []
            if(this.provinsi == null){
               this.valueKabupaten = []
            }else{
              for(let x = 0; x<values.length; x++){
                this.valueKabupaten.push({id: values[x].id_regency, text: values[x].regency})
              }
            }
            
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
    getKecamatan(){
      let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
        this.axios.get('ddlkecamatan/' + this.kabupaten, config)
        .then((response) => {
            let values = response.data.values
            this.valueKecamatan = []
            for(let x = 0; x<values.length; x++){
              this.valueKecamatan.push({id: values[x].id_district, text: values[x].district})
            }
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
    getDesa(){
      let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
        this.axios.get('ddldesa/' + this.kecamatan, config)
        .then((response) => {
            let values = response.data.values
            this.valueDesa = []
            for(let x = 0; x<values.length; x++){
              this.valueDesa.push({id: values[x].id_village, text: values[x].village})
            }
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
    getKategoriKelas(){
      let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
        this.axios.get('ddlkategorikelas', config)
        .then((response) => {
            let values = response.data.values
            for(let x = 0; x<values.length; x++){
              this.valueKategori.push({id: values[x].id_kategori_kelas, text: values[x].kategori_kelas})
            }
          })
          .catch(error => {
            this.errors.record(error.response.data)
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Error',
              text: error.response.data.message,
              duration: 3000,
            })
          });
    },
    getKelas(){
      let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
        this.axios.get('ddlkelas/' + this.kategori_kelas, config)
        .then((response) => {
            this.valueKelas = []
            let values = response.data.values
            for(let x = 0; x<values.length; x++){
              this.valueKelas.push({id: values[x].id_kelas, text: values[x].kelas})
            }
          })
          .catch(error => {
            this.errors.record(error.response.data)
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Error',
              text: error.response.data.message,
              duration: 3000,
            })
          });
    },
    ubahKelas(value){
      if(value == 1) return 'SD'
      else if(value == 2) return 'SMP'
      else if(value == 3) return 'SMA' 
    },
    getData(){
        let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
        this.axios.get('siswa/edit/' + this.$route.params.id, config)
        .then((response) => {
            let values = response.data.values
            this.nama = values[0].nama
            this.username = values[0].username
            this.email = values[0].email
            this.role = values[0].role_id
            this.password = values[0].password
            this.no_handphone = values[0].no_handphone
            this.foto_get = values[0].foto
            this.provinsi = values[0].province_id
            if(this.provinsi != null) this.getKabupaten()
            this.kabupaten = values[0].regency_id
            if(this.kabupaten != null) this.getKecamatan()
            this.kecamatan = values[0].district_id
            if(this.kecamatan != null)this.getDesa()
            this.desa = values[0].village_id
            this.agama = values[0].religion_id
            this.jenis_kelamin = values[0].gender_id
            this.tempat_lahir = values[0].tempat_lahir
            this.tanggal_lahir = values[0].tanggal_lahir
            this.alamat = values[0].alamat
            this.no_handphone = values[0].no_handphone
            this.foto_get = values[0].foto
            this.kategori_kelas = values[0].siswa.kategori_kelas_id
            if(this.kategori_kelas != null)this.getKelas()
            this.kelas = values[0].siswa.kelas_id
            if(this.ubahKelas(this.kategori_kelas) != null && this.kabupaten != null) this.getSchool()
            this.sekolah = values[0].siswa.school_id
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
    save(){
        let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }

        let formData = {
          'id': this.$route.params.id,
          'nama': this.nama,
          'jenis_kelamin': this.jenis_kelamin,
          'agama': this.agama,
          'provinsi': this.provinsi,
          'kabupaten': this.kabupaten,
          'kecamatan': this.kecamatan,
          'desa': this.desa,
          'tempat_lahir': this.tempat_lahir,
          'tanggal_lahir': this.tanggal_lahir,
          'alamat': this.alamat,
          'no_handphone': this.no_handphone,
          'kategori_kelas': this.kategori_kelas,
          'kelas': this.kelas,
          'sekolah': this.sekolah
        };

        this.axios.patch('siswa/update', formData, config)
        .then((response) => {
            let message  = response.data.message
            this.$router.push({name: 'Data Siswa', params: {foo: message}})
          })
          .catch(error => {
            this.errors.record(error.response.data)
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Error',
              text: error.response.data.message,
              duration: 3000,
            })
          });
        
    }
}

}
</script>