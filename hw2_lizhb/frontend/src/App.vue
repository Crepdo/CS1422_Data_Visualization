<template>
  <div>
    <NavBar />
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "app",
  components: {
  }
};
</script>

<style>
html {
  position: relative;
  min-height: 100%;
}

body {
  margin-bottom: 160px !important; /* Height of the footer */
  padding: 0;
}


/* Override Bootstrap Styling */

.btn-primary {
  background-color: #025fce !important;
}

</style>
