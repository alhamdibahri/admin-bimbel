<template>
  <div>
      <CButton 
            size="sm" 
            @click="warningModal = true" 
            color="primary">
            Tambah Data
          </CButton>
    <CModal
      title="Tambah Data Genders"
      color="info"
      ref="my-modal"
      :show.sync="warningModal"
      :ok="false"
    >
      <CRow>
      <CCol sm="12">
        <div v-if="errors.jum() > 0">
          <CInput
            label="Gender"
            placeholder="Gender"
            v-model="jenis_kelamin"
            :invalid-feedback="errors.get('jenis_kelamin')"
            :is-valid="validator(errors.get('jenis_kelamin'))"
          />
        </div>
        <div v-else>
          <CInput
            label="Gender"
            placeholder="Gender"
            v-model="jenis_kelamin"
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
      jenis_kelamin: '',
      errors: new Errors()
    }
  },
  methods: {
      hideModal() {
        this.warningModal = false
        this.errors = new Errors
        this.jenis_kelamin = ''
      },
      save(){
        let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.token
            }
        }
        let formData = {
          'jenis_kelamin': this.jenis_kelamin,
        }
        this.axios.post('genders/store', formData, config)
        .then((response) => {
            this.errors = new Errors
            this.jenis_kelamin = ""
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