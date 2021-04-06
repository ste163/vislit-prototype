<template>
  <view-template>
    <template #title>
      Progress
    </template>

    <template #content>
      <section class="card">
        <thead class="table__header">
          <tr>
            <th class="table__heading">Date</th>
            <th class="table__heading">Words Written</th>
            <th class="table__heading">Proofread</th>
            <th class="table__heading">Edited</th>
            <th class="table__heading">Revised</th>
          </tr>
        </thead>

        <!-- table with computed property rows, hard-coded for now -->
        <!-- For testing, just use the current month -->
        <!-- WHAT WE NEED -->
        <!-- Current Month -->
        <!-- How many days are in the current month -->
        <!-- Loop through that many days and generate a single form with that information -->
        <!-- As we loop through, need to check to see if we have data in database for that date -->
        <!-- And if so, populate the form with that data -->
        <tbody name="table">
          <tr>
            <td class="data data__date">12/21/2021</td>
            <td class="data data__words">350</td>
            <td class="data data__check">X</td>
            <td class="data data__check">_</td>
            <td class="data data__check">_</td>
          </tr>
        </tbody>
      </section>
    </template>
  </view-template>
</template>

//
<form id="todaysProgress" @submit.prevent="submitProgressForm">
//             <div class="form__items">
//               <label for="wordsWritten">Words Written</label>
//               <input
//                 id="wordsWritten"
//                 name="wordsWritten"
//                 type="number"
//                 v-model="progressForm.wordsWritten"
//               />
//             </div>

//             <div class="form__items">
//               <label class="checkbox__label" for="edited">Edited</label>
//               <input
//                 id="edited"
//                 name="edited"
//                 type="checkbox"
//                 value="edited"
//                 v-model="progressForm.edited"
//               />
//             </div>

//             <div class="form__items">
//               <label class="checkbox__label" for="proofread">Proofread</label>
//               <input
//                 id="proofread"
//                 name="proofread"
//                 type="checkbox"
//                 value="proofread"
//                 v-model="progressForm.proofread"
//               />
//             </div>

//             <div class="form__items">
//               <label class="checkbox__label" for="revised">Revised</label>
//               <input
//                 id="revised"
//                 name="revised"
//                 type="checkbox"
//                 value="revised"
//                 v-model="progressForm.revised"
//               />
//             </div>
//           </form>

<script>
import ViewTemplate from "./ViewTemplate.vue";

export default {
  components: { ViewTemplate }
};
</script>

<style scoped>
.table__header {
  border: solid 2px red;
}

.table__heading,
.data {
  padding: 0 1rem;
}

.table__heading {
  border-bottom: solid 0.25rem;
}

.data {
  padding-top: 0.25rem;
}

.data__date,
.data__check {
  text-align: center;
}

.data__words {
  text-align: right;
}
</style>
