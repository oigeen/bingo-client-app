<template>
  <v-card color="secondary_light" class="mx-auto pa-6">
    <v-card-title><h3>Calling</h3></v-card-title>
    <v-divider />

    <v-card-text style="text-align: center">
      <p v-if="bingoCalls[cellsFirst]">
        {{ bingoCalls[cellsFirst] + "..." }}
      </p>

      <div id="spinnyNumberContainer" v-if="cells.length > 0">
        <div id="bigSpinnyNumber" class="grow py-8 px-3">
          <p v-if="cellsFirst.toString().length <= 3" class="largeFont spin">
            {{ cellsFirst }}
          </p>
          <p v-else class="smallFont spin">{{ cellsFirst }}</p>
        </div>
        <v-divider />

        <div class="my-3">
          <span v-for="(cell, i) in cellsWithoutFirstElement" :key="cell.id">
            {{ cell.val }}
            <span v-if="i != cellsWithoutFirstElement.length - 1 && i >= 0"
              >,</span
            >
          </span>
        </div>
      </div>
      <v-divider v-show="cellsWithoutFirstElement" />

      <div class="mt-2">
        <p v-show="!allCellsCalled">
          There
          <span v-if="cellsRemainingCount > 1">are </span>
          <span v-else>is </span>
          {{ cellsRemainingCount }} ball<span v-if="cellsRemainingCount > 1"
            >s
          </span>
          <span> left to be called</span>
        </p>
        <p v-show="allCellsCalled">All cells have been called</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import bingoCalls from "../bingoCalls.js";

export default {
  name: "CalledCells",
  props: { cells: Array, allCellsCalled: Boolean, cellsRemainingCount: Number },
  data() {
    return {
      bingoCalls: bingoCalls,
    };
  },
  computed: {
    cellsFirst: function () {
      if (this.cells.length < 1) {
        return { val: 123, id: 123456789 };
      }
      return this.cells[0].val;
    },
    cellsWithoutFirstElement: function () {
      let cells = this.cells;
      if (cells.length > 0) {
        cells.splice(0, 1);
        return cells;
      }
      return { val: 123, id: 123456789 };
    },
  },
  watch: {
    cellsFirst: function () {
      let element = document.getElementById("bigSpinnyNumber");
      if (element) {
        let newOne = element.cloneNode(true);
        newOne.firstChild.textContent = this.cellsFirst;
        element.parentNode.replaceChild(newOne, element);
      }
    },
  },
};
</script>

<style scoped>
#bigSpinnyNumber {
  color: #d33f49;
}
#spinnyNumberContainer {
  min-height: 110px;
}
#previouslyCalledContainer {
  min-height: 110px;
}
.smallFont {
  font-size: 36px;
  margin: auto;
  padding: auto;
}
.largeFont {
  font-size: 72px;
  margin: 0;
}
.spin {
  animation: spin 3s 1 ease-in-out;
}
.grow {
  animation: grow 3s 1 ease-in;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1800deg);
  }
}

@keyframes grow {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>