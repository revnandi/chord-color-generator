<script setup lang="ts">
import { computed } from 'vue';
import { IColor } from '../types/color-api';

// interfaces
interface IProps {
  seed?: IColor
};

// props
const props = defineProps<IProps>();

// computed
// const seedCode = computed(() => `{seed.}`)

</script>

<template>
  <div class="color-seed-container">
    <div v-if="props.seed" class="color-palette-list">
      <h2>Seed: {  }</h2>
    </div>
  </div>
</template>

<style>

</style>