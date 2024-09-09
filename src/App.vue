<template>
  <section class="header">
    <h1>
      My Tasks List
    </h1>
  </section>
  <section>
    <MainView />
  </section>
</template>

<script setup>
import MainView from './views/MainView.vue'
</script>

<style scoped>
 .header {
  display: flex;
  justify-content: center;  
  align-items: center;      
  height: 50px;            
  background-color: var(--light); 
  color: var(--dark)
}
</style>