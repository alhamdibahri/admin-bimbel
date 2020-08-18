<template>
  <div>
      <CButton 
            size="sm" 
            @click="warningModal = true" 
            color="primary">
            Tambah Data
          </CButton>
    <CModal
      title="Tambah Data Mata Pelajaran"
      color="info"
      ref="my-modal"
      :show.sync="warningModal"
      :ok="false"
    >
      <CRow>
      <CCol sm="12">
        <div v-if="errors.jum() > 0">
          <div class="form-group">
            <label class="control-label" style="text-align: right;">Kategori Kelas</label>
            <div>
              <Select2 @change="getKelas($event)" v-model="kategori_kelas" :options="value"  :settings="{ placeholder: '-Pilih Kategori Kelas-', width: '100%' }"
              />
              <div v-if="errors.get('kategori_kelas')" style="font-size:10px; color:red;">
                {{ errors.get('kategori_kelas') }}
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label" style="text-align: right;">Kelas</label>
            <div>
              <Select2 v-model="kelas" :options="valueKelas"  :settings="{ placeholder: '-Pilih Kelas-', width: '100%' }"
              />
              <div v-if="errors.get('kelas')" style="font-size:10px; color:red;">
                {{ errors.get('kelas') }}
              </div>
            </div>
          </div>
          <CInput
            label="Mata Pelajaran"
            placeholder="Mata Pelajaran"
            v-model="mata_pelajaran"
            :invalid-feedback="errors.get('mata_pelajaran')"
            :is-valid="validator(errors.get('mata_pelajaran'))"
          />
        </div>
        <div v-else>
          <div class="form-group">
            <label class="control-label" style="text-align: right;">Kategori Kelas</label>
            <div>
              <Select2 v-model="kategori_kelas" @change="getKelas($event)" :options="value"  :settings="{ placeholder: '-Pilih Kategori Kelas-', width: '100%' }" />
            </div>
          </div>
          <div class="form-group">
            <label class="control-label" style="text-align: right;">Kelas</label>
            <div>
              <Select2 v-model="kelas" :options="valueKelas"  :settings="{ placeholder: '-Pilih Kelas-', width: '100%' }" />
            </div>
          </div>
          <CInput
            label="Mata Pelajaran"
            placeholder="Mata Pelajaran"
            v-model="mata_pelajaran"
          />
        </div>
      </CCol>
    </CRow>
      <template v-slot:footer>
        <CButton
            color="secondary"
            size="sm"
            @click="hideModal"
          >
            Close
        </CButton>
        <CButton
            color="info"
            size="sm"
            @click="save"
          >
            Save
        </CButton>
      </template>
    </CModal>
  </div>
</template>
<script>
import { Errors } from '../../../containers/errors'
export default {
  name: "create",
  props:['data', 'token'],
  data () {
    return {
      warningModal: false,
      kategori_kelas: '',
      kelas: '',
      mata_pelajaran: '',
      errors: new Errors(),
      value: [],
      valueKelas:[]
    }
  },
  mounted(){
    this.getKategoriKelas()
  },
  methods: {
    getKategoriKelas(){
      let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.token
            }
        }
        this.axios.get('ddlkategorikelas', config)
        .then((response) => {
            let values = response.data.values
            for(let x = 0; x<values.length; x++){
              this.value.push({id: values[x].id_kategori_kelas, text: values[x].kategori_kelas})
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
    getKelas: function(event){
      let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.token
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
      hideModal() {
        this.warningModal = false
        this.errors = new Errors
        this.kategori_kelas = ''
        this.kelas = ''
        this.mata_pelajaran = ''
      },
      save(){
        let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.token
            }
        }
        let formData = {
          'kategori_kelas': this.kategori_kelas,
          'kelas': this.kelas,
          'mata_pelajaran': this.mata_pelajaran
        }
        this.axios.post('mata-pelajaran/store', formData, config)
        .then((response) => {
            this.errors = new Errors
            this.kategori_kelas = ""
            this.kelas = ""
            this.mata_pelajaran = ""
            this.hideModal()
            let values  = response.data.values
            this.$notify({
              group: 'foo',
              type: 'success',
              title: 'Success',
              text: response.data.message,
              duration: 3000,
            })
            this.data()
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
      validator (val) {
        return val ? false : true
      },
}

}
</script>