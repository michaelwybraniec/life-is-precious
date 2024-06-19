<template>
  <div id="banner">
    <b>{{ t('lifeIsPrecious') }}</b
    ><br />
    <b>{{ t('makeItMoreMeaningful') }}</b> <small>v.{{ appVersion }}</small>
  </div>
  <div id="header-container">
    <div class="left">
      <div class="hide-for-printing">
        <label
          for="desiredAge"
          class="hide-for-printing"
          >{{ t('yourAge') }}</label
        >
        <input
          type="number"
          id="desiredAge"
          v-model.number="myLife.desiredAge"
          :min="minAge"
          :max="maxAge"
          @input="validateDesiredAge"
          class="hide-for-printing"
          style="
            width: 40px;
            margin-left: 5px;
            border: 0px;
            border-radius: 4px;
            padding: 5px;
            padding-bottom: 3px;
          "
        />
      </div>
      <div>
        <label for="lifespan">{{ t('desiredLifespan') }}</label>
        <input
          type="number"
          id="lifespan"
          v-model.number="myLife.desiredLifeSpan"
          :min="minLifeSpan"
          :max="maxLifeSpan"
          @input="validateLifeSpan"
          disabled
          style="
            width: 40px;
            margin-left: 5px;
            border: 0px;
            border-radius: 4px;
            padding: 5px;
            padding-bottom: 3px;
          "
        />
      </div>
      <div v-if="inputWarning">
        <p class="warning">
          {{ t('inputWarning') }}
        </p>
      </div>
    </div>
    <div class="right">
      <div>
        {{ myLife.desiredLifeSpan }} {{ t('years') }} x {{ weeksPerYear }}
        {{ t('weeks') }}/{{ t('year') }} = {{ totalWeeksOfLife }}
        {{ t('weeks') }}
      </div>
      <div class="hide-for-printing">
        {{ t('youHaveLived') }} <b>{{ lifePercentage.toFixed(2) }}%</b>
        {{ t('percentOfYourLife') }}
      </div>
    </div>
  </div>
  <div id="tools-container">
    <div class="hide-for-printing">
      <span v-if="colorMode === 'techno'">{{ t('handsClap') }}</span>
    </div>
    <div class="hide-for-printing">
      <select
        class="color-mode-selector"
        id="colorMode"
        v-model="colorMode"
      >
        <option value="default">🩶 {{ t('default') }}</option>
        <option value="techno">⚡ {{ t('techno') }}</option>
        <option value="disco">💃 {{ t('disco') }}</option>
      </select>
    </div>
    <div class="hide-for-printing">
      <select
        class="language-selector"
        v-model="currentLocale"
        @change="changeLanguage"
      >
        <option value="en">🇺🇸 English</option>
        <option value="pl">🇵🇱 Polski</option>
        <option value="es">🇪🇸 Español</option>
        <option value="fr">🇫🇷 Français</option>
        <option value="hi">🇮🇳 हिंदी</option>
      </select>
    </div>
    <button
      @click="printPage"
      class="hide-for-printing print-button"
    >
      🖨️ Print
    </button>
  </div>
  <div id="squares-container">
    <div
      v-for="(chunk, row) in weeksChunks"
      :key="row"
      class="row"
    >
      <div class="row-number">{{ row + 1 }}</div>
      <div
        class="week-boxes"
        :class="{ 'tenth-chunk': (row + 1) % 10 === 0 }"
      >
        <div
          v-for="(week, index) in chunk"
          :key="week"
          class="week-box"
          :class="{
            checked: week <= myLife.desiredAge * weeksPerYear,
            unchecked: week > myLife.desiredAge * weeksPerYear,
            'extra-margin': index % 4 === 0,
            techno: colorMode === 'techno',
            disco: colorMode === 'disco',
          }"
        ></div>
      </div>
    </div>
  </div>
  <footer class="footer-quote">{{ t('lifeIsNow') }}</footer>
</template>

