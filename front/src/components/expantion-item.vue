<template>
  <div class="justify-center">
    <q-expansion-item
      v-model="model"
      :label="label"
      dense-toggle
      switch-toggle-side
      expand-separator
    >
      <div class="row justify-evenly text-subtitle1">
        <slot name="expansion-item"></slot>
      </div>
    </q-expansion-item>
  </div>
</template>

<script>
export default {
  name: 'date-select-form',
  props: {
    datalist: Array,
    expanded: Boolean,
    label: String,
  },
  data() {
    return {
      model: false,
    };
  },
  mounted() {
    this.model = this.expanded;
  },
};
</script>
