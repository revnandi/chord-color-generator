<script setup lang="ts">
  import { debounce } from 'lodash';
import type { ToneOscillatorType } from 'tone';
import * as Tone from 'tone';
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { mapRange } from '../utils';

  // interfaces
  interface IProps {
    settings: {
      waveform: ToneOscillatorType
    }
  };

  interface INote {
    name: string,
    freq: number
  };

  interface IState {
    activeKeys: string[],
    synthOptions: {
        polyphony: number,
      }
  };

  const props = defineProps<IProps>();

  //props
  const emit = defineEmits([
    'colorSeedGenerated',
    'reset'
  ]);

  // data
  const notes: {
    [key: string]: INote;
    } = {
      z: {
        name: 'A2',
        freq: 110.00,
      },
      x: {
        name: 'B2',
        freq: 123.47
      },
      c: {
        name: 'C3',
        freq: 130.81
      },
      v: {
        name: 'D3',
        freq: 146.83
      },
      b: {
        name: 'E3',
        freq: 164.81
      },
      n: {
        name: 'F3',
        freq: 174.61
      },
      m: {
        name: 'G3',
        freq: 196.00
      },
      a: {
        name: 'A3',
        freq: 220.00
      },
      s: {
        name: 'B3',
        freq: 246.94
      },
      d: {
        name: 'C4',
        freq: 261.63
      },
      f: {
        name: 'D4',
        freq: 293.66
      },
      g: {
        name: 'E4',
        freq: 329.63
      },
      h: {
        name: 'F4',
        freq: 349.23
      },
      j: {
        name: 'G4',
        freq: 392.00
      },
      k: {
        name: 'A4',
        freq: 440.00
      },
      l: {
        name: 'B4',
        freq: 493.88
      },
      q: {
        name: 'C5',
        freq: 523.25
      },
      w: {
        name: 'D5',
        freq: 587.33
      },
      e: {
        name: 'E5',
        freq: 659.25
      },
      r: {
        name: 'F5',
        freq: 698.46
      },
      t: {
        name: 'G5',
        freq: 783.99
      },
      y: {
        name: 'A5',
        freq: 880.00
      },
      u: {
        name: 'B5',
        freq: 987.77
      },
      i: {
        name: 'C6',
        freq: 1046.5
      },
      o: {
        name: 'D6',
        freq: 1174.6
      },
      p: {
        name: 'E6',
        freq: 1318.5
      },
  };

  // state
  const validKeys = [ 
    'q',
    'w',
    'e',
    'r',
    't',
    'z',
    'u',
    'i',
    'o',
    'p',
    'a',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'y',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm'
  ];

  const state: IState = reactive(
    {
      activeKeys: [],
      synthOptions: {
        polyphony: 3,
      }
    }
  );

  // @ts-ignore
  const row1: ref<NodeList | null> = ref(null);
  // @ts-ignore
  const row2: ref<NodeList | null> = ref(null);
  // @ts-ignore
  const row3: ref<NodeList | null> = ref(null);
  // @ts-ignore
  const keys: ref<[NodeList]> = ref([])
  
  // @ts-ignore
  const synth = new Tone.PolySynth({
    maxPolyphony: state.synthOptions.polyphony,
    volume: -6,
    options: {
      oscillator: {
        type: props.settings.waveform
      }
    }
  }).toDestination();

  synth.set({
    envelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.5,
      release: 0.8,
    }
  });

  const handleKeyPress = (event: KeyboardEvent) => {
    if(!validKeys.includes(event.key)) return;
    handleInput(event.key);
  };

  const handleKeyClick = (event: MouseEvent) => {
    const input = event.target as HTMLElement;
    const key = input.innerText.toLowerCase();
    handleInput(key);
  };

  const handleInput = (key: string) => {
    // validate key input
    if(state.activeKeys.includes(key) || state.activeKeys.length >= state.synthOptions.polyphony) return;

    // if number of active keys reaches max polyphony remove first item of a active keys
    // if(state.activeKeys.length >= state.synthOptions.polyphony) state.activeKeys.shift();

    state.activeKeys.push(key);

    const keyElement = keys.value[0].find((element: HTMLDivElement) => element.classList.contains(`key-${key}`));
    keyElement.classList.add(`active`);
    keyElement.classList.add(`active-${state.activeKeys.length}`);
    
    synth.triggerAttackRelease(notes[key].name, 0.35);

    if(state.activeKeys.length === state.synthOptions.polyphony) {
      const color1 = Math.round(mapRange(
        notes[state.activeKeys[0]].freq,
        notes['z'].freq,
        notes['p'].freq,
        0,
        255
      ));
      const color2 = Math.round(mapRange(
        notes[state.activeKeys[1]].freq,
        notes['z'].freq,
        notes['p'].freq,
        0,
        255
      ));
      const color3 = Math.round(mapRange(
        notes[state.activeKeys[2]].freq,
        notes['z'].freq,
        notes['p'].freq,
        0,
        255
      ));

      const generatedColor = `rgb(${color1}, ${color2}, ${color3})`;


      setTimeout(() => {
        synth.triggerAttackRelease(
          [
            notes[state.activeKeys[0]].name,
            notes[state.activeKeys[1]].name,
            notes[state.activeKeys[2]].name,
          ],
          1.15
        );

        emit('colorSeedGenerated', generatedColor);
      }, 1250);

    };
  };

  const resetSynth = () => {
    keys.value[0].forEach((element: HTMLElement) => {
      element.classList.remove('active');
      element.classList.remove('active-1');
      element.classList.remove('active-2');
      element.classList.remove('active-3');
    });

    state.activeKeys = [];

    emit('reset');

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");


    // fetch(`https://getpantry.cloud/apiv1/pantry/7414ee56-4f3a-4ab2-bb57-69e36e0362b1/basket/colors?body=${JSON.stringify({message: "testt"})}`)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify();

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow'
    // };

    // fetch("https://getpantry.cloud/apiv1/pantry/7414ee56-4f3a-4ab2-bb57-69e36e0362b1/basket/colors", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
  };

  // watchers
  watch(state.activeKeys, async (newQuestion, oldQuestion) => {

  })

  // lifecycle
  onMounted(() => {
    window.addEventListener('keydown', debounce(event => handleKeyPress(event), 80));

    keys.value.push(
      [...row1.value?.querySelectorAll('.key'),
      ...row2.value?.querySelectorAll('.key'),
      ...row3.value?.querySelectorAll('.key')
    ]);
    
  }),
  onBeforeUnmount(() => {
    console.log('unmounting')
      window.removeEventListener('keydown', debounce(event => handleKeyPress(event), 80));
  });