<script setup lang="ts">
import { computed, ref, Ref, watchEffect, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
interface LifeData {
  desiredAge: number;
  desiredLifeSpan: number;
}

// VARIABLES
const appVersion = import.meta.env.VITE_APP_VERSION;
const myLife: Ref<LifeData> = ref({
  desiredAge: 30,
  desiredLifeSpan: 85,
});
const weeksPerYear: number = 52;
const minLifeSpan: number = 0;
const maxLifeSpan: number = 85;
const minAge: number = 0;
const maxAge: number = 85;
const inputWarning = ref(false);
const { t, locale } = useI18n();
const currentLocale = ref(locale.value);

// FUNCTIONS
const totalWeeksOfLife = computed(
  () => weeksPerYear * myLife.value.desiredLifeSpan,
);
const weeksChunks = computed(() => {
  const weeks: number[] = Array.from(
    { length: totalWeeksOfLife.value },
    (_, i) => i + 1,
  );
  const chunks: number[][] = [];
  for (let i = 0; i < weeks.length; i += weeksPerYear) {
    chunks.push(weeks.slice(i, i + weeksPerYear));
  }
  return chunks;
});
const lifePercentage = computed(() => {
  return (myLife.value.desiredAge / myLife.value.desiredLifeSpan) * 100;
});
const printPage = () => window.print();
const changeLanguage = () => (locale.value = currentLocale.value);
const isBetween = (value: number, min: number, max: number) => {
  return value >= min && value <= max;
};
const validateDesiredAge = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = parseInt(target.value, 10);
  if (!isBetween(value, minAge, maxAge)) {
    inputWarning.value = true;
    if (value < minAge) myLife.value.desiredAge = minAge;
    else if (value > maxAge) myLife.value.desiredAge = maxAge;
    else if (isNaN(value)) myLife.value.desiredAge = minAge;
  } else {
    inputWarning.value = false;
    myLife.value.desiredAge = value;
    // Age cannot be higher than desired lifespan
    if (myLife.value.desiredLifeSpan < value) {
      myLife.value.desiredLifeSpan = value;
    }
  }
};
const validateLifeSpan = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = parseInt(target.value, 10);
  if (!isBetween(value, minLifeSpan, maxLifeSpan)) {
    console.log(value);
    inputWarning.value = true;
    if (value < minLifeSpan) myLife.value.desiredLifeSpan = minLifeSpan;
    else if (isNaN(value)) myLife.value.desiredLifeSpan = minLifeSpan;
    else if (value > maxLifeSpan) myLife.value.desiredLifeSpan = maxLifeSpan;
  } else {
    inputWarning.value = false;
    myLife.value.desiredLifeSpan = value;
    // Desired lifespan cannot be shorter than age
    if (myLife.value.desiredLifeSpan < myLife.value.desiredAge) {
      myLife.value.desiredAge = 0;
    }
  }
};

