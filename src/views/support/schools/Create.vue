<template>
    <CContainer>
    <form class="needs-validation" novalidate>
    <CRow>
      <CCol sm="6">
        <CCard>
          <CCardBody>
            <div class="form-group">
                <label for="exampleInputEmail1">Nama Sekolah</label>
                <input type="text" class="form-control" placeholder="Nama Sekolah" v-model="nama_sekolah">
                <div v-if="errors.get('nama_sekolah')" style="color:red;">
                    <small>{{ errors.get('nama_sekolah') }}</small>
                </div>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">NPSN</label>
                <input type="text" class="form-control" placeholder="NPSN" v-model="npsn">
                <div v-if="errors.get('npsn')" style="color:red;">
                    <small>{{ errors.get('npsn') }}</small>
                </div>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Kabupaten/Kota</label>
                <Select2 v-model="kabupaten" :options="value"  :settings="{ placeholder: '-Pilih Kota/Kabupaten-', width: '100%' }" />
                <div v-if="errors.get('kabupaten')" style="color:red;">
                    <small>{{ errors.get('kabupaten') }}</small>
                </div>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Kecamatan</label>
                <input type="text" class="form-control" placeholder="Kecamatan" v-model="kecamatan">
                <div v-if="errors.get('kecamatan')" style="color:red;">
                    <small>{{ errors.get('kecamatan') }}</small>
                </div>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Bentuk</label>
                <input type="text" class="form-control" placeholder="Bentuk" v-model="bentuk">
                <div v-if="errors.get('bentuk')" style="color:red;">
                    <small>{{ errors.get('bentuk') }}</small>
                </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="6">
        <CCard>
          <CCardBody>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Alamat</label>
                <textarea v-model="alamat" class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                <div v-if="errors.get('alamat')" style="color:red;">
                  <small>{{ errors.get('alamat') }}</small>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label" style="text-align: right;">Status</label>
                <div>
                    <Select2 v-model="status" :options="[{id: 'N', text: 'Negeri'}, {id: 'S', text: 'Swasta'}]"  :settings="{ placeholder: '-Pilih Status-', width: '100%' }"
                    />
                    <div v-if="errors.get('status')" style="color:red;">
                        <small>{{ errors.get('status') }}</small>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Bintang</label>
                <input type="text" class="form-control" placeholder="Bintang" v-model="bintang">
                <div v-if="errors.get('bintang')" style="color:red;">
                    <small>{{ errors.get('bintang') }}</small>
                </div>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Bujur</label>
                <input type="text" class="form-control" placeholder="Bujur" v-model="bujur">
                <div v-if="errors.get('bujur')" style="color:red;">
                    <small>{{ errors.get('bujur') }}</small>
                </div>
            </div>
            <div class="form-group" style="margin-bottom:3px;">
                <label class="control-label" style="text-align:right;"></label>
                <div>
                    <CButton @click="save" color="primary" style="width:100%;">Save</CButton>
                </div>
            </div>
        </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </form>
        <CButton
            to="/support/school"
            style="float:right; width:50px; margin-bottom:20px; height:50px;" color="success">
            <CIcon name="cil-chevron-left" size="xl" style="margin-top:6px;"/>
        </CButton>
  </CContainer>
</template>

<script>
import { mapGetters } from 'vuex'
import { Errors } from '../../../containers/errors'
export default {
  name: "create",
  data () {
    return {
        nama_sekolah: '',
        npsn: '',
        kabupaten: '',
        kecamatan: '',
        bentuk: '',
        alamat:'',
        status:'',
        bintang:'',
        bujur:'',
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
    this.getRegencies()
  },
  methods: {
    getRegencies(){
      let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
        this.axios.get('ddlregencies', config)
        .then((response) => {
            let values = response.data.values
            for(let x = 0; x<values.length; x++){
              this.value.push({id: values[x].id_regency, text: values[x].regency})
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
    save(){
        let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
        let formData = {
          'kabupaten': this.kabupaten,
          'kecamatan': this.kecamatan,
          'npsn': this.npsn,
          'nama_sekolah': this.nama_sekolah,
          'bentuk': this.bentuk,
          'status': this.status,
          'alamat': this.alamat,
          'bintang': this.bintang,
          'bujur': this.bujur,
        }
        this.axios.post('support/school/store', formData, config)
        .then((response) => {
            let message  = response.data.message
            this.$router.push({name: 'Data Sekolah', params: {foo: message}})
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