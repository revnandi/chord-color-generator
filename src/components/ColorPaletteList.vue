<script setup lang="ts">
  import ColorPalette from './ColorPalette.vue';
  import { IColorPalette } from '../types/color-api';

  interface IProps {
    palettes: IColorPalette[]
  };

  const props = defineProps<IProps>();
</script>

<template>
  <div>
    <ul>
      <ColorPalette v-for="palette in props.palettes" :color-palette="palette"/>
    </ul>
  </div>
</template>

<stlye>

</stlye>