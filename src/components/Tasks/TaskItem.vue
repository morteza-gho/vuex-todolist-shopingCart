<template>

  <div class="task-item" :class="task.completed ? 'done' : ''">

    <div class="form-check">
      <input class="form-check-input" type="checkbox" :id="task.id" :checked="task.completed"
        @change="changeTaskStatus(task)">
      <label class="form-check-label" :for="task.id">
        <del class="title" v-if="task.completed">{{ task.title }}</del>
        <span class="title" v-else>{{ task.title }}</span>
      </label>
    </div>

    <div class="btn-group btn-group-sm">
      <button type="button" class="btn btn-outline-secondary" @click="editTask(task)">
        <i class="bi bi-pencil"></i>
      </button>
      <button type="button" class="btn btn-outline-danger" @click="deleteTask(task.id)">
        <i class="bi bi-trash"></i>
      </button>
    </div>

  </div>

</template>

<script setup>
import {defineProps, defineEmits} from "vue"
import {useTasksStore} from "../../store/tasks";

const store = useTasksStore();

const props = defineProps({
  task: Object
});
const emits = defineEmits(['editTask']);

const editTask = (task) => {
  emits('editTask', task)
};

const deleteTask = async (id) => {
  if (window.confirm('Are you sure to delete this task')) {
    await store.deleteTask(id);
  }
}

const changeTaskStatus = async (task) => {
  task.completed = !task.completed;
  await store.updateTask(task);
};

</script>