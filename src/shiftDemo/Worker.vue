<template>
  <div class="col d-flex flex-column h-sm-100">
    <main class="row overflow-auto m-1 fs-6 bg-light">
      <div class="card">
        <div class="card-body px-0">ID: {{ id }}</div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const id = route.params.id;
</script>

<style></style>
