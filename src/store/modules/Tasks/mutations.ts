import { MutationTree } from "vuex";

import { State } from "./state";

import { TasksMutationTypes } from "./mutation-types";
import { taskList } from "@/types/taskList";

interface updateTask {
  taskId: string;
  taskIndex: number;
  taskName: string;
}

export type Mutations<S = State> = {
  [TasksMutationTypes.ADD_TASK](state: S, task: taskList): void;
  [TasksMutationTypes.UPDATE_TASK_STATUS](state: S, taskIndex: number): void;
  [TasksMutationTypes.UPDATE_TASK_NAME](state: S, task: updateTask): void;
  [TasksMutationTypes.REMOVE_TASK](state: S, taskIndex: number): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [TasksMutationTypes.ADD_TASK](state: State, task: taskList) {
    state.tasks = [...state.tasks, task];
  },
  [TasksMutationTypes.UPDATE_TASK_STATUS](state: State, taskIndex: number) {
    const currentState = state.tasks[taskIndex];
    state.tasks[taskIndex] = {
      ...currentState,
      isDone: !currentState.isDone,
    };
  },
  [TasksMutationTypes.UPDATE_TASK_NAME](state: State, task: updateTask) {
    const currentState = state.tasks[task.taskIndex];

    state.tasks[task.taskIndex] = {
      ...currentState,
      name: task.taskName,
    };
  },
  [TasksMutationTypes.REMOVE_TASK](state: State, taskIndex: number) {
    state.tasks.splice(taskIndex, 1);
  },
};
