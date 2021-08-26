import { MutationTree } from "vuex";

import { State } from "./state";

import { CategoryMutationTypes } from "./mutation-types";
import { category } from "@/types/category";

export type Mutations<S = State> = {
  [CategoryMutationTypes.ADD_CATEGORY](state: S, category: category): void;
  [CategoryMutationTypes.REMOVE_CATEGORY](
    state: S,
    categories: category[]
  ): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [CategoryMutationTypes.ADD_CATEGORY](state: State, category: category) {
    state.categories = [...state.categories, category];
  },
  [CategoryMutationTypes.REMOVE_CATEGORY](
    state: State,
    categories: category[]
  ) {
    state.categories = categories;
  },
};
