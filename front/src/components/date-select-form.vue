<template>
  <div>
    <div v-for="(data, index) in datalist" :key='index' class="items-center row">
      <div class='col-5 text-subtitle1'>
        {{formatDate(data.candidate_date)}}
      </div>
      <div class='col-4'>
        <q-btn-toggle
          v-model="data['candidate_date_statuses.status']"
          toggle-color="primary"
          no-caps
          unelevated
          :options="[
            {slot: 'circle', value: 2},
            {slot: 'triangle', value: 1},
            {slot: 'cross', value: 0}
          ]"
        >
          <template v-slot:circle>
            <div class="row items-center no-wrap">
              <q-icon name="panorama_fish_eye" />
            </div>
          </template>

          <template v-slot:triangle>
            <div class="row items-center no-wrap">
              <q-icon name="change_history" />
            </div>
          </template>

          <template v-slot:cross>
            <div class="row items-center no-wrap">
              <q-icon name="close" />
            </div>
          </template>
        </q-btn-toggle>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'date-select-form',
  props: {
    datalist: Array,
  },

  methods: {
    formatDate: (date) => {
      const options = { yaer: 'long', month: 'long', day: 'numeric', weekday: 'short' };
      return new Date(date).toLocaleString('ja-JP', options);
    },
  },

  watch: {
    choise() {
      this.$emit('parentMethod', this.choise);
    },
  },
};
</script>
