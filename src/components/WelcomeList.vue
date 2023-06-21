<template>
  <div class="hello">
    <img :src="require('../assets/logo.png')" />
    <h1>{{ msg }}</h1>
    <a>
      <router-link to="/tasks">Go to tasks</router-link>
    </a>
  </div>
</template>

<script>
export default {
  name: "Welcomelist",
  data() {
    return {
      msg: "Hello and Welcome to Your Vue Todo List",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  padding-top: 60px;
}
h1,
h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>
