<template>
  <div>
      <CButton 
            size="sm" 
            @click="warningModal = true" 
            color="primary">
            Tambah Data
          </CButton>
    <CModal
      title="Tambah Data Kota/Kabupaten"
      color="info"
      ref="my-modal"
      :show.sync="warningModal"
      :ok="false"
    >
      <CRow>
      <CCol sm="12">
        <div v-if="errors.jum() > 0">
          <div class="form-group">
            <label class="control-label" style="text-align: right;">Provinsi</label>
            <div>
              <Select2 v-model="provinsi" :options="value"  :settings="{ placeholder: '-Pilih Provinsi-', width: '100%' }"
              />
              <div v-if="errors.get('provinsi')" style="font-size:10px; color:red;">
                {{ errors.get('provinsi') }}
              </div>
            </div>
          </div>
          <CInput
            label="Kota/Kabupaten"
            placeholder="Kota/Kabupaten"
            v-model="kabupaten"
            :invalid-feedback="errors.get('kabupaten')"
            :is-valid="validator(errors.get('kabupaten'))"
          />
        </div>
        <div v-else>
          <div class="form-group">
            <label class="control-label" style="text-align: right;">Provinsi</label>
            <div>
              <Select2 v-model="provinsi" :options="value"  :settings="{ placeholder: '-Pilih Provinsi-', width: '100%' }" />
            </div>
          </div>
          <CInput
            label="Kota/Kabupaten"
            placeholder="Kota/Kabupaten"
            v-model="kabupaten"
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
      kabupaten: '',
      provinsi: '',
      errors: new Errors(),
      value: []
    }
  },
  mounted(){
    this.getProvinces()
  },
  methods: {
    getProvinces(){
      let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.token
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
        this.provinsi = ''
        this.kabupaten = ''
      },
      save(){
        let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.token
            }
        }
        let formData = {
          'provinsi': this.provinsi,
          'kabupaten': this.kabupaten
        }
        this.axios.post('regencies/store', formData, config)
        .then((response) => {
            this.errors = new Errors
            this.provinsi = ""
            this.kabupaten = ""
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