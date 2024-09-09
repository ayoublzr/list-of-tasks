<template>
  <h3>Todo List</h3>
  <div class="list">
    <!-- Boucle à travers la liste des tâches avec v-for -->
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
  todos: Array,  // Le composant reçoit un tableau de tâches à afficher
});

// Définition des événements que ce composant peut émettre
const emit = defineEmits(["removeTodo"]);

// Fonction pour supprimer une tâche
const removeTodo = (todo) => {
  emit("removeTodo", todo);  
};
</script>

<style scoped></style>
