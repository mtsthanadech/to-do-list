import { Mutations as TasksMutation } from "@/store/modules/Tasks/mutations";
import { Mutations as CategoriesMutation } from "@/store/modules/Categories/mutations";
import { ActionContext } from "vuex";
import { State } from "@/store/modules/Tasks";
import { RootState } from "@/store";

export type TasksAugmentedActionContext = {
  commit<K extends keyof TasksMutation>(
    key: K,
    payload: Parameters<TasksMutation[K]>[1]
  ): ReturnType<TasksMutation[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export type CategoriesAugmentedActionContext = {
  commit<K extends keyof CategoriesMutation>(
    key: K,
    payload: Parameters<CategoriesMutation[K]>[1]
  ): ReturnType<CategoriesMutation[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;
