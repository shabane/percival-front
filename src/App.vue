<template>
  <div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ecf0f1;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #5dade2;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
