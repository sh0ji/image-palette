<template>
  <ul class="palette">
    <vibrant-swatch v-for="swatch in palette" :key="swatch.name" v-bind="swatch"/>
  </ul>
</template>

<script>
import VibrantSwatch from "./VibrantSwatch";

export default {
  name: "vibrant-palette",
  components: { VibrantSwatch },
  props: {
    palette: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>
.palette {
  list-style-type: none;
  padding: 0;

  display: grid;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  grid-template-columns: 1fr 1fr;
}

@media screen and (min-width: 576px) {
  .palette {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media screen and (min-width: 992px) {
  .palette {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
}
</style>
