<template>
  <div>
    <table id="table">
      <tr v-for="(row, y) in game" :key="y">
        <td
          v-for="(cell, x) in row"
          :class="{
            selectedCell: isSelected(x, y),
            clickable: customCellNames,
          }"
          :key="x"
          @click="clickedTableCell(x, y)"
        >
          <span>{{ cell.val }}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: { game: Array, customCellNames: Boolean, selectedCell: Object },
  methods: {
    clickedTableCell: function (x, y) {
      this.$emit("clickedTableCell", { x: x, y: y });
    },
    isSelected(x, y) {
      if (this.customCellNames) {
        return this.selectedCell.x == x && this.selectedCell.y == y;
      }
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  text-align: center;
  width: 100%;
  table-layout: fixed;
  margin: auto;
}

table td {
  padding: 12px;
  border: 2px solid var(--secondary-color);
  background-color: var(--primary-color);
  color: white;
  box-sizing: border-box;
  vertical-align: middle;
  align-content: center;
}

.clickable:hover {
  cursor: pointer;
}

.selectedCell {
  background-color: var(--secondary-color);
  color: var(--primary-color);
}
</style>