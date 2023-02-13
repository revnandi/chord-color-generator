<script setup lang="ts">
  import { computed } from 'vue';

  // interfaces
  interface IProps {
    min: number,
    max: number,
    modelValue: number
  };

  // props
  const props = defineProps<IProps>();

  // emits
  const emit = defineEmits([
    'update:modelValue',
  ]);

  // computed
  const value = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', Number(value))
    }
  })
</script>

<template>
  <div class="container">
    <label for="volume">Volume</label>
    <input
      type="range"
      :min="props.min"
      :max="props.max"
      v-model="value"
      class="input"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
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
  border: none;
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