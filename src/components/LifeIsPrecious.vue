<template>
  <div class="container">
    <div class="left">
      <label for="age" class="hide-while-printing">Your age: </label>
      <input
        type="number"
        id="age"
        v-model.number="myLife.age"
        max="110"
        class="hide-while-printing"
        style="width: 40px"
      /><br class="hide-while-printing" />
      <label for="lifespan">Desired lifespan (years): </label>
      <input
        type="number"
        id="lifespan"
        v-model.number="myLife.desiredLifeSpan"
        max="110"
        disabled
        style="width: 40px"
      />
    </div>
    <div class="center">
      <b>LIFE IS PRECIOUS<br />MAKE IT MORE MEANINGFUL</b>
    </div>
    <div class="right">
      <p>
        {{ myLife.desiredLifeSpan }} years x {{ weeksPerYear }} weeks/year =
        {{ totalWeeksOfLife }} weeks.<br />
        <span class="hide-while-printing">
          You have lived <b>{{ lifePercentage.toFixed(2) }}%</b> of your life.
        </span>
      </p>
    </div>
  </div>
  <button @click="printPage" class="hide-while-printing print-button">
    Print
  </button>
  <div id="checkboxes">
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
  <footer class="footer-quote">
    "LIFE IS NOW" / All rights reserved by ONE-FRONT.
  </footer>
</template>

<script setup lang="ts">
import { computed, ref, Ref, watch } from 'vue'

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
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  align-items: center;
}

.left {
  flex: 1;
  text-align: left;
}
.center {
  flex: 1;
  text-align: center;
}
.right {
  flex: 1;
  text-align: right;
}

.right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
#checkboxes {
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
  display: none; /* Hide the actual checkboxes */
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
.print-button {
  margin-bottom: 5px;
}
</style>
