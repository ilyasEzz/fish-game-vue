<template>
  <div class="container mt-4">
    <slot></slot>
    <table class="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(player, i) in bestScores">
          <th scope="row">{{++i}}</th>
          <td>{{player.name}}</td>
          <td>{{player.score}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Records",
  props: {
    bestScores: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>
</style>