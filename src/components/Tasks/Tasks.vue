<template>

  <Loading v-if="isLoading"></loading>
  <div class="col-md-6 col-sm-12 col-12" v-else>

    <div class="tasks">
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
          <button type="button" class="btn btn-outline-secondary">
            <i class="bi bi-pencil"></i>
          </button>
          <button type="button" class="btn btn-outline-danger">
            <i class="bi bi-trash"></i>
          </button>
        </div>

      </div>
    </div>

  </div>

</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Loading from '../Global/Loading.vue';

const isLoading = ref(false);
const store = useStore();
const tasks = computed(() => store.getters.allTasks);

const fetchTasks = async () => {
  isLoading.value = true;
  await store.dispatch('fetchTasks');
  isLoading.value = false;
};

const changeTaskStatus = async (task) => {
  task.completed = !task.completed;
  await store.dispatch('updatetask', task);
};

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

.form-check .form-check-input {
  margin-right: 10px;
}

.form-check-label {
  font-size: 16px;
  cursor: pointer;
}
</style>