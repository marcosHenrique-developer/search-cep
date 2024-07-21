<template>
  <div class="main">
    <div class="content">
      <slot name="center"></slot>
    </div>
    <div>
      <slot name="side"></slot>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin: 2rem 0 0 0;
}
.main .content {
  display: flex;
  margin: 0;
  flex-direction: column;
  justify-items: center;
  gap: 1rem;
}
</style>
