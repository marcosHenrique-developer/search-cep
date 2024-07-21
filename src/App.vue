<script setup lang="ts">
import ButtonSearch from './components/ButtonSeach.vue'
import HeaderSearch from './components/HeaderSearch.vue'

// const isHomePage = route.fullPath !== '/'
</script>

<template>
  <HeaderSearch />

  <RouterView />
</template>
