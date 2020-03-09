<template>
  <div class="app">
    <nav class="navbar navbar-dark bg-marine">
      <a class="navbar-brand" href="#">Fish Game</a>
      <Timer v-if="play" v-on:time-left="updateTime" />
    </nav>
    <Menu v-if="!play && !endGame " v-on:play="startGame" />
    <div v-if="play" class="game">
      <div v-bind:key="i" v-for="(fish, i) in fishes">
        <Fish v-on:fish-clicked="fishClicked" :color="fish.color" :width="fish.width" v-bind:i="i" />
      </div>
    </div>
    <Records v-if="endGame && bestScores.length >= 0" :bestScores="bestScores">
      <h2 class="display-4">
        Your score:
        <strong>{{ this.player.score }}</strong>
      </h2>
    </Records>
  </div>
</template>

<script>
import Timer from "./components/Timer";
import Fish from "./components/Fish";
import Menu from "./components/Menu";
import Records from "./components/Records";

export default {
  name: "App",
  components: {
    Timer,
    Menu,
    Fish,
    Records
  },
  data() {
    return {
      play: false,
      timeLeft: 6,
      fishes: [
        {
          color: "red",
          width: 50
        }
      ],
      player: {
        name: "",
        score: 0
      },
      fishColors: ["red", "orange", "#ccc", "#35495e", "#42b883"],
      endGame: false,
      bestScores: []
    };
  },

  methods: {
    startGame(name) {
      this.play = true;
      this.player.name = name;
    },
    fishClicked(score) {
      this.player.score += score;
      console.log(this.player.score);
    },
    updateTime(time) {
      this.timeLeft = time;
    },
    randomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
  },
  watch: {
    timeLeft: function() {
      const randomColor = this.randomInt(this.fishColors.length);

      let newFish = {
        color: this.fishColors[randomColor],
        width: this.randomInt(100)
      };
      if (newFish.width < 50) newFish.width = 50;
      this.fishes = [...this.fishes, newFish];

      if (this.timeLeft === 0) {
        this.player.score = Math.round(this.player.score);
        this.endGame = true;
        this.play = false;
      }
    },
    endGame: function() {
      if (localStorage.getItem("bestScores")) {
        this.bestScores = JSON.parse(localStorage.getItem("bestScores"));

        const replacedIndex = this.bestScores.findIndex(
          player => player.score <= this.player.score
        );
        // Ranking in the top 10
        if (replacedIndex >= 0) {
          this.bestScores.slice(replacedIndex, 0, this.player);
          if (this.bestScores.length < 10) this.bestScores.pop();
        }
      } else {
        // Local Storage Empty
        this.bestScores.push(this.player);
        console.log(this.player);
      }
      localStorage.setItem("bestScores", JSON.stringify(this.bestScores));
      console.log(this.bestScores);
    }
  }
};
</script>
<style>
@import "./assets/css/bootstrap.min.css";
body,
.app {
  height: 100vh;
  overflow: hidden;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.bg-marine {
  background-color: #35495e;
}

.game {
  width: 100%;
  height: 100vh;
  background-color: dodgerblue;
}
.v-enter,
.v-enter-active {
  display: "block";
  animation: fish-animation 10s;
}
.v-leave,
.v-leave-active {
  opacity: 0;
}

.fish {
  position: relative;
  cursor: pointer;
  animation: fish-animation 5s;
  transform: scale(0);
}

@keyframes fish-animation {
  0% {
    left: 0%;
    transform: scale(0.1);
  }
  5% {
    transform: scale(1);
    opacity: 1;
  }

  95% {
    transform: scale(1);
  }

  100% {
    left: 100%;
    transform: scale(0.1);
  }
}
</style>
