<template>
   <header>

      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
         <div class="container">
            <router-link to="/" class="navbar-brand">Todo List</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
               <ul class="navbar-nav">
                  <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
                  <li class="nav-item"><router-link :to="{name: 'tasks'}" class="nav-link">tasks</router-link></li>
               </ul>
            </div>
         </div>
      </nav>
   </header>
</template>
<script>
   export default {
      name: 'MainHeader'
   }
</script>
<style scoped>
   .router-link-active {
      color: #FFF !important;
   }
</style>