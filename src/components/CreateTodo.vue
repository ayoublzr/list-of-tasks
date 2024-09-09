<template>
  <h3>Create a Todo</h3>

  <form @submit.prevent="handleAddTodo">
    <input
      type="text"
      placeholder="e.g. make a video"
      :value="inputContent"
      @input="updateInputContent($event.target.value)"
    />
    <button type="submit">Add Todo</button>
  </form>
</template>

<script setup>
const props = defineProps({
  inputContent: String,
});

const emit = defineEmits(["addTodo", "update:inputContent"]);

const updateInputContent = (value) => {
  emit("update:inputContent", value);
};

const handleAddTodo = () => {
  if (props.inputContent.trim() !== "") {
    emit("addTodo", props.inputContent);
  }
};
</script>

<style scoped>
.create-todo input[type="text"] {
  display: block;
  width: 100%;
  font-size: 1.125rem;
  background-color: white;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
}
</style>
