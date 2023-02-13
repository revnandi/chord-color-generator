<script setup lang="ts">
import { store } from '../store';

</script>

<template>
  <div class="container">
    <div class="info">
      <span class="code">{{ `code: rgb(${store.seed?.rgb.r}, ${store.seed?.rgb.g}, ${store.seed?.rgb.b})` }}</span>
      <span class="name">{{ `name: ${store.seed?.name.value}` }}</span>
    </div>
    <button @click="store.saveCurrentPalette">Add to Collection</button>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    min-width: 32.875rem;
  }

  .inner {
    display: flex;
    align-items: baseline;
  }

  .code, .name {
    color: var(--color-main);
  }

  .info {
    display: flex;
    flex-direction: column;
  }
</style>