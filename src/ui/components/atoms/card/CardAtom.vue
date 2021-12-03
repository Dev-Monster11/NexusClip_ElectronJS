<template>
  <div class="card-atom">
    <slot />
  </div>
</template>

<script>
export default {
  name: "CardAtom",
};
</script>

<style lang="scss" scoped>
@import "@/ui/themes/default/variables";

.card-atom {
  background: $dark-1;
  padding: 15px;
  border-radius: 5px;
  width: 300px;
}
</style>
