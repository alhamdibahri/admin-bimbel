<template>
    <CModal
      title="Edit Data Kecamatan"
      color="info"
      ref="editModal"
      :show.sync="warningModal"
    >
      <CRow>
      <CCol sm="12">
        <div v-if="errors.jum() > 0">
          <div class="form-group">
            <label class="control-label" style="text-align: right;">Kota/Kabupaten</label>
            <div>
              <Select2 v-model="kabupaten" :options="value"  :settings="{ placeholder: '-Pilih Kota/Kabupaten-', width: '100%' }"
              />
              <div v-if="errors.get('kabupaten')" style="font-size:10px; color:red;">
                {{ errors.get('kabupaten') }}
              </div>
            </div>
          </div>
          <CInput
            label="Kecamatan"
            placeholder="Kecamatan"
            v-model="kecamatan"
            :invalid-feedback="errors.get('kecamatan')"
            :is-valid="validator(errors.get('kecamatan'))"
          />
        </div>
        <div v-else>
          <div class="form-group">
            <label class="control-label" style="text-align: right;">Kota/Kabupaten</label>
            <div>
              <Select2 v-model="kabupaten" :options="value"  :settings="{ placeholder: '-Pilih Kota/Kabupaten-', width: '100%' }" />
            </div>
          </div>
          <CInput
            label="Kecamatan"
            placeholder="Kecamatan"
            v-model="kecamatan"
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
        kecamatan: '',
        errors: new Errors(),
        value: []
    }
  },
  mounted(){
    this.getRegencies()
  },
  watch : {
    term : function (val) {
      if(val)
      this.kecamatan = this.term.district
      this.kabupaten = this.term.regency_id
    }
  },
  methods: {
    getRegencies(){
      let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.token
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
          'id': this.term.id_district,
          'kabupaten': this.kabupaten,
          'kecamatan': this.kecamatan,
        }
        this.axios.patch('districts/update', formData, config)
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