// COLOR MODES
const colorMode = ref('default');
const audioLevel = ref(0);
let audioContext: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
const startAudioProcessing = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 256;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const getAverageVolume = (array: Uint8Array) => {
      const length = array.length;
      let values = 0;
      for (let i = 0; i < length; i++) {
        values += array[i];
      }
      return values / length;
    };
    const updateAudioLevel = () => {
      if (analyser) {
        analyser.getByteFrequencyData(dataArray);
        audioLevel.value = getAverageVolume(dataArray) / 255;
        // console.log("Audio Level:", audioLevel.value); // Log the audio level
        const boxes = document.querySelectorAll('.week-box.techno');
        const intensity = Math.max(0.2, audioLevel.value * 6); // Start at 20% and increase responsiveness
        boxes.forEach((box, index) => {
          const element = box as HTMLElement;
          const factor = (index + 1) / boxes.length; // Scale factor based on index
          const scaledIntensity = intensity * factor;
          element.style.backgroundColor = `rgba(255, 255, 255, ${scaledIntensity})`;
          element.style.border = `1px solid rgba(0, 0, 0, ${1 - scaledIntensity})`; // Less visible border
        });
        requestAnimationFrame(updateAudioLevel);
      }
    };
    updateAudioLevel();
  } catch (err) {
    console.error('Error accessing microphone:', err);
  }
};
const resetWeekBoxStyles = () => {
  document.querySelectorAll('.week-box').forEach((box) => {
    const element = box as HTMLElement;
    element.style.backgroundColor = '';
    element.style.border = '';
  });
};
watchEffect(() => {
  if (colorMode.value === 'techno') {
    startAudioProcessing();
  } else {
    resetWeekBoxStyles();
    if (audioContext) {
      audioContext.close();
      audioContext = null;
      analyser = null;
    }
  }
  document.querySelectorAll('.week-box').forEach((box) => {
    box.classList.remove('techno', 'disco');
    if (colorMode.value === 'techno') {
      box.classList.add('techno');
    } else if (colorMode.value === 'disco') {
      box.classList.add('disco');
    }
  });
});
onMounted(() => {
  if (colorMode.value === 'techno') {
    startAudioProcessing();
  }
});
onUnmounted(() => {
  if (audioContext) {
    audioContext.close();
  }
});
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
}
#banner {
  margin-top: 50px;
  text-align: center;
  width: 100%; /* Full width for mobile */
}
#header-container {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  max-width: 1200px; /* Set a max-width for larger screens */
  margin: 0 auto; /* Center align the container */
}
#squares-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
#tools-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
@media print {
  @page {
    size: A3;
    margin: 0mm;
  }
  body {
    transform: scale(0.8);
    transform-origin: top left;
    width: 125%;
  }
  .hide-for-printing {
    display: none;
  }
  .tenth-chunk {
    margin-bottom: 2px !important; /* Apply additional left margin for every 4th chunk */
  }
  #header-container {
    margin-top: 30px;
  }
  .week-box,
  .week-box.checked {
    border: 1px solid #314a30; /* Ensure borders are visible */
    -webkit-print-color-adjust: exact;
    color-adjust: exact; /* Ensure the colors are printed as they appear on screen */
    background-color: #314a30 !important; /* Force background color for checked boxes */
  }
  .week-box {
    background-color: white !important; /* Force background color for unchecked boxes */
  }
}
.print-button {
  padding: 5px 12px 8px;
  margin-left: 10px;
  font-size: 14px;
  border-radius: 5px;
  border: solid 0px grey;
  cursor: pointer;
  background-color: black;
}

.language-selector {
  padding: 7px;
  margin-left: 10px;
  font-size: 14px;
  border-radius: 5px;
  border: solid 0px grey;
  cursor: pointer;
  background-color: black;
}
.language-selector select {
  padding-top: 3px;
  font-size: 14px;
  border-radius: 5px;
  border: solid 0px grey;
  cursor: pointer;
  background-color: black;
}
.color-mode-selector {
  padding: 7px;
  margin-left: 10px;
  font-size: 14px;
  border-radius: 5px;
  border: solid 0px grey;
  cursor: pointer;
  background-color: black;
}
.color-mode-selector select {
  padding-top: 3px;
  font-size: 14px;
  border-radius: 5px;
  border: solid 0px grey;
  cursor: pointer;
  background-color: black;
}
.warning {
  color: rgb(255, 232, 82);
  font-size: 15px;
  margin: 0px;
  margin-top: 4px;
}
.left {
  flex: 1;
  text-align: left;
}
.right {
  flex: 1;
  text-align: right;
}
.row {
  display: flex;
  align-items: center;
}
.row-number {
  width: 10px;
  text-align: left;
  margin-right: 10px;
  font-size: 10px;
}
.week-boxes {
  display: flex;
}
.tenth-chunk {
  margin-bottom: 2px; /* Apply additional left margin for every 4th chunk */
}
.week-box {
  width: 13px;
  height: 7px;
  margin: 1px;
  /* padding-left: 2px; */
  border: 1px solid rgb(173, 173, 173);
}
.week-box.checked {
  background-color: rgb(173, 173, 173);
}
.week-box.extra-margin {
  margin-left: 5px;
}
.footer-quote {
  text-align: center;
  padding-top: 10px;
  padding-bottom: 0px;
  font-size: 10px;
}
@keyframes disco-ball {
  0% {
    background-color: #ff0000;
  }
  16.67% {
    background-color: #9900ff;
  }
  33.33% {
    background-color: #0000ff;
  }
  50% {
    background-color: #ff00e1;
  }
  66.67% {
    background-color: #ff00ff;
  }
  83.33% {
    background-color: #0044ff;
  }
  100% {
    background-color: #15ff00;
  }
}
.week-box.disco {
  animation: disco-ball 0.5s infinite;
}
.week-box.checked.disco {
  animation: disco-ball 0.5s infinite reverse;
}
</style>
