<template>
  <div>
    <CRow>
        <CCol md="12">
            <CCard>
                <CForm>
                <CCardHeader>
                    <strong>Ganti</strong> Password
                </CCardHeader>
                <CCardBody>
                    <div v-if="errors.jum() > 0">
                      <CInput
                          v-model="password_lama"
                          type="password"
                          label="Password Lama"
                          horizontal
                          placeholder="Masukkan Password Lama..."
                          :invalid-feedback="errors.get('password_lama')"
                          :is-valid="validator(errors.get('password_lama'))"
                        />
                        <CInput
                          v-model="password_baru"
                          type="password"
                          label="Password Baru"
                          horizontal
                          placeholder="Masukkan Password Baru..."
                          :invalid-feedback="errors.get('password_baru')"
                          :is-valid="validator(errors.get('password_baru'))"
                        />
                        <CInput
                          v-model="konfirmasi_password"
                          type="password"
                          label="Konfirmasi Passowrd"
                          horizontal
                          placeholder="Masukkan Konfirmasi Password..."
                          :invalid-feedback="errors.get('konfirmasi_password')"
                          :is-valid="validator(errors.get('konfirmasi_password'))"
                        />
                    </div>
                    <div v-else>
                      <CInput
                          v-model="password_lama"
                          type="password"
                          label="Password Lama"
                          horizontal
                          placeholder="Masukkan Password Lama..."
                        />
                        <CInput
                          v-model="password_baru"
                          type="password"
                          label="Password Baru"
                          horizontal
                          placeholder="Masukkan Password Baru..."
                        />
                        <CInput
                          v-model="konfirmasi_password"
                          type="password"
                          label="Konfirmasi Passowrd"
                          horizontal
                          placeholder="Masukkan Konfirmasi Password..."
                        />
                    </div>
                </CCardBody>
                <CCardFooter>
                    <CButton @click="save" size="sm" color="primary"><CIcon name="cil-check-circle"/> Simpan</CButton>
                    <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban"/> Reset</CButton>
                </CCardFooter>
                </CForm>
            </CCard>
        </CCol>
    </CRow>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Errors } from '../containers/errors'
export default {
  name: 'GantiPassword',
  data () {
    return {
      password_lama: '',
      password_baru: '',
      konfirmasi_password: '',
      errors: new Errors()
    }
  },
  computed: {
    ...mapGetters({
      'user':'auth/user'
    }),
  },
  methods: {
    save(){
      let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
      let formData = {
        'password_lama' : this.password_lama,
        'password_baru' : this.password_baru,
        'konfirmasi_password': this.konfirmasi_password
      }
        
        this.axios.post('users/ganti-password', formData, config)
            .then((response) => {
                this.errors = new Errors
                this.password_baru = ""
                this.konfirmasi_password = ""
                this.password_lama = ""
                this.$notify({
                  group: 'foo',
                  type: 'success',
                  title: 'Success',
                  text: response.data.message,
                  duration: 3000,
                })
            })
            .catch((error) => {
              this.errors.record(error.response.data)
              this.$notify({
                group: 'foo',
                type: 'error',
                title: 'Error',
                text: error.response.data.message,
                duration: 3000,
              })
            })
    },
    validator (val) {
      return val ? false : true
    }
  }
}
</script>