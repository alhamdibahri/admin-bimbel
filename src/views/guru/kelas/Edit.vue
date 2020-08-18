<template>
    <CModal
      title="Edit Data Kelas"
      color="info"
      ref="editModal"
      :show.sync="warningModal"
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
        kategori_kelas: '',
        kelas: '',
        errors: new Errors(),
        value: []
    }
  },
  mounted(){
    this.getKategoriKelas()
  },
  watch : {
    term : function (val) {
      if(val)
      this.kategori_kelas = this.term.kategori_kelas_id
      this.kelas = this.term.kelas
    }
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
          'id': this.term.id_kelas,
          'kategori_kelas': this.kategori_kelas,
          'kelas': this.kelas,
        }
        this.axios.patch('kelas/update', formData, config)
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