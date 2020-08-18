<template>
  <div>
      <CButton 
            size="sm" 
            @click="warningModal = true" 
            color="primary">
            Tambah Data
          </CButton>
    <CModal
      title="Tambah Data Pendidikan"
      color="info"
      ref="my-modal"
      :show.sync="warningModal"
      :ok="false"
    >
      <CRow>
      <CCol sm="12">
        <div v-if="errors.jum() > 0">
          <CInput
            label="Pendidikan"
            placeholder="Pendidikan"
            v-model="pendidikan"
            :invalid-feedback="errors.get('pendidikan')"
            :is-valid="validator(errors.get('pendidikan'))"
          />
        </div>
        <div v-else>
          <CInput
            label="Pendidikan"
            placeholder="Pendidikan"
            v-model="pendidikan"
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
      pendidikan: '',
      errors: new Errors()
    }
  },
  methods: {
      hideModal() {
        this.warningModal = false
        this.errors = new Errors
        this.pendidikan = ''
      },
      save(){
        let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.token
            }
        }
        let formData = {
          'pendidikan': this.pendidikan,
        }
        this.axios.post('educations/store', formData, config)
        .then((response) => {
            this.errors = new Errors
            this.pendidikan = ""
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