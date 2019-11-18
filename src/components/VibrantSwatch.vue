<template>
  <li class="swatch">
    <div class="swatch-name">
      {{ name }}
      <span
        :class="(isAccessible) ? 'text-success' : 'text-danger'"
        :title="title"
        :aria-label="`(${title})`"
      >({{ contrastValue }})</span>
    </div>
    <button class="btn swatch-color text-monospace" :style="css" @click="copyCss">
      <div :title="`${name} color`" :aria-label="`${name} color: ${hex}`">{{ hex }}</div>
      <div
        class="badge"
        :title="`Contrasting color (${contrastColor.name})`"
        :aria-label="`Contrasting color (${contrastColor.name}): ${contrastColor.hex}`"
        :style="cssInvert"
      >{{ contrastColor.hex }}</div>
    </button>
  </li>
</template>

<script>
export default {
  name: "vibrant-swatch",
  props: {
    name: {
      type: String,
      required: true
    },
    hex: {
      type: String,
      required: true
    },
    rgb: {
      type: Array
    },
    population: {
      type: Number
    },
    css: {
      type: Object
    },
    contrastColor: {
      type: Object
    }
  },
  computed: {
    contrastValue() {
      return this.contrastColor.contrast.toFixed(2);
    },
    isAccessible() {
      return this.contrastColor.contrast >= 4.5;
    },
    title() {
      const stub = this.isAccessible
        ? "safe to use in production!"
        : "not safe to use in production because it is less than the minimum required (4.5).";
      return `A contrast ratio of ${this.contrastValue} is ${stub}`;
    },
    cssInvert() {
      return {
        backgroundColor: this.contrastColor.hex,
        color: this.hex
      };
    }
  },
  methods: {
    copyCss() {
      navigator.clipboard.writeText(JSON.stringify(this.css, null, "  "));
      // .then(res => {
      //   console.log("copied to your clipboard!");
      // });
    }
  }
};
</script>

<style scoped>
.swatch-color {
  display: block;
  border-radius: 0;
  justify-self: stretch;
  text-align: center;
  width: 100%;
  padding: 1.5rem;
}

.badge {
  font-size: inherit;
  margin-top: 0.25rem;
}
</style>
