<template>
  <div>
    <p>Dashboard</p>
    <button @click="addPlayer">add player</button>
    <P>{{ movement }}</P>
    <TheField />
  </div>
</template>
<script>
import TheField from "./TheField";
import io from "socket.io-client";
var socket = io();
export default {
  name: "TheDashboard",
  components: {
    TheField,
  },
  data() {
    return {
      datacollection: null,
      movement: {
        up: false,
        down: false,
        left: false,
        right: false,
      },
    };
  },
  methods: {
    addPlayer: function() {
      socket.emit("new player");
    },
    updateState: function() {
      socket.on("state", (state) => {
        this.$store.dispatch("updateState", state);
      });
    },
  },
  created() {
    this.updateState();
  },
  mounted() {
    document.addEventListener(
      "keydown",
      function(event) {
        event.preventDefault();
        switch (event.keyCode) {
          case 37:
            this.movement.left = true;
            break;
          case 38:
            this.movement.up = true;
            break;
          case 39:
            this.movement.right = true;
            break;
          case 40:
            this.movement.down = true;
            break;
        }
      }.bind(this)
    );

    document.addEventListener(
      "keyup",
      function(event) {
        switch (event.keyCode) {
          case 37:
            this.movement.left = false;
            break;
          case 38:
            this.movement.up = false;
            break;
          case 39:
            this.movement.right = false;
            break;
          case 40:
            this.movement.down = false;
            break;
        }
      }.bind(this)
    );
    setInterval(
      function() {
        socket.emit("movement", Object.assign({}, this.movement));
      }.bind(this),
      1000 / 60
    );
  },
};
</script>

<style></style>
