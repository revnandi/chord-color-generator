<script setup lang="ts">
  interface IProps {
    min: number,
    max: number,
    modelValue: number
  };

const props = defineProps<IProps>();
</script>

<template>
  <div class="container">
    <label for="volume">Volume</label>
    <input type="range" :min="props.min" :max="props.max" value="-6" class="input"/>
  </div>
</template>

<style scoped>
.container {

}

label {
  margin-bottom: 0.5rem;
  color: var(--color-main);
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  transition: background-color 0.3s var(--ease-in-out), color 0.3s var(--ease-in-out);
}

input {
  -webkit-appearance: none;
  appearance: none;
  height: 0.25rem;
  padding: 0;
  background: var(--color-main);
  outline: none;
  cursor: pointer;
}

input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: .625rem;
  height: 0.625rem;
  background: var(--color-alt);
  border-radius: 50%;
  border: 1px solid var(--color-main);
}

input::-moz-range-thumb {
  width: .625rem;
  height: 0.625rem;
  background: var(--color-alt);
  border-radius: 50%;
  border: 1px solid var(--color-main);
}
</style>