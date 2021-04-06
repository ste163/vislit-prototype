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
        <tbody name="table">
          <tr v-for="row in rows" :key="row.key">
            <td class="data data__date">
              {{ formatDateString(row.createdDate) }}
            </td>
            <td class="data data__words">
              <input
                class="table__input"
                id="wordsWritten"
                name="wordsWritten"
                type="number"
              />
            </td>
            <td class="data data__check">
              <input
                id="proofread"
                name="proofread"
                type="checkbox"
                value="proofread"
              />
            </td>
            <td class="data data__check">
              <input id="edited" name="edited" type="checkbox" value="edited" />
            </td>
            <td class="data data__check">
              <input
                id="revised"
                name="revised"
                type="checkbox"
                value="revised"
              />
            </td>
          </tr>
        </tbody>
      </section>
    </template>
  </view-template>
</template>

<script>
import ViewTemplate from "./ViewTemplate.vue";
import { dateMixin } from "../mixins/dateMixins";

export default {
  components: { ViewTemplate },
  mixins: [dateMixin],
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
        // Need to check if there is progress on this day in the database, if so, add that data.
        // CHECK THIS TO ENSURE IT'S THE SAME MODEL AS OTHER PROGRESS (NEED TO MAKE ERD)
        const progress = {
          // Hardcoding year and month. The month is 1 less than daysInSelectedMonth
          key: day,
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

.table__input {
  border-radius: 0;
}

.data {
  padding-top: 0.25rem;
  border-bottom: solid var(--lightGray);
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
