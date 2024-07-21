<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import IconSearch from './IconSearch.vue'
import ButtonSeach from './ButtonSeach.vue'
import { watch } from 'vue'

const route = useRoute()

watch(
  () => route.path,
  (newId, oldId) => {
    // caso eu tivesse que lidar com mudancas na rota
    //ex: chamar um endpoint para atualizar a mesma pagina caso se mudar o parametro
  }
)
</script>

<template>
  <header>
    <h2>Buscar CEP</h2>

    <div class="svg">
      <RouterLink v-if="route.fullPath === '/search'" to="/">
        <ButtonSeach buttonTitle="Home" />
      </RouterLink>
      <IconSearch />
    </div>
  </header>
</template>

<style scoped>
header {
  background: rgb(241, 151, 151);
  padding: 0.2rem 0;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
h2 {
  color: rgb(32, 30, 30);
  margin: 0 20px;
}
.svg {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0 20px;
}
</style>
