<template>
  <view-template name="slide" mode="out-in">
    <template #title>
      Summary
    </template>

    <template #content>
      <!-- Progress -->
      <view-summary-card-template :goToRoute="goToProgress">
        <template #heading>
          Progress
        </template>

        <template #content-heading>
          Today: {{ formatDateString(new Date()) }}
        </template>

        <template #content>
          <!-- On mount, get project data, compute if there's progress for today, if yes, fill out form with today's data -->
          <form id="todaysProgress" @submit.prevent="submitProgressForm">
            <div class="form__items">
              <label for="wordsWritten">Words Written</label>
              <input
                id="wordsWritten"
                name="wordsWritten"
                type="number"
                v-model="progressForm.wordsWritten"
              />
            </div>

            <div class="form__items">
              <label class="checkbox__label" for="proofread">Proofread</label>
              <input
                id="proofread"
                name="proofread"
                type="checkbox"
                value="proofread"
                v-model="progressForm.proofread"
              />
            </div>

            <div class="form__items">
              <label class="checkbox__label" for="edited">Edited</label>
              <input
                id="edited"
                name="edited"
                type="checkbox"
                value="edited"
                v-model="progressForm.edited"
              />
            </div>

            <div class="form__items">
              <label class="checkbox__label" for="revised">Revised</label>
              <input
                id="revised"
                name="revised"
                type="checkbox"
                value="revised"
                v-model="progressForm.revised"
              />
            </div>
          </form>
        </template>

        <button
          type="submit"
          form="todaysProgress"
          slot="btn-add"
          class="btn-gray"
        >
          SAVE
        </button>
      </view-summary-card-template>

      <!-- Visualizations -->
      <view-summary-card-template :goToRoute="goToVisualizations">
        <template #heading>
          Visualizations
        </template>

        <template #content-heading>
          Goal Progress
        </template>

        <template #content>
          Progress Bar
        </template>
      </view-summary-card-template>

      <!-- Notes -->
      <view-summary-card-template :goToRoute="goToNotes">
        <template #heading>
          Notes
        </template>

        <template #content>
          Most recent project notes
        </template>

        <button slot="btn-add" class="btn-gray">SAVE</button>
      </view-summary-card-template>

      <!-- Thesaurus -->
      <view-summary-card-template :goToRoute="goToThesaurus">
        <template #heading>
          Thesaurus
        </template>

        <template #content>
          Thesaurus search bar
        </template>

        <slot name="btn-link" />
      </view-summary-card-template>
    </template>
  </view-template>
</template>

<script>
import { pathMixin } from "../mixins/routerMixins";
import { dateMixin } from "../mixins/dateMixins";
import { mapActions } from "vuex";
import ViewSummaryCardTemplate from "./ViewSummaryCardTemplate.vue";
import ViewTemplate from "./ViewTemplate.vue";
export default {
  components: { ViewSummaryCardTemplate, ViewTemplate },
  mixins: [pathMixin, dateMixin],
  data() {
    return {
      progressForm: this.createProgressForm()
    };
  },
  methods: {
    ...mapActions("progress", ["addProgress", "getTodaysProgressByProjectId"]),
    goToProgress() {
      // FETCH PROGRESS
      this.changeRoute("progress");
    },
    goToVisualizations() {
      // FETCH PROGRESS
      this.changeRoute("visualizations");
    },
    goToNotes() {
      // FETCH NOTES
      this.changeRoute("notes");
    },
    goToThesaurus() {
      // FETCH COLLECTIONS (will probably need to get these on initial load (at least their names for search bar))
      this.changeRoute("thesaurus");
    },
    createProgressForm() {
      return {
        wordsWritten: 0,
        edited: false,
        proofread: false,
        revised: false,
        projectId: null,
        dateCreated: null
      };
    },
    submitProgressForm() {
      this.progressForm.dateCreated = new Date();
      this.progressForm.projectId = this.$router.currentRoute.params.id;
      this.addProgress(this.progressForm);
      this.progressForm = this.createProgressForm();
    }
  },
  mounted() {
    console.log("FETCH TODAYS PROGRESS & FILL FORM");
    // Need to also have an isLoading state and an error state
    // When we fetch all the data, set loading to false
    // If there's any error, set the error state from null to a string
    // In the template, put <div>{{error}}</div> at the bottom. This will only ever actually show up IF there is an error
    // So you don't need to add any if/else checking
  },
  watch: {
    // Whenever the route path changes, run this code
    $route() {
      // IF THE ROUTE IS FOR ALL PROJECTS:
      // IF NO PROGRESS, SAY SO
      // IF PROGRESS, SAY WHICH PROJECT & THEN THE PROGRESS

      this.progressForm = this.createProgressForm();
    }
  }
};
</script>

<style scoped>
/* Progress form */
#todaysProgress {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

#wordsWritten {
  width: 6.5rem;
}

.form__items {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

/* transition animations */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(30%);
  opacity: 0;
}
</style>
