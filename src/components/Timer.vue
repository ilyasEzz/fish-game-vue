<template>
  <span id="timer">{{ timeLeft | convert-seconds }}</span>
</template>

<script>
export default {
  name: "Timer",
  data() {
    return {
      timeLeft: 6,
      interval: null
    };
  },
  methods: {
    countDown() {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.$emit("time-left", this.timeLeft);
        } else {
          this.$emit("time-ended");
          window.clearInterval(this.interval);
        }
      }, 1000);
    }
  },
  mounted() {
    this.countDown();
  }
};
</script>
<style>
#timer {
  display: inline-block;
  color: white;
  text-decoration: none;
  padding: 0.5em 2em;
  outline: none;
  border-width: 2px 0;
  border-style: solid none;
  border-color: #fdbe33 #000 #d77206;
  border-radius: 6px;
  background: linear-gradient(#f3ae0f, #e38916) #e38916;
}
</style>