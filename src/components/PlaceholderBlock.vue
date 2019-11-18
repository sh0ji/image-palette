<template>
  <div class="placeholder-img" :style="style">{{ text }}</div>
</template>

<script>
export default {
  name: "placeholder-block",
  props: {
    text: {
      type: String,
      default: "Your image goes here."
    },
    dimensions: {
      type: String,
      validatator(value) {
        return value.split("x").every(dim => parseInt(dim, 10));
      }
    }
  },
  computed: {
    style() {
      const [width, height] = this.dimensions.split("x").map(dim => `${dim}px`);
      return { height, width };
    }
  }
};
</script>

<style>
.placeholder-img {
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: lightgray;
}
</style>
