<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl">Netplix</a>
    </div>
    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2  bg-base-100 rounded-box w-full flex flex-row flex-1 gap-2">
      <li><RouterLink to="/">Series</RouterLink></li>
      <li><RouterLink to="/about">Movie</RouterLink></li>
      <li><RouterLink to="/about">Genre</RouterLink></li>
    </ul>
    <div class="flex-none gap-2">
      <div class="form-control">
        <input type="text" 
        placeholder="Search" 
        class="input input-bordered" 
        v-model="store.query"
        />
      </div>
    </div>
  </div>
  <RouterView />
<Footer/>
</template>
<script setup>
import { RouterLink, RouterView } from "vue-router";
import Footer from "./components/Footer.vue"
import { ref, onMounted, computed, onUnmounted, watchEffect } from "vue";
import { useMovieStore } from "./stores/store.js"

const store = useMovieStore();

watchEffect(async () => {
      await store.fetchSearchMovies();
});
const movies = computed(() => {
    return store.movies;
});

</script>

