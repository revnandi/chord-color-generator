<script setup lang="ts">
  import { useDark } from '@vueuse/core';
  import ColorPalette from './components/ColorPalette.vue' ;
  import ColorPaletteList from './components/ColorPaletteList.vue' ;
  import ColorPaletteListToolbar from './components/ColorPaletteListToolbar.vue';
  import ColorSeed from './components/ColorSeed.vue';
  import HiddenTitle from './components/HiddenTitle.vue';
  import Settings from './components/Settings.vue';
  import Synth from './components/Synth.vue';
  import Toolbar from './components/Toolbar.vue';
  import { store } from './store';

  // dark mode
  const isDark = useDark();

  // methods
  const changeBackgroundColor = (color: string) => {
    const styleRoot: HTMLElement = document.querySelector(':root')!;
    styleRoot.style.setProperty('--color-alt', color);
  };

  const handleColorSeedGenerated = (value: string) => {
    changeBackgroundColor(value);
    store.getColorPalette(value);
  };
</script>

<template>
  <div class="app-inner">
    <HiddenTitle>
      <h1>Chord Color Palettes</h1>
    </HiddenTitle>

    <Transition>
      <Toolbar v-if="store.currentView !== 'hello'"/>
    </Transition>

    <Transition>
      <section v-if="store.currentView === 'hello'" class="view">
        <HiddenTitle>
          <h1>Hello</h1>
        </HiddenTitle>
        <div class="wrapper">
          <div>
            <button @click="store.changeView('synth')">Ready to start?</button>
          </div>
        </div>
      </section>
    </Transition>

    <Transition name="slide">
      <section v-if="store.currentView === 'palettes'" class="view">
        <HiddenTitle>
          <h1>Saved Palettes</h1>
        </HiddenTitle>
        <div class="wrapper">
          <ColorPaletteList :palettes="store.savedPalettes">
            <ColorPaletteListToolbar/>
          </ColorPaletteList>
        </div>
      </section>
    </Transition>

    <Transition name="slide">
      <section v-if="store.currentView === 'synth'" class="view">
        <div class="wrapper column">
          
          <HiddenTitle>
            <h1>Keyboard</h1>
          </HiddenTitle>
          <Transition>
            <ColorSeed v-if="store.seed"/>
          </Transition>
          <ColorPalette :color-palette="store.colorPalette"/>
          <Synth
            @color-seed-generated="handleColorSeedGenerated"
            @reset="() => store.resetColorPalette"
          />
        </div>
      </section>
    </Transition>

    <Transition name="slide">
      <section v-if="store.currentView === 'settings'" class="view">
        <HiddenTitle>
          <h1>Settings</h1>
        </HiddenTitle>
        <div class="wrapper">
          <Settings />
        </div>
      </section>
    </Transition>

  </div>
</template>

<style scoped>

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
</style>
