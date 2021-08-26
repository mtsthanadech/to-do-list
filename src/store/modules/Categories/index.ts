import {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  Module,
} from "vuex";

// TODO: How to surpass cyclical dependency linting errors cleanly?
import { RootState } from "@/store";

import { state } from "./state";
import { mutations, Mutations } from "./mutations";
import { actions, Actions } from "./actions";

import type { State } from "./state";

export { State };

export type CategoriesStore<S = State> = Omit<
  VuexStore<S>,
  "commit" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

export const store: Module<State, RootState> = {
  state,
  // getters,
  mutations,
  actions,
  // TODO: With namespaced option turned on, having problem how to use dispatch with action types...
  // But without it, a bigger store might have clashes in namings
  // namespaced: true,
};
