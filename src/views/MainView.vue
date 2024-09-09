<template>
  <main>
    <section class="create-todo">
      <CreateTodo
        :inputContent="inputContent"
        @update:inputContent="inputContent = $event"
        @addTodo="addTodo"
      />
    </section>
    <section>
      <label for="filter">Filter tasks:</label>
      <select v-model="filterType" id="filter">
        <option value="all">All tasks</option>
        <option value="completed">Completed tasks</option>
        <option value="incomplete">Incomplete tasks</option>
      </select>
    </section>
    <section>
      <TodoList :todos="sortedTodos" @removeTodo="removeTodo" />
    </section>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import CreateTodo from "../components/CreateTodo.vue";
import TodoList from "../components/TodoList.vue";

const todos = ref([]);
const inputContent = ref("");
const filterType = ref("all");

const sortedTodos = computed(() => {
  return todos.value
    .filter((todo) => {
      if (filterType.value === "completed") return todo.done;
      if (filterType.value === "incomplete") return !todo.done;
      return true;
    })
    .sort((a, b) => b.createdAt - a.createdAt);
});

const addTodo = (content) => {
  todos.value.push({
    content,
    done: false,
    createdAt: new Date().getTime(),
    isEditing: false,
  });
  inputContent.value = "";
};

const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo); // Filtrer le tableau pour exclure la tâche à supprimer
};
onMounted(() => {
  todos.value = JSON.parse(localStorage.getItem("todos")) || [];
});

watch(
  todos,
  (newVal) => {
    localStorage.setItem("todos", JSON.stringify(newVal));
  },
  { deep: true }
);
</script>

<style scoped></style>
