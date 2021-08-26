<template>
  <div class="todo">
    <div class="todo-cate">
      <div class="todo-cate-header">
        <h5>
          {{ header.name }}
        </h5>
      </div>
      <div class="todo-list-wrapper">
        <todo
          v-for="(task, index) in taskList"
          :key="task.name + index"
          :task="task"
          @onRemove="removeTask"
          @updateTaskName="updateTaskName"
          @onChangeStatus="updateTaskStatus"
        />
        <div class="todo-list todo-list-add">
          <inputButton
            @onClick="addTask"
            :header="header.name"
            placeholder="Enter your task"
            button-label="Add Task"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { taskCate, taskList } from "@/types/taskList";
import { category } from "@/types/category";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import todo from "@/components/tasks/todo.vue";
import inputButton from "@/components/inputButton.vue";
import { TasksActionTypes } from "@/store/modules/Tasks/action-types";

export default defineComponent({
  name: "To-do-list",
  props: {
    categoryId: {
      type: String,
      default: "",
    },
  },
  components: {
    todo,
    inputButton,
  },
  setup: (props) => {
    const store = useStore();
    const header = ref<taskCate>({
      name: "Task List",
    });

    const taskList = computed(() => {
      if (
        props.categoryId === store.state.categories.categories[0].categoryId
      ) {
        return store.state.tasks.tasks;
      }

      return store.state.tasks.tasks.filter(
        (task: taskList) => task.categoryId === props.categoryId
      );
    });

    const addTask = (task: { name: string; header: string }) => {
      const category = store.state.categories.categories.find(
        (cate: category) => cate.categoryId === props.categoryId
      );

      store.dispatch(TasksActionTypes.ADD_TASK, {
        name: task.name,
        categoryId: props.categoryId,
        categoryName: category.name,
        todoCate: task.header,
      });
    };

    const updateTaskStatus = (taskId: string) => {
      store.dispatch(TasksActionTypes.UPDATE_TASK_STATUS, taskId);
    };

    const updateTaskName = (task: { name: string; taskId: string }) => {
      store.dispatch(TasksActionTypes.UPDATE_TASK_NAME, {
        taskName: task.name,
        taskId: task.taskId,
      });
    };

    const removeTask = (taskId: string) => {
      store.dispatch(TasksActionTypes.REMOVE_TASK, taskId);
    };

    return {
      header,
      taskList,
      addTask,
      updateTaskStatus,
      updateTaskName,
      removeTask,
    };
  },
});
</script>

<style scoped lang="scss">
.todo {
  width: calc(100vw - 380px);
  height: 100vh;
  overflow: scroll;
  display: flex;
  flex-flow: column;
  padding: 30px;

  &-cate {
    margin-bottom: 30px;

    &-header {
      display: flex;
      justify-content: flex-start;
    }
  }
  &-list {
    width: 100%;
    display: flex;
    text-align: left;
    padding: 10px;
    align-items: center;

    &-wrapper {
      display: flex;
      flex-flow: column-reverse;
      align-items: flex-start;
    }

    &-add {
      border: none;
    }
  }
}

i {
  &.bi {
    font-size: 20px;
  }
}
</style>
