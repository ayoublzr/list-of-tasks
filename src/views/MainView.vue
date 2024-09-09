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
      <label>Filter tasks:</label>
      <select>
        <option value="all">All tasks</option>
        <option value="completed">Completed tasks</option>
        <option value="incomplete">Incomplete tasks</option>
      </select>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import CreateTodo from "../components/CreateTodo.vue";

const todos = ref([]);
const inputContent = ref("");



const addTodo = (content) => {
  todos.value.push({
    content,  
    done: false,  
    createdAt: new Date().getTime(),  
    isEditing: false,  
  });
  inputContent.value = "";  
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
