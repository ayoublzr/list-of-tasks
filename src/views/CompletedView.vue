<template>
    
    <main class="app">
      
      <!-- Section avec un bouton pour retourner à la vue principale -->
      <section>
        <button @click="goToMain">Back to Main View</button>
      </section>
  
      <!-- Section affichant la liste des tâches complétées -->
      <section class="todo-list">
        <h3>COMPLETED TASKS</h3>  
  
        
        <div class="list">
          <div
            v-for="todo in completedTodos"  
            :class="`todo-item ${todo.done && 'done'}`"  
            :key="todo.createdAt" 
          >
           
            <div class="todo-content">
              <span>{{ todo.content }}</span>  <!-- Affiche le contenu de la tâche -->
            </div>
  
            
            <div class="actions">
              <button class="delete" @click="removeTodo(todo)">Delete</button>  <!-- Bouton pour supprimer la tâche -->
            </div>
          </div>
        </div>
      </section>
    </main>
  </template>
  

  <script setup>
  import { ref, computed, watch, onMounted } from "vue";  
  import { useRouter } from "vue-router";  
  
  const router = useRouter();  
  const todos = ref([]);  
  
  // Computed pour obtenir uniquement les tâches complétées et les trier par date de création
  const completedTodos = computed(() =>
    todos.value
      .filter((todo) => todo.done)  // Filtre les tâches complétées
      .sort((a, b) => b.createdAt - a.createdAt)  // Trie les tâches par date de création (les plus récentes d'abord)
  );
  
  // Fonction pour supprimer une tâche
  const removeTodo = (todo) => {
    todos.value = todos.value.filter((t) => t !== todo);  
  };
  
  // Watcher pour sauvegarder la liste des tâches dans le localStorage à chaque modification
  watch(
    todos,  
    (newVal) => {
      localStorage.setItem("todos", JSON.stringify(newVal));  
    },
    { deep: true }  // Active une surveillance en profondeur pour détecter les modifications sur les objets imbriqués
  );
  
  // OnMounted pour charger les tâches du localStorage lorsque le composant est monté
  onMounted(() => {
    todos.value = JSON.parse(localStorage.getItem("todos")) || [];  // Charge les tâches depuis le localStorage ou crée un tableau vide si aucune tâche n'est présente
  });
  
  // Fonction pour naviguer vers la vue principale
  const goToMain = () => {
    router.push("/");  
  };
  </script>
  

<style></style>
