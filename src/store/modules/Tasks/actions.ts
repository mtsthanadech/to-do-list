import uniqid from "uniqid";

import { ActionTree, ActionContext } from "vuex";

import { RootState } from "@/store";
import { State, state } from "./state";
import { Mutations } from "./mutations";
import { TasksActionTypes } from "./action-types";
import { taskList } from "@/types/taskList";
import { TasksMutationTypes } from "@/store/modules/Tasks/mutation-types";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

interface addTask {
  name: string;
  categoryId: string;
  categoryName: string;
  todoCate: string;
}

interface updateTask {
  taskId: string;
  taskName: string;
}

export interface Actions {
  [TasksActionTypes.ADD_TASK](
    { commit }: AugmentedActionContext,
    task: addTask
  ): void;
  [TasksActionTypes.UPDATE_TASK_STATUS](
    { commit }: AugmentedActionContext,
    taskId: string
  ): void;
  [TasksActionTypes.UPDATE_TASK_NAME](
    { commit }: AugmentedActionContext,
    updateTask: updateTask
  ): void;
  [TasksActionTypes.REMOVE_TASK](
    { commit }: AugmentedActionContext,
    taskId: string
  ): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  [TasksActionTypes.ADD_TASK](
    { commit }: AugmentedActionContext,
    task: addTask
  ) {
    const newTask: taskList = {
      taskId: uniqid("task-"),
      categoryId: task.categoryId,
      name: task.name,
      categoryName: task.categoryName,
      todoCate: task.todoCate,
      isDone: false,
    };

    commit(TasksMutationTypes.ADD_TASK, newTask);
  },
  [TasksActionTypes.UPDATE_TASK_STATUS](
    { commit }: AugmentedActionContext,
    taskId: string
  ) {
    const taskIndex = state.tasks.findIndex(
      (task: taskList) => task.taskId === taskId
    );
    commit(TasksMutationTypes.UPDATE_TASK_STATUS, taskIndex);
  },
  [TasksActionTypes.UPDATE_TASK_NAME](
    { commit }: AugmentedActionContext,
    updateTask: updateTask
  ) {
    const taskIndex = state.tasks.findIndex(
      (task: taskList) => task.taskId === updateTask.taskId
    );
    const newTask = {
      ...updateTask,
      taskIndex,
    };
    commit(TasksMutationTypes.UPDATE_TASK_NAME, newTask);
  },
  [TasksActionTypes.REMOVE_TASK](
    { commit }: AugmentedActionContext,
    taskId: string
  ) {
    const taskIndex = state.tasks.findIndex(
      (task: taskList) => task.taskId === taskId
    );
    commit(TasksMutationTypes.REMOVE_TASK, taskIndex);
  },
};
