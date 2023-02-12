<script setup lang="ts">
  import { useDark, useToggle } from '@vueuse/core';
  import ColorPalette from './components/ColorPalette.vue' ;
  import ColorPaletteList from './components/ColorPaletteList.vue' ;
  import HiddenTitle from './components/HiddenTitle.vue';
  import RangeSlider from './components/RangeSlider.vue';
  import Synth from './components/Synth.vue' ;
  import { ref, reactive } from 'vue';
  import  { IColorPalette, ColorMode } from './types/color-api';
  import type { ToneOscillatorType } from 'tone';

  // dark mode
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
  
  // interfaces
  interface IState {
    currentView: string,
    colorPalette?: IColorPalette
    settings: {
      color: {
        mode: ColorMode
      },
      synth: {
        waveform: ToneOscillatorType,
        volume: number
      }
    },
    savedPalettes: IColorPalette[]
  };

  // data/state
  const state: IState = reactive(
    {
      currentView: 'hello',
      colorPalette: undefined,
      settings: {
        color: {
          mode: 'complement'
        },
        synth: {
          waveform: 'triangle',
          volume: -6,
        }
      },
      savedPalettes: []
    }
  );

  // methods
  const changeBackgroundColor = (color: string) => {
    const styleRoot: HTMLElement = document.querySelector(':root')!;
    styleRoot.style.setProperty('--color-alt', color);
  };

  const getColorPalette = (previousColor: string) => {
    const strippedColorString = previousColor.replace(' ', '').substring(1);

    fetch(`https://www.thecolorapi.com/scheme?rgb=${strippedColorString}&mode=${state.settings.color.mode}`)
      .then(response => response.json())
      .then(response => {
        state.colorPalette = response;
      })
      .catch(err => console.error(err));
  };

  const handleColorSeedGenerated = (value: string) => {
    changeBackgroundColor(value);
    getColorPalette(value);
  };

  const savePaletteToCloud = () => {
    if(!state.colorPalette) return;

    state.savedPalettes.push(state.colorPalette);

    // const imageUrlData = new FormData();
    // imageUrlData.append('url', state.colorPalette.image.named);

    // const fetchOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   body: imageUrlData
    // };

    // fetch(`https://0x0.st`, fetchOptions)
    //   .then(response => response.json())
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(err => console.error(err));
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify(Object.assign({}, state.savedPalettes));

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };

    fetch('https://getpantry.cloud/apiv1/pantry/7414ee56-4f3a-4ab2-bb57-69e36e0362b1/basket/colors', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  const loadPalettesFromLCoud = () => {
    fetch('https://getpantry.cloud/apiv1/pantry/7414ee56-4f3a-4ab2-bb57-69e36e0362b1/basket/colors')
      .then(response => response.text())
      .then(result => 
        state.savedPalettes = Object.values(JSON.parse(result))
      )
      .catch(error => console.log('error', error));
  };

  const changeView = (viewSlug: string) => {
    state.currentView = viewSlug;
  };

  const resetApp = () => {
    // const styleRoot: HTMLElement = document.querySelector(':root')!;

    // styleRoot.style.setProperty(isDark ? '--color-main' :, isDark ? '#fff' : '#000');

    state.colorPalette = undefined;
  };

  // onMounted(() => {
  //   onsole.log(`The initial count is ${count.value}.`)
  // }) 
</script>

<template>
  <div class="app-inner">
    <HiddenTitle>
      <h1>Chord Color Palettes</h1>
    </HiddenTitle>
    <div class="toolbar">
      <button @click="changeView('palettes')" aria-label="color palettes">
        <svg class="icon" width="1.5rem" height="1.5rem" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--color-main)">
          <path d="M20.51 9.54a1.899 1.899 0 01-1 1.09A7 7 0 0015.37 17c.001.47.048.939.14 1.4a2.16 2.16 0 01-.31 1.65 1.79 1.79 0 01-1.21.8 9 9 0 01-10.62-9.13A9.05 9.05 0 0111.85 3h.51a9 9 0 018.06 5 2 2 0 01.09 1.52v.02z" stroke="var(--color-main)" stroke-width="1.5"></path>
          <path d="M8 16.01l.01-.011M6 12.01l.01-.011M8 8.01l.01-.011M12 6.01l.01-.011M16 8.01l.01-.011" stroke="var(--color-main)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        Palettes
      </button>
      <button @click="changeView(state.currentView === 'setting' ? 'synth' : 'settings')" aria-label="settings">
        <svg class="icon" width="1.5rem" height="1.5rem" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--color-main)">
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="var(--color-main)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M19.622 10.395l-1.097-2.65L20 6l-2-2-1.735 1.483-2.707-1.113L12.935 2h-1.954l-.632 2.401-2.645 1.115L6 4 4 6l1.453 1.789-1.08 2.657L2 11v2l2.401.655L5.516 16.3 4 18l2 2 1.791-1.46 2.606 1.072L11 22h2l.604-2.387 2.651-1.098C16.697 18.831 18 20 18 20l2-2-1.484-1.75 1.098-2.652 2.386-.62V11l-2.378-.605z" stroke="var(--color-main)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        Settings
      </button>
    </div>

    <Transition>
      <section v-if="state.currentView === 'hello'" class="view">
        <HiddenTitle>
          <h1>Hello</h1>
        </HiddenTitle>
        <div class="wrapper">
          <div>
            <button @click="changeView('synth')">Ready to start?</button>
          </div>
        </div>
      </section>
    </Transition>

    <Transition>
      <section v-if="state.currentView === 'palettes'" class="view">
        <HiddenTitle>
          <h1>Saved Palettes</h1>
        </HiddenTitle>
        <div class="wrapper">
          <div>
            <button @click="loadPalettesFromLCoud">Load from Cloud</button>
            <ColorPaletteList :palettes="state.savedPalettes"/>
          </div>
        </div>
      </section>
    </Transition>

    <Transition name="slide">
      <section v-if="state.currentView === 'synth'" class="view">
        <div class="wrapper column">
          <button @click="savePaletteToCloud()">Save Palette</button>
          <HiddenTitle>
            <h1>Keyboard</h1>
          </HiddenTitle>
          <ColorPalette :color-palette="state.colorPalette"/>
          <Synth
            @color-seed-generated="handleColorSeedGenerated"
            @reset="resetApp"
            :settings="state.settings.synth"
          />
        </div>
      </section>
    </Transition>

    <Transition name="slide">
      <section v-if="state.currentView === 'settings'" class="view">
        <HiddenTitle>
          <h1>Settings</h1>
        </HiddenTitle>
        <div class="wrapper">
          <div>
            <div class="settings-grid">
              <div class="settings-field">
              <label for="color-mode">Color Mode</label>
                <select name="color-mode" v-model="state.settings.color.mode">
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
              <div class="settings-field">
                <label for="waveform-select">Synth waveform</label>
                <select name="waveform-select" v-model="state.settings.synth.waveform">
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
              <div class="settings-field">
                <RangeSlider :min="-100" :max="0" :model-value="state.settings.synth.volume"/>
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
            <button @click="changeView('synth')">Back</button>
          </div>
        </div>
      </section>
    </Transition>

  </div>
</template>

<style scoped>
  .app-inner {
  }
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

  .dark-mode-switch-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .view {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    min-height: 100dvh;
  }

  .wrapper {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    height: 100%;
  }

  .wrapper.column {
    flex-direction: column;
  }

  .settings-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 3rem;
  }

  .settings-field {
    display: grid;
  }

  .settings-field label {

  }
</style>
