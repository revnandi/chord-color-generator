<script setup lang="ts">
import { store } from '../store';
import { debounce } from 'lodash';
import type { ToneOscillatorType } from 'tone';
import type { Notes } from '../types/synth'
import * as Tone from 'tone';
import { onBeforeUnmount, onMounted, reactive, computed, ref } from 'vue';
import type { Ref } from 'vue'
import { mapRange } from '../utils';

  // interfaces
  interface IState {
    keys: Element[]
    activeKeys: string[],
    synthOptions: {
        polyphony: number,
      }
  };

  // emits
  const emit = defineEmits([
    'colorSeedGenerated',
    'reset'
  ]);

  // data
  const notes: Notes = {
    all: {
      y: {
        name: 'G3',
        freq: 196.00,
      },
      x: {
        name: 'G#3',
        freq: 207.65
      },
      c: {
        name: 'A3',
        freq: 220.00	
      },
      v: {
        name: 'A#3',
        freq: 233.08
      },
      b: {
        name: 'B3',
        freq: 246.94
      },
      n: {
        name: 'C4',
        freq: 261.63
      },
      m: {
        name: 'C#4',
        freq: 277.18
      },
      a: {
        name: 'D4',
        freq: 293.66
      },
      s: {
        name: 'D#4',
        freq: 311.13
      },
      d: {
        name: 'E4',
        freq: 329.63
      },
      f: {
        name: 'F4',
        freq: 349.23
      },
      g: {
        name: 'F#4',
        freq: 369.99
      },
      h: {
        name: 'G4',
        freq: 392.00
      },
      j: {
        name: 'G#4',
        freq: 415.30
      },
      k: {
        name: 'A4',
        freq: 440.00
      },
      l: {
        name: 'A#4',
        freq: 466.16
      },
      q: {
        name: 'B4',
        freq: 493.88
      },
      w: {
        name: 'C5',
        freq: 523.25
      },
      e: {
        name: 'C#5',
        freq: 554.37
      },
      r: {
        name: 'D5',
        freq: 587.33
      },
      t: {
        name: 'D#5',
        freq: 622.25
      },
      z: {
        name: 'E5',
        freq: 659.25
      },
      u: {
        name: 'F5',
        freq: 698.46
      },
      i: {
        name: 'F#5',
        freq: 739.99
      },
      o: {
        name: 'G5',
        freq: 783.99
      },
      p: {
        name: 'G#5',
        freq: 830.61
      },
    },
    onlyWhite: {
      y: {
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
      z: {
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
    }
  }

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
      keys: [],
      activeKeys: [],
      synthOptions: {
        polyphony: 3
      }
    }
  );

  // computed
  const polyPhonyLimitReached = computed(() =>  (state.activeKeys.length >= state.synthOptions.polyphony))

  const colorRValue = computed(() => {
    return state.activeKeys[0] ? Math.round(mapRange(
      notes[store.settings.synth.notes][state.activeKeys[0]].freq,
      notes[store.settings.synth.notes]['y'].freq,
      notes[store.settings.synth.notes]['p'].freq,
      0,
      255
    )) : null;
  });

  const colorGValue = computed(() => {
    return state.activeKeys[1] ? Math.round(mapRange(
      notes[store.settings.synth.notes][state.activeKeys[1]].freq,
      notes[store.settings.synth.notes]['y'].freq,
      notes[store.settings.synth.notes]['p'].freq,
      0,
      255
    )) : null;
  });

  const colorBValue = computed(() => {
    return state.activeKeys[2] ? Math.round(mapRange(
      notes[store.settings.synth.notes][state.activeKeys[2]].freq,
      notes[store.settings.synth.notes]['y'].freq,
      notes[store.settings.synth.notes]['p'].freq,
      0,
      255
    )) : null;
  });


  const row1: Ref<NodeList | null> = ref(null);
  
  const row2: Ref<NodeList | null> = ref(null);

  const row3: Ref<NodeList | null> = ref(null);

  // @ts-ignore
  const synth = new Tone.PolySynth({
    maxPolyphony: state.synthOptions.polyphony,
    volume: store.settings.synth.volume,
    options: {
      oscillator: {
        type: store.settings.synth.waveform
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

  const playChord = () => {
    synth.triggerAttackRelease(
      [
        notes[store.settings.synth.notes][state.activeKeys[0]].name,
        notes[store.settings.synth.notes][state.activeKeys[1]].name,
        notes[store.settings.synth.notes][state.activeKeys[2]].name,
      ],
      1.15
    );
  };

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
    if(store.currentView !== 'synth') return;
    if(state.activeKeys.includes(key) || polyPhonyLimitReached.value) return;

    state.activeKeys.push(key);

    // add active classes to clicked/pressed keys
    const keyElement = state.keys.find(item => item.classList.contains(`key-${key}`));
    keyElement?.classList.add(`active`);
    keyElement?.classList.add(`active-${state.activeKeys.length}`);
    
    // play single note
    synth.triggerAttackRelease(notes[store.settings.synth.notes][key].name, 0.35);

    if(state.activeKeys.length === state.synthOptions.polyphony) {

      const generatedColor = `rgb(${colorRValue.value}, ${colorGValue.value}, ${colorBValue.value})`;

      setTimeout(() => {
        playChord();

        emit('colorSeedGenerated', generatedColor);
      }, 1250);

    };
  };

  const resetSynth = () => {

   state.keys.forEach((element: Element) => {
      element.classList.remove('active');
      element.classList.remove('active-1');
      element.classList.remove('active-2');
      element.classList.remove('active-3');
    });

    state.activeKeys = [];

    emit('reset');
  };

  // lifecycle
  onMounted(() => {
    window.addEventListener('keydown', debounce(event => handleKeyPress(event), 80));

    state.keys =[
      // @ts-ignore
      ...row1.value?.querySelectorAll('.key'),
      // @ts-ignore
      ...row2.value?.querySelectorAll('.key'),
      // @ts-ignore
      ...row3.value?.querySelectorAll('.key')
    ];
    
  }),
  onBeforeUnmount(() => {
      window.removeEventListener('keydown', debounce(event => handleKeyPress(event), 80));
  });
</script>

<template>
  <div class="keyboard">
    <div class="active-key-grid">
      <div class="active-key" :data-number="colorRValue">{{ notes[store.settings.synth.notes][state.activeKeys[0]] && notes[store.settings.synth.notes][state.activeKeys[0]].name }}</div>
      <div class="active-key" :data-number="colorGValue">{{ notes[store.settings.synth.notes][state.activeKeys[1]] && notes[store.settings.synth.notes][state.activeKeys[1]].name }}</div>
      <div class="active-key" :data-number="colorBValue">{{ notes[store.settings.synth.notes][state.activeKeys[2]] && notes[store.settings.synth.notes][state.activeKeys[2]].name }}</div>
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
    <div class="bottom-buttons">
      <Transition>
        <button v-if="polyPhonyLimitReached" @click="playChord()">
          <svg width="1rem" height="1rem" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--color-main)">
            <path d="M6.906 4.537A.6.6 0 006 5.053v13.894a.6.6 0 00.906.516l11.723-6.947a.6.6 0 000-1.032L6.906 4.537z" stroke="var(--color-main)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        Play again</button>
      </Transition>
      <Transition>
      <button v-if="polyPhonyLimitReached" @click="resetSynth()">
        <svg width="1rem" height="1rem" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--color-main)">
          <path d="M21.168 8A10.003 10.003 0 0012 2C6.815 2 2.55 5.947 2.05 11" stroke="var(--color-main)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M17 8h4.4a.6.6 0 00.6-.6V3M2.881 16c1.544 3.532 5.068 6 9.168 6 5.186 0 9.45-3.947 9.951-9" stroke="var(--color-main)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.05 16h-4.4a.6.6 0 00-.6.6V21" stroke="var(--color-main)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        Reset
      </button>
    </Transition>
    </div>
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
    position: relative;
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

  .active-key::after {
    position: absolute;
    content: attr(data-number);
    display: inline-block;
    top: -2rem;
    font-size: 1rem;
    width: 2rem;
    height: 2rem;
    color: var(--coor-main);
    z-index: 9;
    opacity: 1;
  }

  .active-key + * {
    margin-left: 0.25rem;
  }

  .bottom-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    min-height: 4rem;
  }

  .bottom-buttons > * + * {
    margin-left: .25rem;
  }
</style>
