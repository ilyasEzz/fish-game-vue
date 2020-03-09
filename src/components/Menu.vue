<template>
  <div class="menu">
    <form @submit.prevent="$emit('play', name)" class="m-4">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" name="name" class="form-control" v-model="name" required />
      </div>
      <div class="form-group center">
        <input type="submit" value="play" class="btn btn-secondary" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      name: ""
    };
  }
};
</script>

<style>
.menu {
  width: 300px;
  color: white;
  background-color: #42b883;
  border-radius: 15px;
}
.menu .btn-secondary {
  background-color: #35495e;
  transition: background-color 1s ease-in-out;
}
</style>