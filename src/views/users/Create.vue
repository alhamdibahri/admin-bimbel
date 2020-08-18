<template>
    <CContainer>
    <form v-on:submit.prevent="save" enctype="multipart/form-data">
    <CRow>
      <CCol sm="6">
        <CCard>
          <CCardBody>
            <div class="form-group">
                <label for="exampleInputEmail1">Nama</label>
                <input type="text" class="form-control" placeholder="Nama" v-model="nama">
                <div v-if="errors.get('nama')" style="color:red;">
                    <small>{{ errors.get('nama') }}</small>
                </div>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Username</label>
                <input type="text" class="form-control" placeholder="Username" v-model="username">
                <div v-if="errors.get('username')" style="color:red;">
                    <small>{{ errors.get('username') }}</small>
                </div>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">E-Mail</label>
                <input type="text" class="form-control" placeholder="E-Mail" v-model="email">
                <div v-if="errors.get('email')" style="color:red;">
                    <small>{{ errors.get('email') }}</small>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label" style="text-align: right;">Role</label>
                <div>
                    <Select2 v-model="role" :options="value"  :settings="{ placeholder: '-Pilih Role-', width: '100%' }"
                    />
                    <div v-if="errors.get('role')" style="color:red;">
                        <small>{{ errors.get('role') }}</small>
                    </div>
                </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="6">
        <CCard>
          <CCardBody>
            <div class="form-group">
                <label for="exampleInputEmail1">Password</label>
                <input type="password" class="form-control" placeholder="Password" v-model="password">
                <div v-if="errors.get('password')" style="color:red;">
                    <small>{{ errors.get('password') }}</small>
                </div>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">No Handphone</label>
                <input type="text" class="form-control" placeholder="No Handphone" v-model="no_handphone">
                <div v-if="errors.get('no_handphone')" style="color:red;">
                    <small>{{ errors.get('no_handphone') }}</small>
                </div>
            </div>
            <div class="form-group">
              <label for="exampleFormControlFile1">Foto</label>
              <input type="file" class="form-control-file" @change="handleFileUpload()" ref="foto" id="foto">
            </div>
            <div class="form-group">
                <label class="control-label" style="text-align: right;"></label>
                <div>
                    <CButton type="submit" color="primary" style="width:100%;">Save</CButton>
                </div>
            </div>
        </CCardBody>
        </CCard>
      </CCol>
    </CRow>
        <CButton
            to="/users"
            style="float:right; width:50px; height:50px; margin-bottom:20px;" color="success">
            <CIcon name="cil-chevron-left" size="xl" style="margin-top:6px;"/>
        </CButton>
    </form>
  </CContainer>
</template>

<script>
import { mapGetters } from 'vuex'
import { Errors } from '../../containers/errors'
export default {
  name: "create",
  data () {
    return {
        nama: '',
        username: '',
        role: '',
        foto: '',
        password: '',
        email: '',
        no_handphone:'',
        value: [],
        errors: new Errors()
    }
  },
  computed: {
    ...mapGetters({
      'user':'auth/user'
    }),
  },
  mounted(){
    this.getRoles()
  },
  methods: {
    getRoles(){
      let config = {
            headers:{
                'Authorization' : 'Bearer ' + this.user.token
            }
        }
        this.axios.get('ddlroles', config)
        .then((response) => {
            let values = response.data.values
            for(let x = 0; x<values.length; x++){
              this.value.push({id: values[x].id_role, text: values[x].role})
            }
          })
          .catch(error => {
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Error',
              text: error.response.data.message,
              duration: 3000,
            })
          });
    },
    handleFileUpload(){
      this.foto = this.$refs.foto.files[0]
    },
    save(){
        let config = {
            headers:{
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer ' + this.user.token
            },
        }

        // let formData = {
        //   'nama': this.nama,
        //   'username': this.username,
        //   'email': this.email,
        //   'password': this.password,
        //   'role': this.role,
        //   'no_handphone': this.no_handphone,
        //   'foto': this.foto
        // }

        let formData = new FormData();
        formData.append('nama', this.nama)
        formData.append('username', this.username)
        formData.append('email', this.email)
        formData.append('password', this.password)
        formData.append('role', this.role)
        formData.append('no_handphone', this.no_handphone)
        formData.append('foto', this.foto);

        this.axios.post('users/store', formData, config)
        .then((response) => {
            let message  = response.data.message
            this.$router.push({name: 'Data Users', params: {foo: message}})
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
        
    }
}

}
</script>