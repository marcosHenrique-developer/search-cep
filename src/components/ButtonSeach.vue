<script lang="ts" setup>
defineProps<{
  buttonTitle: string
}>()
</script>

<template>
  <button>{{ buttonTitle }}</button>
</template>

<style scoped>
button {
  padding: 0.6rem;
  border-radius: 5px;
  border: none;
  background: rgb(61, 157, 246);
}
button:hover {
  background: rgb(41, 101, 157);
  transition: 0.3s ease-in-out;
  cursor: pointer;
}
</style>
