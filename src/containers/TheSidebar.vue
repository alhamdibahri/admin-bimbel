<template>
  <CSidebar 
    fixed 
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/" style="text-decoration:none;">
      <!-- <CIcon 
        class="d-block" 
        name="cil-school" 
        size="custom-size" 
        :height="35" 
        :viewBox="`0 0 ${minimize ? 110 : 556} 134`"
      /> -->
      <div style="font-size:20px;">
        <b>Admin Bimbingan Belajar</b> 
      </div>
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="$options.nav"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'

export default {
  name: 'TheSidebar',
  nav,
  computed: {
    show () {
      return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    }
  }
}
</script>
