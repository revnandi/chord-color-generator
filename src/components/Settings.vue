<script setup lang="ts">
import { store } from '../store';
import { useDark, useToggle } from '@vueuse/core';
import RangeSlider from './RangeSlider.vue';

// dark mode
const isDark = useDark();
const toggleDark = useToggle(isDark);

</script>

<template>
  <div class="container">
    <div class="grid">
      <div class="field">
        <label for="color-mode">Color Mode</label>
        <select name="color-mode" v-model="store.settings.color.mode">
          <option value="monochrome">Monochrome</option>
          <option value="monochrome-dark">Monochrome-dark</option>
          <option value="monochrome-light">Monochrome-light</option>
          <option value="analogic">Analogic</option>
          <option value="complement">Complement</option>
          <option value="analogic-complement">Analogic-complement</option>
          <option value="triad">Triad</option>
          <option value="quad">Quad</option>
        </select>
      </div>
      <div class="field">
        <label for="waveform-select">Synth waveform</label>
        <select name="waveform-select" v-model="store.settings.synth.waveform">
          <option value="sawtooth">sawtooth</option>
          <option value="sine">sine</option>
          <option value="square">square</option>
          <option value="triangle">triangle</option>
          <option value="sine1">sine1</option>
          <option value="sine2">sine2</option>
          <option value="sine3">sine3</option>
          <option value="sine4">sine4</option>
          <option value="sine5">sine5</option>
          <option value="sine6">sine6</option>
          <option value="sine7">sine7</option>
          <option value="sine8">sine8</option>
          <option value="sine9">sine9</option>
          <option value="sine10">sine10</option>
          <option value="sine11">sine11</option>
          <option value="sine12">sine12</option>
          <option value="sine13">sine13</option>
          <option value="sine14">sine14</option>
          <option value="sine15">sine15</option>
          <option value="sine16">sine16</option>
          <option value="sine17">sine17</option>
          <option value="sine18">sine18</option>
          <option value="sine19">sine19</option>
          <option value="sine20">sine20</option>
          <option value="sine21">sine21</option>
          <option value="sine22">sine22</option>
          <option value="sine23">sine23</option>
          <option value="sine24">sine24</option>
          <option value="sine25">sine25</option>
          <option value="sine26">sine26</option>
          <option value="sine27">sine27</option>
          <option value="sine28">sine28</option>
          <option value="sine29">sine29</option>
          <option value="sine30">sine30</option>
          <option value="sine31">sine31</option>
          <option value="sine32">sine32</option>
          <option value="square1">square1</option>
          <option value="square2">square2</option>
          <option value="square3">square3</option>
          <option value="square4">square4</option>
          <option value="square5">square5</option>
          <option value="square6">square6</option>
          <option value="square7">square7</option>
          <option value="square8">square8</option>
          <option value="square9">square9</option>
          <option value="square10">square10</option>
          <option value="square11">square11</option>
          <option value="square12">square12</option>
          <option value="square13">square13</option>
          <option value="square14">square14</option>
          <option value="square15">square15</option>
          <option value="square16">square16</option>
          <option value="square17">square17</option>
          <option value="square18">square18</option>
          <option value="square19">square19</option>
          <option value="square20">square20</option>
          <option value="square21">square21</option>
          <option value="square22">square22</option>
          <option value="square23">square23</option>
          <option value="square24">square24</option>
          <option value="square25">square25</option>
          <option value="square26">square26</option>
          <option value="square27">square27</option>
          <option value="square28">square28</option>
          <option value="square29">square29</option>
          <option value="square30">square30</option>
          <option value="square31">square31</option>
          <option value="square32">square32</option>
          <option value="triangle1">triangle1</option>
          <option value="triangle2">triangle2</option>
          <option value="triangle3">triangle3</option>
          <option value="triangle4">triangle4</option>
          <option value="triangle5">triangle5</option>
          <option value="triangle6">triangle6</option>
          <option value="triangle7">triangle7</option>
          <option value="triangle8">triangle8</option>
          <option value="triangle9">triangle9</option>
          <option value="triangle10">triangle10</option>
          <option value="triangle11">triangle11</option>
          <option value="triangle12">triangle12</option>
          <option value="triangle13">triangle13</option>
          <option value="triangle14">triangle14</option>
          <option value="triangle15">triangle15</option>
          <option value="triangle16">triangle16</option>
          <option value="triangle17">triangle17</option>
          <option value="triangle18">triangle18</option>
          <option value="triangle19">triangle19</option>
          <option value="triangle20">triangle20</option>
          <option value="triangle21">triangle21</option>
          <option value="triangle22">triangle22</option>
          <option value="triangle23">triangle23</option>
          <option value="triangle24">triangle24</option>
          <option value="triangle25">triangle25</option>
          <option value="triangle26">triangle26</option>
          <option value="triangle27">triangle27</option>
          <option value="triangle28">triangle28</option>
          <option value="triangle29">triangle29</option>
          <option value="triangle30">triangle30</option>
          <option value="triangle31">triangle31</option>
          <option value="triangle32">triangle32</option>
          <option value="sawtooth1">sawtooth1</option>
          <option value="sawtooth2">sawtooth2</option>
          <option value="sawtooth3">sawtooth3</option>
          <option value="sawtooth4">sawtooth4</option>
          <option value="sawtooth5">sawtooth5</option>
          <option value="sawtooth6">sawtooth6</option>
          <option value="sawtooth7">sawtooth7</option>
          <option value="sawtooth8">sawtooth8</option>
          <option value="sawtooth9">sawtooth9</option>
          <option value="sawtooth10">sawtooth10</option>
          <option value="sawtooth11">sawtooth11</option>
          <option value="sawtooth12">sawtooth12</option>
          <option value="sawtooth13">sawtooth13</option>
          <option value="sawtooth14">sawtooth14</option>
          <option value="sawtooth15">sawtooth15</option>
          <option value="sawtooth16">sawtooth16</option>
          <option value="sawtooth17">sawtooth17</option>
          <option value="sawtooth18">sawtooth18</option>
          <option value="sawtooth19">sawtooth19</option>
          <option value="sawtooth20">sawtooth20</option>
          <option value="sawtooth21">sawtooth21</option>
          <option value="sawtooth22">sawtooth22</option>
          <option value="sawtooth23">sawtooth23</option>
          <option value="sawtooth24">sawtooth24</option>
          <option value="sawtooth25">sawtooth25</option>
          <option value="sawtooth26">sawtooth26</option>
          <option value="sawtooth27">sawtooth27</option>
          <option value="sawtooth28">sawtooth28</option>
          <option value="sawtooth29">sawtooth29</option>
          <option value="sawtooth30">sawtooth30</option>
          <option value="sawtooth31">sawtooth31</option>
          <option value="sawtooth32">sawtooth32</option>
        </select>
      </div>
      <div class="field">
        <label for="color-mode">Synth Notes</label>
        <select name="color-mode" v-model="store.settings.synth.notes">
          <option value="all">All</option>
          <option value="onlyWhite">Only white keys</option>
        </select>
      </div>
      <div class="field">
        <RangeSlider
          :min="-50"
          :max="0"
          :modelValue="store.settings.synth.volume"
          @update:modelValue="newValue => store.setVolume(newValue)"
        />
      </div>
      <div class="dark-mode-switch-container">
        <svg class="icon" width="2rem" height="2rem" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 11.507a9.493 9.493 0 0018 4.219c-8.507 0-12.726-4.22-12.726-12.726A9.494 9.494 0 003 11.507z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        <label for="switch" class="switch">
          <input type="checkbox" id="switch" name="switch" role="switch" @click="toggleDark()">
          <span class="slider round"></span>
        </label>
        <svg class="icon" width="2rem" height="2rem" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 18a6 6 0 100-12 6 6 0 000 12zM22 12h1M12 2V1M12 23v-1M20 20l-1-1M20 4l-1 1M4 20l1-1M4 4l1 1M1 12h1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </div>
    </div>
    <button class="back-button" @click="store.changeView('synth')">Back</button>
  </div>
</template>

<style scoped>
  .container {

  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 3rem;
  }

  .field {
    display: grid;
  }

  .dark-mode-switch-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .back-button {
    margin-top: 2rem;
  }
</style>