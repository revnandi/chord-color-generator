<script setup lang="ts">
  import { store } from '../store';
  import ColorPalette from './ColorPalette.vue';
  import { IColorPalette } from '../types/color-api';

  interface IProps {
    palettes: IColorPalette[]
  };

  const props = defineProps<IProps>();
</script>

<template>
  <div class="container">
    <slot></slot>
    <ul class="list">
      <ColorPalette v-for="palette, index in props.palettes" :color-palette="palette">
        <button class="remove-button" @click="store.removePalette(index)">
          <svg width="1rem" height="1rem" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--color-main)">
            <path d="M21 21H9M15.889 14.89L8.464 7.463M2.893 12.607l9.193-9.193a2 2 0 012.828 0l4.95 4.95a2 2 0 010 2.828l-9.243 9.243a1.929 1.929 0 01-2.728 0l-5-5a2 2 0 010-2.828z" stroke="var(--color-main)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          Remove
        </button>
      </ColorPalette>
      <div v-if="props.palettes.length === 0" class="notice">No local palettes</div>
    </ul>
  </div>
</template>

<style scoped>

  .list {
    padding: 0;
    margin: 0;
  }

  .notice {
    margin-top: 2rem;
    text-align: center;
  }

  .remove-button {
    align-self: center;
    margin-left: 0.25rem;
  }
</style>