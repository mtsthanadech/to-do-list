import { taskList } from "@/types/taskList";

export type State = {
  tasks: taskList[] | [];
};

export const state: State = {
  tasks: [],
};
