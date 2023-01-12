<template>
  <swiper
    :slidesPerView="'auto'"
    :centeredSlides="true"
    :spaceBetween="30"
    :pagination="{
      clickable: true,
    }"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :loop="true"
    class="mySwiper"
    
  >
    <swiper-slide class="card card-side bg-base-100 h-[300px] w-3/5 shadow-xl" v-for="(movie, index) in movies" :key="index">
      <figure class="w-[700px]"><img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie"/></figure>
      <div class="card-body">
        <h2 class="card-title">{{movie.original_title}}</h2>
        <p>{{movie.overview}}</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary"  for="my-modal"  @click="onClickVidio(movie.id)">Watch Trailer</button>
        </div>
      </div>
    </swiper-slide>
  </swiper>

</template>
<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useMovieStore } from "../stores/store.js"
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";

const store = useMovieStore();
const root = ref();
const modules = [Autoplay, Pagination];

onMounted(async () => {
    await store.fetchMovies();
    console.log("reload", store.moviesVidio.length);
});

const  onClickVidio= async (id) => {
  store.flim(id);
  await store.fetchVidioMovies(); 
  movies.value = store.movies;
}

const movies = computed(() => {
    return store.movies;
});

const moviesVidios = computed(() => {
  console.log("onclick", store.moviesVidio);

    return store.moviesVidio;
});

</script>

<style>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
