<template>
  <div>
    <table class="centered">
      <tr v-for="(row, i) in cells" :key="i">
        <td
          v-for="cell in row"
          :key="cell.id"
          :id="cell.id"
          @click="clickedCell(cell)"
          :class="{
            lineCompleted: checkLines(cell) && !master,
            called: cell.called && master,
          }"
        >
          <div
            class="content"
            :class="{
              stamped: cell.stamped && !master && !cell.horizontalComplete,
            }"
          >
            {{ cell.val }}
          </div>
        </td>
      </tr>
    </table>
    <div v-show="cardCompleted && !master" class="winAnimationContainer mt-3">
      <h1>BINGO</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "BingoTable",
  props: {
    master: Boolean,
    cells: Array,
  },
  data: () => ({
    alreadyCompleted: [],
  }),
  methods: {
    clickedCell: function (cell) {
      this.$emit("cellClicked", cell);
    },
    checkLines(cell) {
      //Get row that cell lives in
      let row = this.cells.find((r) => {
        return r.includes(cell);
      });

      //Get column that cell lives in
      let index = row.indexOf(cell);
      let col = [];
      this.cells.forEach((row) => {
        col.push(row.find((cell) => row.indexOf(cell) === index));
      });

      if (
        row.every((cell) => cell.stamped) ||
        col.every((cell) => cell.stamped)
      ) {
        return true;
      }
    },
  },
  computed: {
    cardCompleted: function () {
      return this.cells.flat().every((cell) => cell.stamped);
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  text-align: center;
  margin: auto;
  table-layout: fixed;
  width: 90%;

  background-color: #feeaae;
}

td {
  border: 2px solid black;
  width: 33.33%;
  position: relative;
  font-size: 16px;
}
td:after {
  content: "";
  display: block;
  margin-top: 100%;
}
td .content {
  position: absolute;
  top: 5%;
  bottom: 0;
  left: 5%;
  right: 0;
  width: 90%;
  height: 90%;
  padding-top: 20%;
}

.called {
  background-color: var(--primary-color);
  color: white;
}

.stamped {
  border: 4px solid var(--primary-color);
  border-radius: 50%;
}

.lineCompleted {
  background-color: var(--success-color);
  color: white;

  animation: blinkingAnimation 1s 5;
}
.winAnimationContainer {
  text-align: center;
}
.winAnimation {
  font-size: 2em;
}

@keyframes flashingColorAnimation {
  0% {
    font-size: 72px;
  }
  50% {
    font-size: 64px;
  }
  100% {
    font-size: 72px;
  }
}

@keyframes blinkingAnimation {
  0% {
    background-color: white;
  }
  50% {
    background-color: var(--success-color);
  }
  100% {
    background-color: white;
  }
}
</style>