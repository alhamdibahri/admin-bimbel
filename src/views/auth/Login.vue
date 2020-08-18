<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <notifications group="foo" />
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <h1>Login</h1>
                <p class="text-muted">Masukkan username & password dengan benar!</p>
                <div v-if="errors.jum() > 0">
                  <CInput
                    placeholder="E-mail/Username"
                    autocomplete="off"
                    v-model="username"
                    :invalid-feedback="errors.get('username')"
                    name="username"
                    :is-valid="validator(errors.get('username'))"
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>
                  <CInput
                    placeholder="Password"
                    type="password"
                    autocomplete="off"
                    name="password"
                    :invalid-feedback="errors.get('password')"
                    v-model="password"
                    :is-valid="validator(errors.get('password'))"
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                </div>
                <div v-else>
                  <CInput
                    placeholder="E-mail/Username"
                    autocomplete="off"
                    v-model="username"
                    name="username"
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>
                  <CInput
                    placeholder="Password"
                    type="password"
                    autocomplete="off"
                    name="password"
                    v-model="password"
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                </div>
                
                <CButton :pesan="pesan" color="success" block @click="submit">MASUK SISTEM</CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { Errors } from '../../containers/errors'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Login',
  data(){
    return{
      username: '',
      password: '',
      errors: new Errors(),
      pesan:''
    }
  },
  mounted(){
    this.redirect()
  },
  computed:{
    ...mapGetters({
      user : 'auth/user',
    }),
  },
  methods:{
    ...mapActions({
      setAuth: 'auth/set'
    }),
    submit(){
      let formData = {
        'username': this.username,
        'password': this.password
      }
      this.axios.post('login', formData)
       .then((response) => {
          let values  = response.data.values
          if(values.role != 'ADMIN'){
            this.$notify({
              group: 'foo',
              type: 'warn',
              title: 'Peringatan',
              text: 'Anda tidak punya akses!',
              duration: 3000,
            })
          }else{
            this.setAuth(values)
            this.$router.push({name: 'Dashboard', params: {foo: response.data.message}})
          }
          
        })
        .catch(error => {
          this.errors.record(error.response.data)
          this.$notify({
            group: 'foo',
            type: 'warn',
            title: 'Peringatan',
            text: error.response.data.message,
            duration: 3000,
          })
        });
    },
    validator (val) {
      return val ? false : true
    },
    redirect(){
      if(this.user != null){
        this.$router.push({ name: 'Dashboard'});
      }
    }
  }
}
</script>
