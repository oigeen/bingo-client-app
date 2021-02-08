<template>
  <div class="yellowBackground">
    <v-container>
      <h2>GameMaster: {{ game.name }}</h2>

      <v-row>
        <v-col cols="12" sm="6" md="6" lg="5" offset-lg="1">
          <v-card color="secondary_light" class="mx-auto pa-6">
            <h3>All Cells: Click cell to call</h3>
            <v-divider />
            <BingoTable
              class="cursor-pointer mt-6"
              :master="true"
              :cells="game.cells"
              :completed="[]"
              :newlyCompleted="[]"
              @cellClicked="cellClicked"
            />
          </v-card>

          <v-row>
            <v-col cols="12">
              <MasterSettings
                class="mt-6"
                @updateAutocallSettings="updateAutocallSettings"
                :autocallSettings.sync="autocallSettings"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" sm="6" md="6" lg="5">
          <v-card color="secondary_light" class="mx-auto pa-6">
            <h3>Players</h3>
            <v-divider />
            <div v-if="game.cards.length > 0">
              <v-row>
                <v-col
                  cols="6"
                  sm="6"
                  md="4"
                  v-for="card in game.cards"
                  :key="card.id"
                >
                  <p>Player: {{ card.playerId }}</p>
                  <BingoTable
                    class="mini-table"
                    :cells="card.cells"
                    :master="false"
                  />
                </v-col>
              </v-row>
            </div>

            <v-card-text v-else>
              <p>No players yet...</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="3"> </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import BingoTable from "../components/BingoTable";
import MasterSettings from "../components/MasterSettings";

import agent from "@/agent.js";
import sockets from "@/sockets.js";

export default {
  name: "GameMaster",
  components: { BingoTable, MasterSettings },
  data: () => ({
    game: { cards: [], cells: [] },
    connection: null,
    autocallSettings: { on: false, repeatFrequency: "10000" },
    autocallInstance: null,
    checkForGameUpdates: null,
  }),
  computed: {
    formattedBingoCells: function () {
      let formattedArray = [];
      let cells = this.game.cells;
      let rowLength = Math.sqrt(cells.length);

      for (let i = 0; i < cells.length; i += rowLength) {
        formattedArray.push(cells.slice(i, i + rowLength));
      }
      return formattedArray;
    },
    uncalledCells: function () {
      return this.game.cells.flat().filter((cell) => !cell.called);
    },
  },

  methods: {
    autocall: function () {
      let repeatFrequency = this.autocallSettings.repeatFrequency;
      this.autocallInstance = window.setInterval(() => {
        if (!this.autocallSettings.on || this.uncalledCells.length <= 0) {
          window.clearInterval(this.autocallInstance);
        } else {
          let cell = this.uncalledCells[
            Math.floor(Math.random() * this.uncalledCells.length)
          ];
          this.callCell(cell);
        }
      }, repeatFrequency);
    },
    callCell: function (cell) {
      if (cell.called) {
        return;
      }
      var gameId = this.$route.params.id;
      if (this.connection) {
        this.connection.send(
          JSON.stringify({
            function: "call",
            gameId: gameId,
            cellValue: cell.val,
          })
        );
      }
    },
    cellClicked: function (cell) {
      this.autocallSettings.on = false;
      this.callCell(cell);
    },
    updateAutocallSettings(settings) {
      this.autocallSettings = settings;
      if (settings.on) {
        window.clearInterval(this.autocallInstance);
        this.autocall();
      }
    },
  },
  created() {
    agent
      .getGameById(this.$route.params.id)
      .then((res) => (this.game = res))
      .then(
        sockets.connect().then((socket) => {
          socket.send(
            JSON.stringify({
              function: "registerMaster",
              gameId: this.$route.params.id,
            })
          );
          socket.onmessage = ({ data }) => {
            this.game = JSON.parse(data);
          };
          this.connection = socket;
        })
      );
  },
  beforeDestroy() {
    if (this.checkForGameUpdates) {
      window.clearInterval(this.checkForGameUpdates);
    }
    if (this.connection) {
      this.connection.close();
    }
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>