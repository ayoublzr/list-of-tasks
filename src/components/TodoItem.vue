<template>
  <div>
    <label>
      <input type="checkbox" v-model="todo.done" />
    </label>
    <div>
      <input
        v-if="todo.isEditing"
        type="text"
        v-model="todo.tempContent"
        @keyup.enter="updateTodoContent(todo)"
      />
      <span v-else>{{ todo.content }}</span>
    </div>

    <div>
      <button @click="editTodo(todo)">
        {{ todo.isEditing ? "Save" : "Edit" }}
      </button>
      <button @click="$emit('delete', todo)">Delete</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  todo: Object,
});

const emit = defineEmits(["delete"]);

const editTodo = (todo) => {
  if (todo.isEditing) {
    updateTodoContent(todo);
  } else {
    todo.tempContent = todo.content;
  }
  todo.isEditing = !todo.isEditing;
};

const updateTodoContent = (todo) => {
  if (todo.tempContent.trim() !== "") {
    todo.content = todo.tempContent;
  }
};
</script>
<style scoped></style>
