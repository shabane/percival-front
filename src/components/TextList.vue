<template>
  <div class="row user-item m-3" @click="copyToClip(text)">
    <div>
      <span class="col-1 m-1">⬇️</span>
      <span class="col-2 text-warning">@{{ sender }} </span>
      <hr />
    </div>
    <pre class="col mt-3">{{ text }}</pre>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "TextList",
  props: ["text", "sender"],

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
pre {
  text-decoration: none;
  color: #3498db;
  overflow-x: hidden;
}
</style>
