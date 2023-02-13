import { reactive } from  'vue';
import { IColor, IColorPalette, ColorMode } from '../types/color-api';
import type { ToneOscillatorType } from 'tone';
import type { NoteVariation } from '../types/synth';
import { useToast } from 'vue-toastification';
import IconClose from '../components/IconClose.vue';
import IconError from '../components/IconError.vue';
import IconLoad from '../components/IconLoad.vue';
import IconPalette from '../components/IconPalette.vue';
import IconSave from '../components/IconSave.vue';

const toast = useToast();

interface IState {
  isLoading: boolean,
  currentView: string,
  lastView: string,
  colorPalette?: IColorPalette,
  seed?: IColor,
  settings: {
    color: {
      mode: ColorMode
    },
    synth: {
      waveform: ToneOscillatorType,
      volume: number,
      notes: NoteVariation
    }
  },
  savedPalettes: IColorPalette[],
  changeView: (viewSlug: string) => void,
  saveCurrentPalette: () => void,
  resetColorPalette: () => void,
  getColorPalette: (colorCode: string) => void,
  savePaletteToCloud: () => void,
  loadPalettesFromCloud: () => void
};  

export const store: IState = reactive({
  //state
  isLoading: false as boolean,
  currentView: 'hello',
  lastView: '',
  colorPalette: undefined,
  settings: {
    color: {
      mode: 'complement'
    },
    synth: {
      waveform: 'triangle3',
      volume: -6,
      notes: 'all'
    }
  },
  savedPalettes: [],
  // mutations
  changeView(viewSlug) {
    this.lastView = this.currentView;
    this.currentView = viewSlug;
  },
  saveCurrentPalette() {
    if(this.colorPalette) this.savedPalettes.push(this.colorPalette);
  },
  resetColorPalette() {
    if(this.colorPalette) this.colorPalette = undefined;
  },
  getColorPalette(colorCode) {
    const strippedColorString = colorCode.replace(' ', '').substring(1);
    this.isLoading = true;

    fetch(`https://www.thecolorapi.com/scheme?rgb=${strippedColorString}&mode=${store.settings.color.mode}`)
      .then(response => response.json())
      .then(response => {
        toast('Palette Generated',
          {
            icon: IconPalette,
            closeButton: IconClose
          }
        );
        store.colorPalette = response;
      })
      .catch(err => {
        console.log(err);
        toast('Network Error',
          {
            icon: IconError,
            closeButton: IconClose
          }
        );
      })
      .finally(() => this.isLoading = false);
  },
  savePaletteToCloud() {
    if(!store.colorPalette) return;

    store.saveCurrentPalette();

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify(Object.assign({}, store.savedPalettes));

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };

    this.isLoading = true;

    fetch('https://getpantry.cloud/apiv1/pantry/7414ee56-4f3a-4ab2-bb57-69e36e0362b1/basket/colors', requestOptions)
      .then(response => response.text())
      .then(result => {
        toast('Palettes saved',
        {
          icon: IconSave,
          closeButton: IconClose
        }
      );
      })
      .catch(error => {
        console.log('error', error)
        toast('Network Error',
        {
          icon: IconError,
          closeButton: IconClose
        }
        );
      })
      .finally(() => this.isLoading = false);
  },
  loadPalettesFromCloud() {
    this.isLoading = true;

    fetch('https://getpantry.cloud/apiv1/pantry/7414ee56-4f3a-4ab2-bb57-69e36e0362b1/basket/colors')
      .then(response => response.text())
      .then(result => {
        toast('Palettes loaded',
          {
            icon: IconLoad,
            closeButton: IconClose
          }
        );
        store.savedPalettes = Object.values(JSON.parse(result))}
      )
      .catch(error => {
        console.log('error', error)
        toast('Network Error',
        {
          icon: IconError,
          closeButton: IconClose
        }
      );
      })
      .finally(() => this.isLoading = false);
  }
})