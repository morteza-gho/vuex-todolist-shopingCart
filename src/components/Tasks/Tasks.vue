<template>

  <Loading v-if="isLoading"></loading>

  <div class="col-md-6 col-sm-12 col-12">

    <div class="tasks" v-if="!isLoading">

      <form class="mb-3" @submit.prevent="submitForm">
        <div class="row g-3">
          <div class="col-9 position-relative">
            <input type="text" class="form-control form-control-lg" placeholder="Enter task title..." v-model="newTask">
            <span class="bi bi-x cancel-edit" v-if="editingTask" @click="cancelEdit"></span>
          </div>
          <div class="col-3">
            <button type="submit" class="btn btn-lg btn-dark w-100 d-flex justify-content-around align-items-center" :disabled="miniLoading">
              <span class="spinner-grow spinner-grow-sm" v-if="miniLoading"></span>
              <i class="bi bi-check-lg" v-else></i>
              <span v-if="editingTask">Edit Task</span>
              <span v-else>Add Task</span>
            </button>
          </div>
          <small class="mt-1 text-danger" v-if="hasError">Task title is required.</small>
        </div>
      </form>

      <div v-for="task in tasks" class="task-item" :key="task.id">

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

    </div>

  </div>

</template>
<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Loading from '../Global/Loading.vue';

const store = useStore();
const tasks = computed(() => store.getters.allTasks);
const isLoading = ref(false);
const miniLoading = ref(false);
const hasError = ref(false);
const editingTask = ref();
const newTask = ref('');

const fetchTasks = async () => {
  isLoading.value = true;
  await store.dispatch('fetchTasks');
  isLoading.value = false;
};

const editTask = (task) => {
  editingTask.value = task;
  newTask.value = task.title;
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
      await store.dispatch('updateTask', {
        id: editingTask.value.id,
        userId: 1,
        title: newTask.value,
        completed: editingTask.value.completed
      });
      editingTask.value = null;
    } else {
      // add mode
      await store.dispatch('addTask', {
        userId: 1,
        title: newTask.value,
        completed: false
      });
    }

    newTask.value = '';
    miniLoading.value = false;
  }
}

const changeTaskStatus = async (task) => {
  task.completed = !task.completed;
  await store.dispatch('updateTask', task);
};

const deleteTask = async (id) => {
  if (window.confirm('Are you sure to delete this task')) {
    await store.dispatch('deleteTask', id);
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