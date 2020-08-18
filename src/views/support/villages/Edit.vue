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
            <label class="control-label" style="text-align: right;">Kecamatan</label>
            <div>
              <Select2 v-model="kecamatan" :options="value"  :settings="{ placeholder: '-Pilih Kecamatan-', width: '100%' }"
              />
              <div v-if="errors.get('kecamatan')" style="font-size:10px; color:red;">
                {{ errors.get('kecamatan') }}
              </div>
            </div>
          </div>
          <CInput
            label="Desa"
            placeholder="Desa"
            v-model="desa"
            :invalid-feedback="errors.get('desa')"
            :is-valid="validator(errors.get('desa'))"
          />
        </div>
        <div v-else>
          <div class="form-group">
            <label class="control-label" style="text-align: right;">Kecamatan</label>
            <div>
              <Select2 v-model="kecamatan" :options="value"  :settings="{ placeholder: '-Pilih Kecamatan-', width: '100%' }" />
            </div>
          </div>
          <CInput
            label="Desa"
            placeholder="Desa"
            v-model="desa"
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
        kecamatan: '',
        desa: '',
        errors: new Errors(),
        value: []
    }
  },
  mounted(){
    this.getDistricts()
  },
  watch : {
    term : function (val) {
      if(val)
      this.kecamatan = this.term.id_district
      this.desa = this.term.village
    }
  },
  methods: {
    getDistricts(){
      let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.token
            }
        }
        this.axios.get('ddldistricts', config)
        .then((response) => {
            let values = response.data.values
            for(let x = 0; x<values.length; x++){
              this.value.push({id: values[x].id_district, text: values[x].district})
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
        this.errors = new Errors
    },
    save(){
        let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.token
            }
        }
        let formData = {
          'id': this.term.id_village,
          'kecamatan': this.kecamatan,
          'desa': this.desa,
        }
        this.axios.patch('villages/update', formData, config)
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