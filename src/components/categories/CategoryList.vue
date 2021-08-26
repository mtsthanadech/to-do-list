<template>
  <a
    class="category-list list-group-item list-group-item-action py-3 lh-tight"
    :class="isActive ? 'active' : null"
    aria-current="true"
  >
    <div
      @click="selectCategory(category)"
      class="d-flex w-100 align-items-center justify-content-between"
    >
      <strong class="mb-1">{{ category.name }}</strong>
      <div class="category-list-date d-flex flex-column align-items-end mb-1">
        <small class="">{{ dateFormatter(category.date) }}</small>
        <small class="">{{ timeFormatter(category.date) }}</small>
      </div>
    </div>
    <div
      v-if="!category.permanently"
      @click="removeCategory(category)"
      class="category-list-action"
    >
      <i class="bi bi-x-circle"></i>
    </div>
  </a>
</template>

<script lang="ts">
import { dateFormatter, timeFormatter } from "@/utills/formatter";
import { category } from "@/types/category";
import { defineComponent } from "vue";
export default defineComponent({
  name: "categoryList",
  props: {
    category: {
      // type: category,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props, { emit }) => {
    const selectCategory = (category: category) => {
      emit("selectedCategory", category);
    };
    const removeCategory = (category: category) => {
      emit("removeCategory", category);
    };
    return {
      dateFormatter,
      timeFormatter,
      selectCategory,
      removeCategory,
    };
  },
});
</script>

<style scoped lang="scss">
.category-list {
  position: relative;
  cursor: pointer;
  z-index: 100;

  &-date {
    position: relative;
    margin-top: 20px;
  }

  &-action {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 15px;
    z-index: 101;
  }
}
</style>
