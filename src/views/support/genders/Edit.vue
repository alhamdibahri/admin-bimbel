<template>
    <CModal
      title="Edit Data Genders"
      color="info"
      ref="editModal"
      :show.sync="warningModal"
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
        jenis_kelamin: '',
        errors: new Errors()
    }
  },
  watch : {
    term : function (val) {
      if(val)
      this.jenis_kelamin = this.term.gender
    }
  },
  methods: {
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
          'id': this.term.id_gender,
          'jenis_kelamin': this.jenis_kelamin,
        }
        this.axios.patch('genders/update', formData, config)
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