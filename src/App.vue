<script setup lang="ts">
  import { useDark, useToggle } from "@vueuse/core";
  import Synth from './components/Synth.vue' ;
  import { ref, reactive } from 'vue';

  const isDark = useDark();
  const toggleDark = useToggle(isDark);

  interface Colors {
    imageUrl: null | string
  };

  const colorImage = ref('colorImage');

  const state = reactive(
    {
      currentView: 'settings',
      colorPalette: null
    }
  );

  const colors: Colors = reactive({ imageUrl: null });

  const changeBackgroundColor = (color: string) => {
    const styleRoot: HTMLElement = document.querySelector(':root')!;
    styleRoot.style.setProperty('--color-1', color);
  };

  const getColorPalette = (previousColor: string) => {
    const strippedColorString = previousColor.replace(' ', '').substring(1);

    fetch(`https://www.thecolorapi.com/scheme?rgb=${strippedColorString}&mode=analogic-complement`)
      .then(response => response.json())
      .then(response => {
        state.colorPalette = response;
        colors.imageUrl = response.image.named
      })
      .catch(err => console.error(err));
  };

  const handleColorSeedGenerated = (value: string) => {
    changeBackgroundColor(value);
    getColorPalette(value);
  };

  const changeState = (viewSlug: string) => {
    state.currentView = viewSlug;
  };

  // onMounted(() => {
  //   onsole.log(`The initial count is ${count.value}.`)
  // }) 
</script>

<template>
  <div>
    <div class="settings">
      <button @click="changeState(state.currentView === 'setting' ? 'synth' : 'settings')">
        <svg class="icon" width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff">
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M19.622 10.395l-1.097-2.65L20 6l-2-2-1.735 1.483-2.707-1.113L12.935 2h-1.954l-.632 2.401-2.645 1.115L6 4 4 6l1.453 1.789-1.08 2.657L2 11v2l2.401.655L5.516 16.3 4 18l2 2 1.791-1.46 2.606 1.072L11 22h2l.604-2.387 2.651-1.098C16.697 18.831 18 20 18 20l2-2-1.484-1.75 1.098-2.652 2.386-.62V11l-2.378-.605z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>
    </div>
    <Transition>
      <section v-if="state.currentView === 'hello'" class="view">
        <div class="wrapper">
          <div>
            <button @click="changeState('synth')">Ready to start?</button>
          </div>
        </div>
      </section>
    </Transition>
    <Transition name="slide">
      <section v-if="state.currentView === 'synth'" class="view">
        <div class="wrapper">
          <ul v-if="state.colorPalette">
            <li v-for="item in state.colorPalette.colors">
              <img :src="item.image.named" alt="">
            </li>
          </ul>
          <!-- <img v-if="colors.imageUrl" ref="colorImage" :src="colors.imageUrl"/>  -->
          <Synth @color-seed-generated="handleColorSeedGenerated"/>
        </div>
      </section>
    </Transition>
    <Transition name="slide">
      <section v-if="state.currentView === 'settings'" class="view">
        <div class="wrapper">
          <div>
            <div class="settings-grid">
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
            <input type="text">
            <button @click="changeState('synth')">Back</button>
          </div>
        </div>
      </section>
    </Transition>
  </div>
  <section>
    
  </section>
</template>

<style scoped>
  .settings {
    position: fixed;
    top: 1rem;
    right: 1rem;
  }

  .settings-grid {

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
    align-items: stretch;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    height: 100%;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: top 0.75s var(--ease-in-out), opacity 1s var(--ease-in-out);
  }

  .slide-enter-to {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 1;
  }

  .slide-enter-from {
    position: absolute;
    top: 100%;
    left: 0;
    opacity: 0;
  }

  .slide-leave-to {
    position: absolute;
    top: 100%;
    left: 0;
    opacity: 0;
  }

  .slide-leave-from {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 1;
  }


  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
