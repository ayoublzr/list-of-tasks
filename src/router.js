import { createRouter, createWebHistory } from "vue-router";
import MainView from "./views/MainView.vue";
import CompletedTasksView from "./views/CompletedView.vue";

// Déclaration des routes pour l'application
const routes = [
    // Route pour la page principale (chemin racine "/")
    { path: "/", component: MainView },
    
    // Route pour la page des tâches complétées (chemin "/completed")
    { path: "/completed", component: CompletedTasksView },
  ];
  
  const router = createRouter({
    // Utilisation de l'historique de navigation du navigateur pour gérer les URLs 
    history: createWebHistory(),
    routes,
  });
  

export default router;
