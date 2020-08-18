<template>
  <div>
      <CButton 
            size="sm" 
            @click="warningModal = true" 
            color="primary">
            Tambah Data
          </CButton>
    <CModal
      title="Tambah Data Kelas"
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
              <Select2 v-model="kategori_kelas" :options="value"  :settings="{ placeholder: '-Pilih Kategori Kelas-', width: '100%' }"
              />
              <div v-if="errors.get('kategori_kelas')" style="font-size:10px; color:red;">
                {{ errors.get('kategori_kelas') }}
              </div>
            </div>
          </div>
          <CInput
            label="Kelas"
            placeholder="Kelas"
            v-model="kelas"
            :invalid-feedback="errors.get('kelas')"
            :is-valid="validator(errors.get('kelas'))"
          />
        </div>
        <div v-else>
          <div class="form-group">
            <label class="control-label" style="text-align: right;">Kategori Kelas</label>
            <div>
              <Select2 v-model="kategori_kelas" :options="value"  :settings="{ placeholder: '-Pilih Kategori Kelas-', width: '100%' }" />
            </div>
          </div>
          <CInput
            label="Kelas"
            placeholder="Kelas"
            v-model="kelas"
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
      errors: new Errors(),
      value: []
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
      hideModal() {
        this.warningModal = false
        this.errors = new Errors
        this.kategori_kelas = ''
        this.kelas = ''
      },
      save(){
        let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.token
            }
        }
        let formData = {
          'kategori_kelas': this.kategori_kelas,
          'kelas': this.kelas
        }
        this.axios.post('kelas/store', formData, config)
        .then((response) => {
            this.errors = new Errors
            this.kategori_kelas = ""
            this.kelas = ""
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