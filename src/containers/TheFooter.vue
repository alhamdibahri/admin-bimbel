<template>
  <CFooter :fixed="false">
    <div>
      <a href="https://github.com/alhamdibahri" target="_blank">AlhamdiBahri</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} bimbel.</span>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
