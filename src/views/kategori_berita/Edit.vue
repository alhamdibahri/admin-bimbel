<template>
    <CModal
      title="Edit Data Kategori Berita"
      color="info"
      ref="editModal"
      :show.sync="warningModal"
    >
      <CRow>
      <CCol sm="12">
        <div v-if="errors.jum() > 0">
          <CInput
            label="Kategori Berita"
            placeholder="Kategori Berita"
            v-model="kategori_berita"
            :invalid-feedback="errors.get('kategori_berita')"
            :is-valid="validator(errors.get('kategori_berita'))"
          />
        </div>
        <div v-else>
          <CInput
            label="Kategori Berita"
            placeholder="Kategori Berita"
            v-model="kategori_berita"
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
import { Errors } from '../../containers/errors'
export default {
  name: "edit",
  props : ['term', 'token', 'data'],
  data () {
    return {
        warningModal: false,
        kategori_berita: '',
        errors: new Errors()
    }
  },
  watch : {
    term : function (val) {
      if(val)
      this.kategori_berita = this.term.kategori_berita
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
          'id': this.term.id_kategori_berita,
          'kategori_berita': this.kategori_berita,
        }
        this.axios.patch('kategori-berita/update', formData, config)
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