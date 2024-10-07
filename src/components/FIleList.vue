<template>
  <div class="row user-item m-3">
    <span class="col-1">⬇️</span>
    <a class="col">{{ file_name }}</a>
  </div>
</template>

<script>
export default {
  name: "FIleList",
  props: ["file_name"],
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #3498db;
}
</style>
