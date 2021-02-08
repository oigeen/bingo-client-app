<template>
  <div class="yellowBackground">
    <v-container>
      <h2>Play: {{ card.gameName }}</h2>
      <v-row>
        <v-col
          offset-lg="1"
          offset-xl="2"
          cols="12"
          sm="8"
          md="6"
          lg="5"
          xl="4"
        >
          <v-card color="secondary_light" class="mx-auto pa-6">
            <h3>Card</h3>
            <v-divider />
            <v-card-text class="px-12 pa-sm-0">
              <BingoTable
                class="mt-6"
                :cells="card.cells"
                @cellClicked="stampCell"
              />
            </v-card-text>

            <BingoVictory v-show="isBingo" />
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" md="6" lg="5" xl="4">
          <CalledCells
            :cells="calledCells"
            :cellsRemainingCount="cellsRemainingCount"
            :allCellsCalled="allCellsCalled"
          />
          <PlaySettings
            class="mt-6"
            @updateAutostampSettings="updateAutostampSettings"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import BingoTable from "../components/BingoTable";
import BingoVictory from "@/components/BingoVictory";
import CalledCells from "@/components/CalledCells";
import PlaySettings from "@/components/PlaySettings";

import agent from "@/agent.js";
import sockets from "@/sockets.js";

export default {
  name: "Game",
  components: { BingoTable, BingoVictory, CalledCells, PlaySettings },
  data: function () {
    return {
      card: { cells: [] },
      connection: null,
      autostampSettings: { on: false },
    };
  },

  methods: {
    autoStamp(cell) {
      if (this.autostampSettings.on) {
        if (!cell.stamped) {
          this.stampCell(cell);
        }
      }
    },
    stampCell: function (cell) {
      if (cell.called != true) {
        alert("Can't stamp an uncalled cell");
        return;
      }
      if (cell.stamped) {
        alert("Cell is already Stamped");
        return;
      }
      var gameId = this.$route.params.id;
      if (this.connection) {
        this.connection.send(
          JSON.stringify({
            function: "stamp",
            gameId: gameId,
            cardId: this.card.id,
            cellVal: cell.val,
          })
        );
      }
    },
    stampCalledCells: function () {
      this.card.cells.flat().forEach((cell) => {
        if (cell.called && !cell.stamped) {
          this.stampCell(cell);
        }
      });
    },
    updateAutostampSettings: function (settings) {
      if (settings.on) {
        this.stampCalledCells();
      }
      this.autostampSettings = settings;
    },
  },

  computed: {
    allCellsCalled: function () {
      if (!this.card.allCells) {
        return;
      }
      return this.card.allCells.flat().every((cell) => cell.called);
    },
    calledCells: function () {
      if (!this.card.allCells) {
        return [];
      }
      return this.card.allCells
        .flat()
        .filter((cell) => cell.called == true)
        .sort((cellA, cellB) => cellA.calledTime - cellB.calledTime)
        .reverse();
    },
    cellsRemainingCount: function () {
      if (!this.card.allCells) {
        return 16;
      }
      return this.card.allCells.flat().filter((cell) => !cell.called).length;
    },

    isBingo: function () {
      return false;
    },
  },

  watch: {
    card: function () {
      if (this.autostampSettings.on) {
        this.stampCalledCells();
      }
    },
  },

  beforeCreate() {
    var id = this.$route.params.id;
    var playerId = this.$cookies.get("userId");

    agent.getCardById(id, playerId).then((res) => {
      if (!res) {
        return;
      }
      this.card = res;
      if (!this.connection) {
        sockets.connect().then((socket) => {
          socket.send(
            JSON.stringify({
              function: "registerCard",
              gameId: id,
              cardId: this.card.id,
            })
          );
          socket.onmessage = ({ data }) => {
            this.card = JSON.parse(data);
          };
          this.connection = socket;
        });
      }
    });
  },

  beforeDestroy() {
    if (this.connection) {
      this.connection.close();
    }
  },
};
</script>

<style scoped>
</style>
