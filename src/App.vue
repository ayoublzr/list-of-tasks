<template>
  <section class="header">
    <h1>My Task List</h1>
  </section>
  <router-view />
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>
<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: var(--light);
  color: var(--dark);
}
</style>
