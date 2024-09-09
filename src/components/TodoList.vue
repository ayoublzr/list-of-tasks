<template>
  <h3>Todo List</h3>
  <div class="list">
    <TodoItem
      v-for="todo in todos"
      :key="todo.createdAt"
      :todo="todo"
      @delete="removeTodo"
    />
  </div>
</template>

<script setup>
import TodoItem from "./TodoItem.vue";

const props = defineProps({
  todos: Array,
});

const emit = defineEmits(["removeTodo"]);

const removeTodo = (todo) => {
  emit("removeTodo", todo);
};
</script>

<style scoped>

</style>
