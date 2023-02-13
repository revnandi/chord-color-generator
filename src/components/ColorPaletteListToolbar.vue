<script setup lang="ts">
  import { store } from '../store';
</script>

<template scoped>
  <div class="container">
    <button @click="store.changeView('synth')">Back</button>
    <button @click="store.loadPalettesFromCloud">Load from Cloud</button>
  </div>
</template>

<style scoped> 
  .container {
    min-width: 32.875rem;
    display: flex;
    justify-content: space-between;
    padding-top: 6.25rem;
  }
</style>