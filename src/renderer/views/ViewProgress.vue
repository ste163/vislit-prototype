// This COULD be best if it uses the data range at the top, and displays a full
table for each month in the range

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
        <!-- WHAT WE NEED -->
        <!-- How many days are in the current month -->
        <!-- Loop through that many days and generate a single form with that information -->
        <!-- As we loop through, need to check to see if we have data in database for that date -->
        <!-- And if so, populate the form with that data -->
        <tbody name="table">
          <tr v-for="row in rows" :key="row.createdDate">
            <td class="data data__date">{{ row.createdDate }}</td>
            <td class="data data__words">{{ row.wordsWritten }}</td>
            <td class="data data__check">{{ row.proofread }}</td>
            <td class="data data__check">{{ row.edited }}</td>
            <td class="data data__check">{{ row.revised }}</td>
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
  components: { ViewTemplate },

  data() {
    return {
      rows: null
    };
  },
  methods: {
    daysInMonth(month, year) {
      // Month here is 1-indexed (January is 1, February is 2, etc). This is
      // because we're using 0 as the day so that it returns the last day
      // of the last month, so you have to add 1 to the month number
      // so it returns the correct amount of days
      return new Date(year, month, 0).getDate();
    },
    daysInSelectedMonth() {
      // Currently setup for April, 2021
      // NEEDS TO GET THE MONTH & YEAR FROM STATE
      const days = this.daysInMonth(4, 2021);
      return days;
    },
    progressRows() {
      const days = this.daysInSelectedMonth();
      const rows = [];

      // Create new progress object for each day
      for (let day = 1; day <= days; day++) {
        console.log(day);
        // Need to check if there is progress on this day in the database, if so, add that data.
        // CHECK THIS TO ENSURE IT'S THE SAME MODEL AS OTHER PROGRESS (NEED TO MAKE ERD)
        const progress = {
          // Hardcoding year and month. The month is 1 less than daysInSelectedMonth
          createdDate: new Date(2021, 3, day),
          wordsWritten: null,
          edited: false,
          proofread: false,
          revised: false
        };

        // Add created progress to rows
        rows.push(progress);
      }
      this.rows = rows;
    }
  },
  mounted() {
    // On mount, for testing, get progress rows
    this.progressRows();
  }
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

.data__date {
  text-align: left;
}

.data__check {
  text-align: center;
}

.data__words {
  text-align: right;
}
</style>
