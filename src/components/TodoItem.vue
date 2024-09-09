<template>
  <div :class="['todo-item', { done: todo.done }]">
    <label>
      <input type="checkbox" v-model="todo.done" />
      <span class="bubble"></span>
    </label>
    <div class="todo-content">
      <input
        v-if="todo.isEditing"
        type="text"
        v-model="todo.tempContent"
        @keyup.enter="updateTodoContent(todo)"
      />
      <span v-else>{{ todo.content }}</span>
    </div>

    <div class="actions">
      <button class="edit" @click="editTodo(todo)">
        {{ todo.isEditing ? "Save" : "Edit" }}
      </button>
      <button class="delete" @click="$emit('delete', todo)">Delete</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  todo: Object,
});

const emit = defineEmits(["delete"]);

const editTodo = (todo) => {
  if (todo.isEditing) {
    updateTodoContent(todo);
  } else {
    todo.tempContent = todo.content;
  }
  todo.isEditing = !todo.isEditing;
};

const updateTodoContent = (todo) => {
  if (todo.tempContent.trim() !== "") {
    todo.content = todo.tempContent;
  }
};
</script>

<style scoped>
.todo-item label {
  margin-right: 1rem;
}
.todo-item .todo-content input {
  color: var(--blue);
  font-size: 1.125rem;
  border-radius: 0.5rem;
  border-color: var(--primary);
  border: 2px solid;
  padding: 0.5rem;
  transition: all 0.3s ease;
  width: 50%;
}

.todo-item .todo-content input:focus {
  border-color: var(--primary);
  background-color: #ffffff;
  box-shadow: 0 0 5px var(--primary);
}

.todo-item .actions .edit {
  background-color: rgba(32, 32, 155, 0.842);
  margin-right: 0.5rem;
}

input:checked ~ .bubble::after {
  width: 10px;
  height: 10px;
  opacity: 1;
}

input[type="radio"],
input[type="checkbox"]:not(.custom-checkbox) {
  display: none;
}

.bubble {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--blue);
  box-shadow: var(--business-glow);
}
.bubble::after {
  content: "";
  background-color: var(--primary);
  border-radius: 50%;
} 

.todo-item.done .todo-content span {
  text-decoration: line-through;
  color: var(--grey);
}
.todo-item .actions {
    display: flex;
    align-items: center;
  }

</style>
