<template>
  <main>
    <!-- Section pour créer une nouvelle tâche -->
    <section class="create-todo">
      <CreateTodo
        :inputContent="inputContent"
        @update:inputContent="inputContent = $event"
        @addTodo="addTodo"
      />
    </section>

    <!-- Section pour filtrer les tâches -->
    <section>
      <label for="filter">Filter tasks:</label>
      <!-- Menu déroulant pour sélectionner le type de filtre -->
      <select v-model="filterType" id="filter">
        <option value="all">All tasks</option>
        <option value="completed">Completed tasks</option>
        <option value="incomplete">Incomplete tasks</option>
      </select>
    </section>

    <section class="todo-list">
      <!-- Composant TodoList pour afficher les tâches triées -->
      <TodoList :todos="sortedTodos" @removeTodo="removeTodo" />
    </section>

    <section>
      <button @click="goToCompleted">View Completed Tasks</button>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import TodoList from "../components/TodoList.vue";
import CreateTodo from "../components/CreateTodo.vue";

// Utilisation du routeur de Vue pour naviguer entre les vues
const router = useRouter();

// Déclaration des variables réactives
const todos = ref([]);
const inputContent = ref("");
const filterType = ref("all");

// Computed property pour trier et filtrer les tâches
const sortedTodos = computed(() => {
  return todos.value
    .filter((todo) => {
      // Filtrage des tâches selon le type de filtre sélectionné
      if (filterType.value === "completed") return todo.done;
      if (filterType.value === "incomplete") return !todo.done;
      return true;
    })
    .sort((a, b) => b.createdAt - a.createdAt); // Tri des tâches par date de création, de la plus récente à la plus ancienne
});

// Fonction pour ajouter une nouvelle tâche
const addTodo = (content) => {
  todos.value.push({
    content,
    done: false, // La tâche est initialement marquée comme non terminée
    createdAt: new Date().getTime(), // Date de création de la tâche (timestamp en millisecondes)
    isEditing: false, // La tâche n'est pas en mode édition par défaut
  });
  inputContent.value = ""; // Réinitialiser le champ de saisie après ajout
};

// Fonction pour supprimer une tâche
const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo); // Filtrer le tableau pour exclure la tâche à supprimer
};

const goToCompleted = () => {
  router.push("/completed");
};

onMounted(() => {
  // Charger les tâches depuis le stockage local, ou initialiser avec un tableau vide si aucune donnée n'est trouvée
  todos.value = JSON.parse(localStorage.getItem("todos")) || [];
});

// Surveiller les changements dans le tableau des tâches
watch(
  todos,
  (newVal) => {
    // Mettre à jour le stockage local avec les nouvelles tâches
    localStorage.setItem("todos", JSON.stringify(newVal));
  },
  { deep: true } // Observer les changements en profondeur dans le tableau des tâches
);
</script>
<style scoped>
/* Style pour le label */
section label {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--dark);
  margin-right: 1rem;
}

/* Style pour le select */
section select {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  color: var(--dark);
  transition: border-color 0.3s ease;
  min-width: 150px;
}
</style>
