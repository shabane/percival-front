<template>
  <div class="d-flex justify-content-center mt-5">
    <div class="user-border col-9 col-lg-6">
      <div>
        <div class="user-toolbox">
          <button class="btn btn-outline-secondary m-2">File</button>
          <button class="btn btn-outline-secondary m-2">Text</button>
          <button class="btn btn-outline-secondary m-2">Link</button>
          <button class="btn btn-outline-secondary m-2">⚙️</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
};
</script>

<style scoped>
.user-border {
  border: #2ecc71 1px solid;
  border-top: none;
  height: 400px;
  background-color: #373737;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.user-toolbox {
  background-color: #404040;
}
</style>
