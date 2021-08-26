<template>
  <div class="input-group mb-3">
    <input
      type="text"
      :placeholder="placeholder"
      :aria-label="placeholder"
      class="form-control"
      @keypress.enter="onPress(newValue, header)"
      v-model="newValue"
    />
    <button
      class="btn btn-outline-primary"
      type="button"
      id="button-addon2"
      @click="onPress(newValue, header)"
    >
      {{ buttonLabel }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "inputButton",
  props: {
    value: {
      type: String,
      default: "",
    },
    header: {
      type: String,
      default: "",
    },
    buttonLabel: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  setup: (props, { emit }) => {
    const newValue = ref<string>(props.value);
    const onPress = (value: string, header: string) => {
      if (value !== "") {
        emit("onClick", { name: newValue.value, header });
        newValue.value = "";
      }
    };

    return {
      onPress,
      newValue,
    };
  },
});
</script>
