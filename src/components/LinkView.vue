<template>
  <div class="row user-item m-3">
    <span class="col-1">⬇️</span>
    <a class="col" :href="dest"> {{ dest }}</a>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "TextList",
  props: ["dest"],

  data() {
    return {};
  },

  methods: {
    copyToClip(text) {
      navigator.clipboard.writeText(text);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Copied!",
        showConfirmButton: false,
        timer: 1000,
      });
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #3498db;
}
</style>
