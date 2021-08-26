<template>
  <div class="layout">
    <div class="d-flex flex-column bg-white sidebar">
      <div class="scrollarea">
        <a
          class="
            d-flex
            align-items-center
            flex-shrink-0
            p-3
            link-dark
            text-decoration-none
            border-bottom
          "
        >
          <span class="fs-5 fw-semibold">Categories</span>
        </a>
        <div class="list-group list-group-flush border-bottom">
          <CategoryList
            v-for="category in categories"
            :key="category.name + category.categoryId"
            :category="category"
            :is-active="category.categoryId === selectedCategory.categoryId"
            @selectedCategory="selectCategory"
            @removeCategory="removeCategory"
          />
        </div>
      </div>
      <a
        class="
          d-flex
          align-items-center
          flex-shrink-0
          p-3
          link-dark
          text-decoration-none
          border-bottom
        "
      >
        <inputButton
          @onClick="addCategory"
          placeholder="New Category"
          button-label="New Category"
        />
      </a>
    </div>
    <div class="view">
      <router-view :categoryId="selectedCategory.categoryId" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { category } from "@/types/category";
import CategoryList from "@/components/categories/CategoryList.vue";
import inputButton from "@/components/inputButton.vue";
import { CategoryActionTypes } from "@/store/modules/Categories/action-types";

export default {
  name: "Default",
  components: {
    CategoryList,
    inputButton,
  },
  setup: () => {
    const store = useStore();

    const categories = computed(() => {
      return store.state.categories.categories;
    });

    const selectedCategory = ref<category>(categories.value[0]);
    const newCategoryName = ref<string>("");

    const addCategory = (cate: { name: string }) => {
      store.dispatch(CategoryActionTypes.ADD_CATEGORY, cate.name);
    };

    const selectCategory = (category: category) => {
      selectedCategory.value = category;
    };

    const removeCategory = async (category: category) => {
      await selectCategory(categories.value[0]);
      await store.dispatch(
        CategoryActionTypes.REMOVE_CATEGORY,
        category.categoryId
      );
    };

    return {
      categories,
      addCategory,
      selectedCategory,
      selectCategory,
      newCategoryName,
      removeCategory,
    };
  },
};
</script>

<style scoped lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.layout {
  display: flex;

  & .sidebar {
    width: 380px;
    height: 100vh;
    filter: drop-shadow(5px 0 10px rgba(97, 97, 97, 0.1));

    & .scrollarea {
      overflow: scroll;
    }
  }
}

.view {
  //display: flex;
  //width: calc(100vw - 380px);
}
</style>
