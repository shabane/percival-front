<template>
  <div class="row user-item m-3">
    <div>
      <span class="col-1">⬇️</span>
      <span class="col-2 text-warning">@{{ sender }} </span>
      <hr />
    </div>
    <a class="col" :href="dest"> {{ dest }}</a>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "TextList",
  props: ["dest", "sender"],

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
