<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ButtonSearch from '../components/ButtonSeach.vue'
import HomeContent from '../components/HomeContent.vue'
</script>

<template>
  <HomeContent>
    <template #center>
      <h1>Pesquise um endereço</h1>
      <p>
        Quer encontrar um endereço mas não sabe como ? <br />clique no botão de busca e pesquise um
        de modo fácil e rápido.
      </p>
      <RouterLink to="/search">
        <ButtonSearch buttonTitle="Ir para Busca" />
      </RouterLink>
    </template>
    <template #side>
      <img src="../assets/imagem-busca.jpeg" alt="Imagem de busca" />
    </template>
  </HomeContent>
  <div class="main">
    <div class="content"></div>
  </div>
</template>
<style scoped>
img {
  border-radius: 3rem;
}
</style>