</script>

<template>
  <div class="keyboard">
    <div class="active-key-grid">
      <div class="active-key">{{ notes[state.activeKeys[0]] && notes[state.activeKeys[0]].name }}</div>
      <div class="active-key">{{ notes[state.activeKeys[1]] && notes[state.activeKeys[1]].name }}</div>
      <div class="active-key">{{ notes[state.activeKeys[2]] && notes[state.activeKeys[2]].name }}</div>
    </div>
    <div ref="row1" class="row">
      <div class="key key-q" @click="(event) => handleKeyClick(event)">Q</div>
      <div class="key key-w" @click="(event) => handleKeyClick(event)">W</div>
      <div class="key key-e" @click="(event) => handleKeyClick(event)">E</div>
      <div class="key key-r" @click="(event) => handleKeyClick(event)">R</div>
      <div class="key key-t" @click="(event) => handleKeyClick(event)">T</div>
      <div class="key key-z" @click="(event) => handleKeyClick(event)">Z</div>
      <div class="key key-u" @click="(event) => handleKeyClick(event)">U</div>
      <div class="key key-i" @click="(event) => handleKeyClick(event)">I</div>
      <div class="key key-o" @click="(event) => handleKeyClick(event)">O</div>
      <div class="key key-p" @click="(event) => handleKeyClick(event)">P</div>
    </div>
    <div ref="row2" class="row">
      <div class="key key-a" @click="(event) => handleKeyClick(event)">A</div>
      <div class="key key-s" @click="(event) => handleKeyClick(event)">S</div>
      <div class="key key-d" @click="(event) => handleKeyClick(event)">D</div>
      <div class="key key-f" @click="(event) => handleKeyClick(event)">F</div>
      <div class="key key-g" @click="(event) => handleKeyClick(event)">G</div>
      <div class="key key-h" @click="(event) => handleKeyClick(event)">H</div>
      <div class="key key-j" @click="(event) => handleKeyClick(event)">J</div>
      <div class="key key-k" @click="(event) => handleKeyClick(event)">K</div>
      <div class="key key-l" @click="(event) => handleKeyClick(event)">L</div>
    </div>
    <div ref="row3" class="row">
      <div class="key key-y" @click="(event) => handleKeyClick(event)">Y</div>
      <div class="key key-x" @click="(event) => handleKeyClick(event)">X</div>
      <div class="key key-c" @click="(event) => handleKeyClick(event)">C</div>
      <div class="key key-v" @click="(event) => handleKeyClick(event)">V</div>
      <div class="key key-b" @click="(event) => handleKeyClick(event)">B</div>
      <div class="key key-n" @click="(event) => handleKeyClick(event)">N</div>
      <div class="key key-m" @click="(event) => handleKeyClick(event)">M</div>
    </div>
    <button>
      <svg width="1rem" height="auto" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--color-main)">
        <path d="M6.906 4.537A.6.6 0 006 5.053v13.894a.6.6 0 00.906.516l11.723-6.947a.6.6 0 000-1.032L6.906 4.537z" stroke="var(--color-main)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
      Play again</button>
    <button @click="resetSynth()">
      <svg width="1rem" height="1rem" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--color-main)">
        <path d="M21.168 8A10.003 10.003 0 0012 2C6.815 2 2.55 5.947 2.05 11" stroke="var(--color-main)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M17 8h4.4a.6.6 0 00.6-.6V3M2.881 16c1.544 3.532 5.068 6 9.168 6 5.186 0 9.45-3.947 9.951-9" stroke="var(--color-main)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.05 16h-4.4a.6.6 0 00-.6.6V21" stroke="var(--color-main)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
      Reset
    </button>
  </div>
