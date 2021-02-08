<template>
  <div class="yellowBackground">
    <v-container>
      <v-row>
        <v-col cols="12" sm="10" offset-sm="1" md="3">
          <h2 class="mb-3">Create Game</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" offset-sm="1" md="3">
          <v-form @submit.prevent="createGame">
            <v-text-field
              background-color="secondary_light"
              light
              v-model="name"
              label="Game name"
              outlined
            ></v-text-field>

            <v-divider />

            <v-switch
              id="customCellNamesSwitch"
              v-model="customCellNames"
              label="Customize Cell Names"
              :disabled="customCellNamesDisabled"
            ></v-switch>

            <div v-show="customCellNames">
              <v-text-field
                id="customCellsInput"
                v-model="game[selectedCell.y][selectedCell.x].val"
                label="Cell Name"
                outlined
                @keyup.enter="iterateTableCell"
                background-color="secondary_light"
              >
              </v-text-field>
            </div>
          </v-form>
        </v-col>

        <v-col cols="8" sm="8" md="5" offset-sm="1">
          <v-slider
            v-model="numCols"
            min="2"
            max="10"
            thumb-label="always"
            @end="formatGame"
            label="Columns"
          ></v-slider>
          <BingoTableBuilder
            :game="game"
            :customCellNames="customCellNames"
            :selectedCell="selectedCell"
            @clickedTableCell="clickedTableCell"
          />
        </v-col>
        <v-col cols="1">
          <v-slider
            class="mt-15"
            v-model="numRows"
            min="2"
            max="10"
            thumb-label="always"
            @end="formatGame"
            vertical
            label="Rows"
          ></v-slider>
        </v-col>
      </v-row>
      <v-row class="mt-12" justify="end">
        <v-btn class="mb-6 mr-6" large @click="createGame" color="success"
          >Create Game</v-btn
        >
        <v-col cols="0" md="2"></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import agent from "@/agent.js";
import BingoTableBuilder from "../components/BingoTableBuilder.vue";

export default {
  name: "Create",
  components: { BingoTableBuilder },
  data: function () {
    return {
      name: "New Game",
      customCellNames: false,
      game: [],
      numRows: 4,
      numCols: 4,
      useDefaults: false,
      selectedCell: { x: 0, y: 0 },
    };
  },
  computed: {
    numCells() {
      return this.numRows * this.numCols;
    },
    customCellNamesDisabled() {
      return this.numCols >= 5;
    },
  },
  methods: {
    async createGame() {
      if (this.name.length > 0 && this.name.length < 20) {
        await agent
          .createGame(this.name, this.game, this.$cookies.get("userId"))
          .then((res) => {
            if (res.success == true) {
              this.$router.push({
                name: "GameMaster",
                params: { id: res.game.id },
              });
            } else {
              console.log("Failed to create game");
            }
          });
      }
    },
    clickedTableCell(selectedCell) {
      this.selectedCell = selectedCell;
      let element = document.getElementById("customCellsInput");
      if (element) {
        element.focus();
      }
    },
    iterateTableCell() {
      let nextCell = this.selectedCell;
      if (nextCell.x >= this.numCols - 1) {
        nextCell.x = 0;
        if (nextCell.y >= this.numRows - 1) {
          nextCell.y = 0;
        } else {
          nextCell.y++;
        }
      } else {
        nextCell.x++;
      }
      this.selectedCell = nextCell;
    },
    formatGame() {
      let formattedGame = [];
      let num = 1;

      for (let i = 0; i < this.numRows; i++) {
        let row = [];
        for (let j = 0; j < this.numCols; j++) {
          row.push({ val: num });
          num++;
        }
        formattedGame.push(row);
      }
      this.game = formattedGame;
    },
  },
  created() {
    this.formatGame();
  },
};
</script>

<style scoped>
</style>
