<template>

  <Loading v-if="isLoading"></loading>

  <div class="col-md-6 col-sm-12 col-12">

    <div class="tasks" v-if="!isLoading">

      <form class="mb-3" @submit.prevent="submitForm">
        <div class="row g-3">
          <div class="col-8 position-relative">
            <input type="text" class="form-control form-control-lg" placeholder="Enter task title..." v-model="newTask" ref="newTaskRef">
            <span class="bi bi-x cancel-edit" v-if="editingTask" @click="cancelEdit"></span>
          </div>
          <div class="col-4">
            <button type="submit" class="btn btn-lg btn-dark w-100 d-flex justify-content-around align-items-center" :disabled="miniLoading">
              <span class="spinner-grow spinner-grow-sm" v-if="miniLoading"></span>
              <span v-if="editingTask"><i class="bi bi-check-lg"></i> Edit Task</span>
              <span v-else><i class="bi bi-plus-lg"></i> Add Task</span>
            </button>
          </div>
          <small class="mt-1 text-danger" v-if="hasError">Task title is required.</small>
        </div>
      </form>

      <task-item v-for="task in tasks" :task="task" @edit-task="onEditTask"></task-item>

    </div>

  </div>

</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import {useTasksStore} from "../../store/tasks";
import Loading from '../Global/Loading.vue';
import TaskItem from "./TaskItem.vue"

const store = useTasksStore();
const tasks = computed(() => store.allTasks);
const isLoading = ref(false);
const miniLoading = ref(false);
const hasError = ref(false);
const editingTask = ref();
const newTask = ref('');
const newTaskRef = ref(null);

const fetchTasks = async () => {
  isLoading.value = true;
  await store.fetchTasks();
  isLoading.value = false;
};

const onEditTask = (task) => {
  editingTask.value = task;
  newTask.value = task.title;
  newTaskRef.value.focus();
}
const cancelEdit = () => {
  editingTask.value = null;
  newTask.value = '';
}

const submitForm = async () => {
  if (newTask.value === '') {
    hasError.value = true;
  } else {
    hasError.value = false;
    miniLoading.value = true;

    if (editingTask.value) {
      // edit mode
      await store.updateTask({
        id: editingTask.value.id,
        userId: 1,
        title: newTask.value,
        completed: editingTask.value.completed
      });
      editingTask.value = null;
    } else {
      // add mode
      await store.addTask({
        userId: 1,
        title: newTask.value,
        completed: false
      });
    }

    newTask.value = '';
    miniLoading.value = false;
  }
}

onMounted(() => {
  fetchTasks();
});


</script>
<style>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FAFAFA;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
  margin-bottom: 15px;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  border-left: 5px solid transparent;
}
.task-item.done {
  border-left-color: lightgreen;
}

.task-item:hover {
  box-shadow: 0 3px 5px rgba(0, 0, 0, .2);
}

.form-check {
  display: flex;
  align-items: center;
  font-size: 20px;
}

.cancel-edit {
  position: absolute;
  top: 2px;
  right: 15px;
  color: gray;
  cursor: pointer;
  font-size: 30px;
}
.cancel-edit:hover {
  color: red;
}

.form-check .form-check-input {
  margin-right: 10px;
}

.form-check-label {
  font-size: 16px;
  cursor: pointer;
}
</style>