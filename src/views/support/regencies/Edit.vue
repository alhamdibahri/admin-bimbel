<template>
    <CModal
      title="Edit Data Provinsi"
      color="info"
      ref="editModal"
      :show.sync="warningModal"
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
            Update
        </CButton>
      </template>
    </CModal>
</template>
<script>
import { Errors } from '../../../containers/errors'
export default {
  name: "edit",
  props : ['term', 'token', 'data'],
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
  watch : {
    term : function (val) {
      if(val)
      this.provinsi = this.term.province_id
      this.kabupaten = this.term.regency
    }
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
    showModal() {
        this.warningModal = true
    },
    hideModal() {
        this.warningModal = false
    },
    save(){
        let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.token
            }
        }
        let formData = {
          'id': this.term.id_regency,
          'provinsi': this.provinsi,
          'kabupaten': this.kabupaten,
        }
        this.axios.patch('regencies/update', formData, config)
        .then((response) => {
            this.errors = new Errors
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
            console.log(this.term)
          });
      },
      validator (val) {
        return val ? false : true
      },
}

}
</script>