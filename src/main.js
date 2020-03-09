import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.filter('convert-seconds', function(value) {
  let min = Math.floor(value / 60);
  let seconds = value % 60;

  return seconds < 10 ? `${min}min 0${seconds}s` : `${min}min ${seconds}s`;
});

new Vue({
  render: h => h(App)
}).$mount('#app');
