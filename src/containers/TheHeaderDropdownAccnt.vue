<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <CImg
            :src="getFoto()"
            class="c-avatar-img"
          />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Account</strong>
    </CDropdownHeader>
    <CDropdownItem @click="profile()">
      <CIcon name="cil-user"/> Profile
    </CDropdownItem>
    <CDropdownItem @click="gantiPassword()">
      <CIcon name="cil-lock-locked" /> Ganti Password
    </CDropdownItem>
    <CDropdownItem @click="logout">
      <CIcon name="cil-account-logout"/> Logout
    </CDropdownItem>
    <!-- <CDropdownDivider/> -->
  </CDropdown>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return {
      urlFoto: 'http://192.168.43.116:8081/foto_user/',
      itemsCount: 42,
      warningModal: false,
    }
  },
  computed: {
    ...mapGetters({
      'user':'auth/user'
    }),
  },
  methods:{
    ...mapActions({
      setAuth: 'auth/set'
    }),
    getFoto(){
      return this.urlFoto + this.user.foto
    },
    logout(){
      this.setAuth({})
      this.$router.push({name: 'Login'})
      // alert('logout')
    },
    profile(){
      this.$router.push({name: 'Profile'})
    },
    gantiPassword(){
      this.$router.push({name: 'Ganti Password'})
    }
  }
  
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>