<template>
    <CContainer>
    <form v-on:submit.prevent="save" enctype="multipart/form-data">
    <CRow>
      <CCol sm="6">
        <CCard>
          <CCardBody>
            <div class="form-group">
                <label for="exampleInputEmail1">Judul Berita</label>
                <input type="text" class="form-control" placeholder="Judul Berita" v-model="judul_berita">
                <div v-if="errors.get('judul_berita')" style="color:red;">
                    <small>{{ errors.get('judul_berita') }}</small>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label" style="text-align: right;">Kategori Berita</label>
                <div>
                    <Select2 v-model="kategori_berita" :options="value"  :settings="{ placeholder: '-Pilih Kategori-', width: '100%' }"
                    />
                    <div v-if="errors.get('kategori_berita')" style="color:red;">
                        <small>{{ errors.get('kategori_berita') }}</small>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Tanggal Berita</label>
                <input type="date" class="form-control" placeholder="Nama" v-model="tanggal">
                <div v-if="errors.get('tanggal')" style="color:red;">
                    <small>{{ errors.get('tanggal') }}</small>
                </div>
            </div>
            <div class="form-group">
              <label for="exampleFormControlFile1">Foto Berita</label>
              <CImg
                :src="getFoto(foto_get)"
                block
                width="50px"
                height="50px"
                class="mb-2"
              />
              <input type="file" class="form-control-file" @change="handleFileUpload()" ref="foto" id="foto">
              <div v-if="errors.get('foto')" style="color:red;">
                <small>{{ errors.get('foto') }}</small>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="6">
        <CCard>
          <CCardBody>
            <div class="form-group">
                <label for="exampleInputEmail1">Deskripsi Berita</label>
                <froala :tag="'textarea'" :config="config" v-model="deskripsi"></froala>
                <div v-if="errors.get('deskripsi')" style="color:red;">
                    <small>{{ errors.get('deskripsi') }}</small>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label" style="text-align: right;"></label>
                <div>
                    <CButton type="submit" color="primary" style="width:100%;">Save</CButton>
                </div>
            </div>
        </CCardBody>
        </CCard>
      </CCol>
    </CRow>
        <CButton
            to="/berita"
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
        urlFoto: 'http://192.168.43.116:8081/foto_berita/',
        config: {
          placeholder: "Edit Me",
          attribution: false
        },
        judul_berita: '',
        kategori_berita: '',
        tanggal: '',
        foto: '',
        deskripsi: '',
        foto_get: '',
        value: [],
        errors: new Errors()
    }
  },
  computed: {
    ...mapGetters({
      'user':'auth/user'
    }),
  },
  mounted(){
    this.getKategori()
    this.getData()
  },
  methods: {
    getFoto(data){
      if(data != null){
        return this.urlFoto + data
      }else{
        return "placeholder.jpg"
      }
      
    },
    getKategori(){
      let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
        this.axios.get('ddlkategoriberita', config)
        .then((response) => {
            let values = response.data.values
            for(let x = 0; x<values.length; x++){
              this.value.push({id: values[x].id_kategori_berita, text: values[x].kategori_berita})
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
    getData(){
        let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
        this.axios.get('berita/edit/' + this.$route.params.id, config)
        .then((response) => {
            let values = response.data.values
            this.judul_berita = values.judul_berita
            this.kategori_berita = values.kategori_berita_id
            this.tanggal = values.tanggal_berita
            this.deskripsi = values.deskripsi
            this.password = values.password
            this.no_handphone = values.no_handphone
            this.foto_get = values.foto_berita
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
    handleFileUpload(){
      this.foto = this.$refs.foto.files[0]
    },
    save(){
        let config = {
            headers:{
                'content-type': 'multipart/form-data',
                'Authorization' : 'Bearer ' + this.user.token
            }
        }

        let formData = new FormData();
        formData.append('id', this.$route.params.id)
        formData.append('kategori_berita', this.kategori_berita)
        formData.append('judul_berita', this.judul_berita)
        formData.append('tanggal', this.tanggal)
        formData.append('foto', this.foto)
        formData.append('deskripsi', this.deskripsi)


        this.axios.patch('berita/update', formData, config)
        .then((response) => {
            let message  = response.data.message
            this.$router.push({name: 'Data Berita', params: {foo: message}})
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