</template>

<style scoped>
  .keyboard {
    text-align: center;
  }
  .row {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.25rem;
  }
  .key {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid;
    border-color: var(--color-main);
    width: 4rem;
    height: 4rem;
    font-size: 2rem;
    color: var(--color-main);
    cursor: pointer;
    transition: color 0.3s var(--ease-in-out), background-color 0.3s var(--ease-in-out), border-color 0.3s var(--ease-in-out), opacity 0.3s var(--ease-in-out);
  }

  .key:hover {
    border-color: var(--color-alt);
    background-color: var(--color-main);
    color: var(--color-alt);
  }

  .key + * {
    margin-left: 0.25rem;
  }

  .key.active {
    position: relative;
    border-color: var(--color-alt);
    background-color: var(--color-main);
    color: var(--color-alt);
  }

  .key::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0.25em;
    font-size: 0.5em;
    opacity: 0;
  }

  .key.active::after {
    opacity: 1;
  }

  .key.active-1::after {
    content: '1'
  }

  .key.active-2::after {
    content: '2'
  }

  .key.active-3::after {
    content: '3'
  }

  .active-key-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 10ch;
    margin: 3rem auto;
    font-size: 2rem;
  }

  .active-key {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    padding: 0;
    margin: 0;
    list-style: none;
    border-bottom: 1px solid var(--color-main);
    color: var(--color-main);
    font-size: inherit;
    transition: color 0.3s var(--ease-in-out), background-color 0.3s var(--ease-in-out), border-color 0.3s var(--ease-in-out);
  }

  .active-key + * {
    margin-left: 0.25rem;
  }
</style>
