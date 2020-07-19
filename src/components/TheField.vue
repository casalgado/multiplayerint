<template>
  <canvas id="field"></canvas>
</template>

<script>
export default {
  name: "TheField",
  data() {
    return {
      vueCanvas: null,
      canvasHeight: 0,
      canvasWidth: 0,
    };
  },
  computed: {
    players: function() {
      return this.$store.state.players;
    },
  },
  watch: {
    players() {
      this.vueCanvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      Object.keys(this.players).forEach((e) => {
        console.log(this.players[e]);
        this.vueCanvas.beginPath();
        this.vueCanvas.arc(
          this.players[e].x,
          this.players[e].y,
          20,
          0,
          2 * Math.PI
        );
        this.vueCanvas.stroke();
      });
    },
  },
  mounted() {
    console.log(this.players);
    var canvas = document.getElementById("field");
    var ctx = canvas.getContext("2d");
    this.vueCanvas = ctx;
    canvas.width = 800;
    canvas.height = 500;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
  },
};
</script>

<style scoped>
canvas {
  border: 1px solid black;
}
</style>
