<template>
  <div class="flex justify-center flex-wrap" >
    <div class="flex-none m-8" v-for="(movie, index) in movies" :key="index">
      <div className="card w-96 bg-base-100 shadow-xl image-full">
        <figure><img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Shoes" /></figure>
        <div className="card-body h-0 group-hover:h-full">
          <h2 className="card-title">{{movie.original_title}}</h2>
          <p>{{movie.overview}}</p>
          <div className="card-actions justify-end">
            <label className="btn btn-primary" for="my-modal"  @click="onClickVidio(movie.id, movie.original_title, movie.overview)">Pop Up</label>
          </div>
        </div>
      </div>
    </div>
  </div>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative max-w-5xl">
        <label for="my-modal" class="btn btn-sm btn-circle absolute right-5 top-2 fixed " v-if="!modalShow"  @click="pauseVidio">X</label>
          <iframe width="100%" ref="root" height="300px" className="mt-5 block"  v-if="moviesVidios.length > 0"
        :src="`https://www.youtube.com/embed/${moviesVidios[0].key}?autoplay=1`" allow="autoplay" style="position: unset !important;">
      </iframe>    

      <h2 class="card-title">
        {{ nameFilm }}
      </h2>
        <p>{{descFilm}}</p>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useMovieStore } from "../stores/store.js"

const store = useMovieStore();
const root = ref();
let nameFilm = '';
let descFilm = '';

onMounted(async () => {
    await store.fetchMovies();
    console.log("reload", store.moviesVidio.length);
});

const  onClickVidio= async (id, name, desc) => {
  store.flim(id);
  console.log('desc popup ', name, desc);
  nameFilm = name;
  descFilm = desc;
  await store.fetchVidioMovies();
  movies.value = store.movies;
}

const movies = computed(() => {
    return store.movies;
});

const moviesVidios = computed(() => {
  console.log("onclick", store.moviesVidio);
    return store.moviesVidio;
    // return {
    //   key: store.moviesVidio[0].key,
    //   desc: store.movies,
    //   length : store.moviesVidio.length
    // }
});

function pauseVidio() {
  console.log("Yeah")
  console.log(root.value)
  nameFilm = '';
  descFilm = '';
    // root.value.pause();
    // console.log(root.value)
    // root.value.remove();
    return root
}

// const  onClickVidio= async (id) => {
// await store.fetchVidioMovies();
// }


</script>
