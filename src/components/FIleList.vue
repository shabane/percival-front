<template>
  <div class="row user-item m-3">
    <div>
      <span class="col-1 m-1">⬇️</span>
      <span class="col-2 text-warning">@{{ sender }} </span>
      <hr />
    </div>
    <a class="col">{{ file_name }}</a>
  </div>
</template>

<script>
export default {
  name: "FIleList",
  props: ["file_name", "sender"],
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #3498db;
}
</style>
