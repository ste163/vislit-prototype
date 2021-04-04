<template>
  <view-template>
    <template #title>
      Progress
    </template>

    <template #content>
      <section class="card">
        <th>
          <tr>
            <th>Date</th>
            <th>Words Written</th>
            <th>Proofread</th>
            <th>Edited</th>
            <th>Revised</th>
          </tr>
          <!-- table with computed property rows, hard-coded for now -->
          <tbody name="table">
            <tr>
              <td>12/21/2021</td>
              <td>350</td>
              <td>X</td>
              <td>_</td>
              <td>_</td>
            </tr>
            <tr>
              <td>12/21/2021</td>
              <td>350</td>
              <td>X</td>
              <td>_</td>
              <td>_</td>
            </tr>
            <tr>
              <td>12/21/2021</td>
              <td>350</td>
              <td>X</td>
              <td>_</td>
              <td>_</td>
            </tr>
          </tbody>
        </th>
      </section>
    </template>
  </view-template>
</template>

<script>
import ViewTemplate from "./ViewTemplate.vue";

export default {
  components: { ViewTemplate }
};
</script>

<style></style>
