<script setup lang="ts">
  import { ref, reactive, onMounted, onBeforeUnmount, defineEmits } from 'vue';
  import * as Tone from 'tone';
  import { mapRange } from '../utils';

  const emit = defineEmits([
    'colorSeedGenerated'
  ]);

  interface Note {
    name: string,
    freq: number
  };

  const notes: {
    [key: string]: Note;
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

  const state = reactive(
    {
      activeKeys: []
    }
  );

  const row1: ref<NodeList | null> = ref(null);
  const row2: ref<NodeList | null> = ref(null);
  const row3: ref<NodeList | null> = ref(null);
  const keys: ref<[NodeList]> = ref([])
  
  const synth = new Tone.PolySynth({
    maxPolyphony: 4,
    options: {
      oscillator: {
        type: 'triangle3'
      }
    }
  }).toDestination();

  const handleKeyPress = (event: KeyboardEvent) => {
    if(state.activeKeys.length >= 3) return;
    if(state.activeKeys.includes(event.key)) return;
    if(!validKeys.includes(event.key)) return;

    if(state.activeKeys.length >= 3) state.activeKeys.shift();
    state.activeKeys.push(event.key);

    const keyElement = keys.value[0].find((element: HTMLDivElement) => element.classList.contains(`key-${event.key}`));
    keyElement.classList.add('active');
    
    synth.triggerAttackRelease(notes[event.key].name, 0.5);

    if(state.activeKeys.length === 3) {
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

      emit('colorSeedGenerated', generatedColor);
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', (event) => handleKeyPress(event));

    keys.value.push(
      [...row1.value?.querySelectorAll('.key'),
      ...row2.value?.querySelectorAll('.key'),
      ...row3.value?.querySelectorAll('.key')
    ]);
    
  }),
  onBeforeUnmount(() => {
    console.log('unmounting')
      window.removeEventListener('keydown', (event) => handleKeyPress(event));
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
      <div class="key key-q">Q</div>
      <div class="key key-w">W</div>
      <div class="key key-e">E</div>
      <div class="key key-r">R</div>
      <div class="key key-t">T</div>
      <div class="key key-z">Z</div>
      <div class="key key-u">U</div>
      <div class="key key-i">I</div>
      <div class="key key-o">O</div>
      <div class="key key-p">P</div>
    </div>
    <div ref="row2" class="row">
      <div class="key key-a">A</div>
      <div class="key key-s">S</div>
      <div class="key key-d">D</div>
      <div class="key key-f">F</div>
      <div class="key key-g">G</div>
      <div class="key key-h">H</div>
      <div class="key key-j">J</div>
      <div class="key key-k">K</div>
      <div class="key key-l">L</div>
    </div>
    <div ref="row3" class="row">
      <div class="key key-y">Y</div>
      <div class="key key-x">X</div>
      <div class="key key-c">C</div>
      <div class="key key-v">V</div>
      <div class="key key-b">B</div>
      <div class="key key-n">N</div>
      <div class="key key-m">M</div>
    </div>
  </div>
</template>

<style scoped>
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
    transition: color 0.3s var(--ease-in-out), background-color 0.3s var(--ease-in-out), border-color 0.3s var(--ease-in-out);
  }

  .key + * {
    margin-left: 0.25rem;
  }

  .key.active {
    border-color: var(--color-alt);
    background-color: var(--color-main);
    color: var(--color-alt);
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
    border: 1px solid var(--color-alt);
    font-size: inherit;
  }
</style>
