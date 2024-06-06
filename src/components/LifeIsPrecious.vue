<template>
  <div class="center">
    <b>{{ $t('lifeIsPrecious') }}</b
    ><br />
    <b>{{ $t('makeItMoreMeaningful') }}</b>
  </div>
  <div id="header-container">
    <div class="left">
      <label for="age" class="hide-while-printing">{{ $t('yourAge') }}</label>
      <input
        type="number"
        id="age"
        v-model.number="myLife.age"
        max="110"
        class="hide-while-printing"
        style="width: 40px; margin-left: 5px; border: 2px solid green"
      />
      <br class="hide-while-printing" />
      <label for="lifespan">{{ $t('desiredLifespan') }}</label>

      <input
        type="number"
        id="lifespan"
        v-model.number="myLife.desiredLifeSpan"
        max="110"
        style="width: 40px; margin-left: 5px"
      />
    </div>

    <div class="right">
      <p>
        {{ myLife.desiredLifeSpan }} {{ $t('weeks') }} x {{ weeksPerYear }}
        {{ $t('weeks') }}/{{ $t('weeks') }} = {{ totalWeeksOfLife }}
        {{ $t('weeks') }}.<br class="hide-while-printing" />
        <span class="hide-while-printing">
          {{ $t('youHaveLived') }} <b>{{ lifePercentage.toFixed(2) }}%</b>
          {{ $t('percentOfYourLife') }}
        </span>
      </p>
    </div>
  </div>
  <div id="tools-container">

    <div class="language-selector  hide-while-printing">
      <select v-model="currentLocale" @change="changeLanguage">
        <option value="en">🇺🇸 English</option>
        <option value="pl">🇵🇱 Polski</option>
        <option value="es">🇪🇸 Español</option>
        <option value="fr">🇫🇷 Français</option>
        <option value="hi">🇮🇳 हिंदी</option>
      </select>
    </div>
    <button @click="printPage" class="hide-while-printing print-button">
      🖨️ Print
    </button>
  </div>
  <div id="squares-container">
    <div v-for="(chunk, row) in weeksChunks" :key="row" class="row">
      <div class="row-number">{{ row + 1 }}</div>
      <div class="week-boxes" :class="{ 'tenth-chunk': (row + 1) % 10 === 0 }">
        <div
          v-for="(week, index) in chunk"
          :key="week"
          class="week-box"
          :class="{
            checked: week <= myLife.age * weeksPerYear,
            unchecked: week > myLife.age * weeksPerYear,
            'extra-margin': index % 4 === 0,
          }"
        ></div>
      </div>
    </div>
  </div>
  <footer class="footer-quote">"{{ $t('lifeIsNow') }}"</footer>
</template>

<script setup lang="ts">
import { computed, ref, Ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

interface LifeData {
  age: number
  desiredLifeSpan: number
}

const myLife: Ref<LifeData> = ref({
  age: 30,
  desiredLifeSpan: 85,
})

const weeksPerYear: number = 52

const totalWeeksOfLife = computed(
  () => weeksPerYear * myLife.value.desiredLifeSpan
)

const weeksChunks = computed(() => {
  const weeks: number[] = Array.from(
    { length: totalWeeksOfLife.value },
    (_, i) => i + 1
  )
  const chunks: number[][] = []
  for (let i = 0; i < weeks.length; i += weeksPerYear) {
    chunks.push(weeks.slice(i, i + weeksPerYear))
  }
  return chunks
})

const lifePercentage = computed(() => {
  return (myLife.value.age / myLife.value.desiredLifeSpan) * 100
})

// Watcher to enforce the maximum lifespan
watch(
  () => myLife.value.desiredLifeSpan,
  (newLifeSpan) => {
    if (newLifeSpan > 110) {
      myLife.value.desiredLifeSpan = 110
    }
  }
)

// Watcher to enforce the maximum age input
watch(
  () => myLife.value.age,
  (newAge) => {
    if (newAge > 85) {
      myLife.value.age = 85
    }
  }
)

function printPage() {
  window.print()
}

const { t, locale } = useI18n()
const currentLocale = ref(locale.value)

function changeLanguage() {
  locale.value = currentLocale.value
}
</script>

<style scoped>
@media (max-width: 768px) {
  #header-container {
    flex-direction: column;
    text-align: center;
    max-width: 100%; /* Allow full width on smaller screens */
  }

  .left,
  .center,
  .right {
    flex: 1 0 100%;
    text-align: center;
    width: 100%; /* Full width for mobile */
  }
  
  .week-boxes {
    justify-content: center;
  }
}


.print-button {
  padding: 5px 12px 8px;
  margin-left: 5px;
  font-size: 14px;
  border-radius: 5px;
  border: solid 0px grey;
  cursor: pointer;
  background-color: black;
}

.language-selector {
  padding: 7px 12px;
  margin-left: 5px;
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

#header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  max-width: 1200px; /* Set a max-width for larger screens */
  margin: 0 auto; /* Center align the container */
}

#tools-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.left {
  min-width: 180px; /* Prevents columns from becoming too narrow */
  flex: 1;
  text-align: left;
}

.center {
  min-width: 180px; /* Prevents columns from becoming too narrow */
  flex: 1;
}


.right {
  min-width: 180px; /* Prevents columns from becoming too narrow */
  flex: 1;
  text-align: right;
}

.left input,
.right input,
.left label,
.right label {
  width: 100%; /* Ensures inputs and labels do not overflow their containers */
}

.center {
  flex: 1;
  text-align: center;
}

.right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#squares-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  align-items: center;
}
.row-number {
  width: 30px;
  text-align: left;
  margin-right: 10px;
  font-size: 10px;
}

.week-boxes {
  display: flex;
}
.tenth-chunk {
  margin-bottom: 5px; /* Apply additional left margin for every 4th chunk */
}
.week-box {
  width: 12px;
  height: 12px;
  margin: 1px;
  border: 1px solid #5f985e;
}
.week-box.checked {
  background-color: #5f985e;
}
.week-box.extra-margin {
  margin-left: 5px;
}
input[type='checkbox'] {
  display: none; /* Hide the actual squares-container */
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
  .hide-while-printing {
    display: none;
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

.footer-quote {
  text-align: center;
  padding-top: 10px;
  font-size: 10px;
}
</style>
