<template>
  <div class="flex-layout" :class="flexClasses">
    <slot />
  </div>
</template>

<script>
export default {
  name: "FlexLayout",
  props: {
    between: Boolean,
    left: Boolean,
    middle: Boolean,
    center: Boolean,
  },
  computed: {
    flexClasses() {
      return {
        "flex-between": this.between,
        "flex-left": this.left,
        "flex-middle": this.middle,
        "flex-center": this.center,
      };
    },
  },
};
</script>

<style lang="sass" scoped>
@import '@/ui/themes/default/mixins'

// Flex Display options
.d-flex,
.flex-top, .flex-middle, .flex-bottom,
.flex-left, .flex-center, .flex-right, .flex-between, .flex-around
  display: flex


// Flex Direction options
.flex-row
  flex-direction: row

.flex-column
  flex-direction: column


// Flex Alignment options
.flex-top
  align-items: flex-start

.flex-middle
  align-items: center

.flex-bottom
  align-items: flex-end

.flex-left
  justify-content: flex-start

.flex-center
  justify-content: center

.flex-right
  justify-content: flex-end

.flex-between
  justify-content: space-between

.flex-around
  justify-content: space-around


// Flex Wrap options
.flex-wrap
  flex-wrap: wrap


// Flex Grow options
.flex-1, .flex-stretch
  flex: 1

.flex-shrink-0
  flex-shrink: 0
</style>
