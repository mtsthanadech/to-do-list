import { createStore, createLogger } from "vuex";
// import createPersistedState from "vuex-persistedstate";

// TODO: How to surpass cyclical dependency linting errors cleanly?
import {
  store as categories,
  CategoriesStore,
  State as CategoriesState,
} from "@/store/modules/Categories";
import {
  store as tasks,
  TasksStore,
  State as TasksState,
} from "@/store/modules/Tasks";
// import {
//   store as profile,
//   ProfileStore,
//   State as ProfileState,
// } from "@/store/modules/profile";

export type RootState = {
  categories: CategoriesState;
  tasks: TasksState;
};

export type Store = CategoriesStore<Pick<RootState, "categories">> &
  TasksStore<Pick<RootState, "tasks">>;

// export type Store = DocumentsStore<Pick<RootState, "documents">> &
//   ProfileStore<Pick<RootState, "profile">>;

// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== "production";
const plugins = debug ? [createLogger({})] : [];

// Plug in session storage based persistence
// plugins.push(createPersistedState({ storage: window.sessionStorage }));

export const store = createStore({
  plugins,
  modules: {
    categories,
    tasks,
  },
});

export function useStore(): Store {
  return store as Store;
}
