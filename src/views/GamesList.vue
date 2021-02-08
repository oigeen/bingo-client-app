<template>
  <div class="yellowBackground">
    <v-container>
      <h2>Games List</h2>

      <h3>My Games</h3>
      <v-divider />

      <div v-if="myGames.length > 0">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="game in myGames"
            :key="game.id"
          >
            <v-card class="mt-6" color="secondary_light">
              <v-card-title>{{ game.name }}</v-card-title>
              <v-card-text>
                <p>
                  Size: {{ game.cells[0].length }} x {{ game.cells.length }}
                </p>
                <p>Players: {{ game.cards.length }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="joinMyGameClicked(game)" color="success"
                  >Manage Game</v-btn
                >
                <v-btn @click="deleteGame(game.id)" color="error">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <v-col v-else cols="12" sm="6" md="4" lg="3">
        <v-card color="secondary_light">
          <v-card-text
            >You have no active games. Create a game to see it
            here.</v-card-text
          >
        </v-card></v-col
      >

      <h3>Join game</h3>
      <v-divider />

      <div v-if="games.length > 0">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="game in games"
            :key="game.id"
          >
            <v-card class="mt-6" color="secondary_light">
              <v-card-title>{{ game.name }}</v-card-title>
              <v-card-text>
                <p>
                  Size: {{ game.cells[0].length }} x {{ game.cells.length }}
                </p>
                <p>Players: {{ game.cards.length }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="joinGameClicked(game)" color="success"
                  >Join</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <v-col v-else cols="12" sm="6" md="4" lg="3">
        <v-card color="secondary_light">
          <v-card-text>No games being played currently. </v-card-text>
        </v-card></v-col
      >
    </v-container>
  </div>
</template>

<script>
import agent from "@/agent.js";

export default {
  name: "GamesList",
  data: function () {
    return {
      games: [],
    };
  },
  computed: {
    myGames: function () {
      return this.games.filter(
        (game) => game.creatorId === this.$cookies.get("userId")
      );
    },
  },
  methods: {
    deleteGame: function (gameId) {
      agent.deleteGame(gameId).then((res) => {
        this.games = res.result;
      });
    },
    joinGameClicked: function (game) {
      var userId = this.$cookies.get("userId");

      var usersCard = game.cards.find((c) => {
        return c.playerId === userId;
      });

      if (!usersCard) {
        agent.createCard(userId, game.id).then(() => {
          this.$router.push({
            name: "Play",
            params: { id: game.id, playerId: userId },
          });
        });
      } else {
        this.$router.push({
          name: "Play",
          params: { id: game.id, playerId: userId },
        });
      }
    },
    joinMyGameClicked: function (game) {
      this.$router.push({
        name: "GameMaster",
        params: { id: game.id },
      });
    },
  },

  created() {
    agent.getAllGames().then((res) => {
      this.games = res;
      console.log(res);
    });
  },
};
</script>

<style scoped>
li {
  font-size: 1.2em;
  margin: 9px 0;
}
</style>
