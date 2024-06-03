<template>
  <h3>LIFE IS PRECIOUS</h3>
  <h3>MAKE IT MORE MEANINGFUL</h3>
  <div>
    <label for="age">Your age: </label>
    <input type="number" id="age" v-model.number="myLife.age" /><br />
    <label for="lifespan">Desired lifespan (years): </label>
    <input
      type="number"
      id="lifespan"
      v-model.number="myLife.desiredLifeSpan"
    />
    <p>
      {{ yearsOfLife }} years x {{ weeksPerYear }} weeks per year =
      {{ totalWeeksOfLife }} weeks of life<br />
      You have lived <b>{{ lifePercentage.toFixed(2) }}%</b> of your desired
      lifespan
    </p>
  </div>
  <div v-for="(chunk, row) in weeksChunks" :key="row">
    <span>{{ row + 1 }}</span>
    <span v-for="week in chunk" :key="week">
      <input
        type="checkbox"
        :id="'week-' + week"
        name="scales"
        :checked="week <= myLife.age * weeksPerYear"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const yearsOfLife = 90;
const weeksPerYear = 52;
const totalWeeksOfLife = weeksPerYear * yearsOfLife;
const myLife = ref({
  age: 37,
  desiredLifeSpan: 90,
});

const weeksChunks = computed(() => {
  const weeks = Array.from({ length: totalWeeksOfLife }, (_, i) => i + 1);
  const chunks = [];
  for (let i = 0; i < weeks.length; i += weeksPerYear) {
    chunks.push(weeks.slice(i, i + weeksPerYear));
  }
  return chunks;
});

const lifePercentage = computed(() => {
  return (myLife.value.age / myLife.value.desiredLifeSpan) * 100;
});
</script>

<style scoped>
input[type="checkbox"] {
  accent-color: green;
}
input[type="checkbox"]:not(:checked) {
  accent-color: grey;
}
body {
  background-color: white;
}
</style>
