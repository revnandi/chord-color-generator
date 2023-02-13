<script setup lang="ts">
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
      <ColorPalette v-for="palette in props.palettes" :color-palette="palette"/>
      <div v-if="props.palettes.length === 0" class="notice">No local palettes</div>
    </ul>
  </div>
</template>

<style scoped>
  .container {
    
  }

  .list {
    padding: 0;
    margin: 0;
  }

  .notice {
    margin-top: 2rem;
    text-align: center;
  }
</style>