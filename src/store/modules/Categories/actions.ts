import uniqid from "uniqid";

import { ActionTree, ActionContext } from "vuex";

import { RootState } from "@/store";
import { State, state } from "./state";
import { Mutations } from "./mutations";
import { CategoryActionTypes } from "./action-types";
import { CategoryMutationTypes } from "@/store/modules/Categories/mutation-types";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface Actions {
  [CategoryActionTypes.ADD_CATEGORY](
    { commit }: AugmentedActionContext,
    name: string
  ): void;
  [CategoryActionTypes.REMOVE_CATEGORY](
    { commit }: AugmentedActionContext,
    name: string
  ): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  [CategoryActionTypes.ADD_CATEGORY](
    { commit }: AugmentedActionContext,
    name: string
  ) {
    const category = {
      name,
      date: new Date(),
      categoryId: uniqid("cate-"),
    };
    commit(CategoryMutationTypes.ADD_CATEGORY, category);
  },
  [CategoryActionTypes.REMOVE_CATEGORY](
    { commit }: AugmentedActionContext,
    id: string
  ) {
    const categories = state.categories.filter(
      (category) => category.categoryId !== id
    );
    commit(CategoryMutationTypes.REMOVE_CATEGORY, categories);
  },
};
