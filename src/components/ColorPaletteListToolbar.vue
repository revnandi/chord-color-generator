<script setup lang="ts">
  import { store } from '../store';
</script>

<template scoped>
  <div class="container">
    <button @click="store.changeView('synth')">Back</button>
    <button @click="store.savePalettesToCloud">Save Palettes to Cloud</button>
    <button @click="store.loadPalettesFromCloud">Load Palettes from Cloud</button>
  </div>
</template>

<style scoped> 
  .container {
    min-width: 32.875rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.25rem;
    padding-top: 6.25rem;
  }
</style>