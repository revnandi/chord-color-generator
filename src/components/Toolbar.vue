<script setup lang="ts">
import { store } from '../store';
</script>

<template>
  <div class="toolbar">
    <button @click="store.changeView(store.currentView === 'palettes' ? 'synth' : 'palettes')" aria-label="color palettes">
      <svg class="icon" width="1.5rem" height="1.5rem" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--color-main)">
        <path d="M20.51 9.54a1.899 1.899 0 01-1 1.09A7 7 0 0015.37 17c.001.47.048.939.14 1.4a2.16 2.16 0 01-.31 1.65 1.79 1.79 0 01-1.21.8 9 9 0 01-10.62-9.13A9.05 9.05 0 0111.85 3h.51a9 9 0 018.06 5 2 2 0 01.09 1.52v.02z" stroke="var(--color-main)" stroke-width="1.5"></path>
        <path d="M8 16.01l.01-.011M6 12.01l.01-.011M8 8.01l.01-.011M12 6.01l.01-.011M16 8.01l.01-.011" stroke="var(--color-main)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
      Palettes
    </button>
    <button @click="store.changeView(store.currentView === 'settings' ? 'synth' : 'settings')" aria-label="settings">
      <svg class="icon" width="1.5rem" height="1.5rem" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--color-main)">
        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="var(--color-main)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M19.622 10.395l-1.097-2.65L20 6l-2-2-1.735 1.483-2.707-1.113L12.935 2h-1.954l-.632 2.401-2.645 1.115L6 4 4 6l1.453 1.789-1.08 2.657L2 11v2l2.401.655L5.516 16.3 4 18l2 2 1.791-1.46 2.606 1.072L11 22h2l.604-2.387 2.651-1.098C16.697 18.831 18 20 18 20l2-2-1.484-1.75 1.098-2.652 2.386-.62V11l-2.378-.605z" stroke="var(--color-main)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
      Settings
    </button>
  </div>
</template>

<style>
  .toolbar {
    position: fixed;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
  }

  .toolbar > * + * {
    margin-left: 0.25rem;
  }
</style>