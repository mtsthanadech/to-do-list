<template>
  <div class="todo-list-layout">
    <div class="todo-list">
      <i
        v-if="haveTaskId"
        @click="updateTaskStatus(task.taskId)"
        :class="['bi', !isDone ? 'bi-circle' : 'bi-check-circle']"
      ></i>
      <div class="todo-list-name">
        <div :class="isDone ? 'text-decoration-line-through' : null">
          <div v-if="!isEdit">
            {{ task.name }}
            <i
              v-if="!isDone"
              class="bi bi-pencil-square"
              @click="editTask(task.name, task.taskId)"
            ></i>
          </div>
          <div v-else>
            <inputButton
              @onClick="updateTaskName"
              placeholder="Enter your task"
              button-label="Update"
              :header="task.taskId"
              :value="editTaskName.name"
            />
          </div>
        </div>
      </div>
    </div>
    <i
      v-if="isDone"
      @click="removeTask(task.taskId)"
      class="bi bi-x-circle"
    ></i>
  </div>
</template>

<script lang="ts">
import { taskList } from "@/types/taskList";
import { computed, defineComponent, ref } from "vue";
import inputButton from "@/components/inputButton.vue";

interface taskName {
  name: string;
  taskId: string;
}

export default defineComponent({
  name: "todo",
  components: {
    inputButton,
  },
  props: {
    task: {
      // type: taskList,
      default: {
        taskId: "",
        categoryId: "",
        name: "",
        categoryName: "",
        todoCate: "",
        isDone: false,
      },
    },
  },
  setup(props, { emit }) {
    const editTaskName = ref<taskName>({
      name: "",
      taskId: "",
    });

    const isDone = computed(() => {
      return props.task.isDone;
    });
    const isEdit = computed(() => {
      return editTaskName.value.taskId === props.task.taskId;
    });
    const haveTaskId = computed(() => {
      return editTaskName.value.taskId === "";
    });

    const editTask = (name: string, taskId: string) => {
      editTaskName.value = { name, taskId };
    };

    const updateTaskName = (task: { name: string; header: string }) => {
      emit("updateTaskName", {
        name: task.name,
        taskId: task.header,
      });

      editTaskName.value = {
        name: "",
        taskId: "",
      };
    };

    const updateTaskStatus = (taskId: string) => {
      emit("onChangeStatus", taskId);
    };
    const removeTask = (taskId: string) => {
      emit("onRemove", taskId);
    };

    return {
      updateTaskStatus,
      updateTaskName,
      removeTask,
      editTask,
      editTaskName,
      isDone,
      isEdit,
      haveTaskId,
    };
  },
});
</script>

<style scoped lang="scss">
.todo {
  &-list {
    width: 100%;
    display: flex;
    text-align: left;
    padding: 10px;
    align-items: center;

    &-layout {
      width: 100%;
      display: flex;
      text-align: left;
      padding: 10px;
      align-items: center;
      border-bottom: 1px solid #d8d8d8;
    }

    &-name {
      margin-left: 10px;
    }
  }
}
</style>
