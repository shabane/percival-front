<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="/">
        <img
          src="@/assets/percival.jpg"
          alt="Logo"
          style="width: 40px; height: 40px"
        />
        <span style="color: #5d6d7e">P</span
        ><span style="color: #85929e">ercival</span>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <a class="nav-link" href="/about"
              ><span style="color: #5d6d7e">./</span>About</a
            >
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/Projects"
              ><span style="color: #5d6d7e">./</span>Projects</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "HeaderBar",
};
</script>

<style scoped>
img {
  border-radius: 50%;
}
</style>
