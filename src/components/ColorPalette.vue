<script setup lang="ts">
import { reactive, computed } from 'vue';
import Spinner from './Spinner.vue';
import { IColorPalette } from '../types/color-api';

// interfaces
interface IProps {
  colorPalette?: IColorPalette
};

// interface IState {
//   isLoading: boolean
// }

// props
const props = defineProps<IProps>();

// // state
// const state: IState = reactive({
//   isLoading: false
// });

// // computed
// const showSpinner = computed(() =>  state.isLoading && )

</script>

<template>
  <div class="color-palette-container">
    <Spinner v-if="!props.colorPalette"/>
    <ul v-if="props.colorPalette" class="color-palette-list">
      <li v-for="item in props.colorPalette.colors" class="color-palette-item" :style="`background-color: ${item.hex.value};`">
        <h2 class="color-name">{{ item.name.value }}</h2>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .color-palette-container {
    display: flex;
    justify-content: center;
    min-height: 6.5rem;
    margin: 2rem 0;
  }

  .color-palette-list {
    display: flex;
    justify-content: center;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .color-palette-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 6.25rem;
    height: 6.25rem;
    border: 1px solid var(--color-main);
  }

  .color-palette-item + * {
    margin-left: 0.25rem;
  }

  .color-name {
    margin: 0;
    font-size: 0.75rem;
    text-align: center;
  }

</style>