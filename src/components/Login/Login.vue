<template>
  <div class="d-flex flex-column align-items-center justify-content-center" style="height: 100vh;">
    <div class="card p-5">
      <div class="card-body text-center">
        <div class="card-title">
          <h1 class="mb-5">Login To Site</h1>
        </div>
        <button class="btn btn-lg btn-dark" @click="login">Login</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';

const store = useAuthStore();
const router = useRouter();

const login = async () => {
  await store.setToken('testToken');
  router.push({ name: 'home' });
};

</script>