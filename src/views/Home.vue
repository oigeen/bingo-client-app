<template>
  <v-container fill-height fluid class="secondary">
    <v-row>
      <v-col align="center" cols="12">
        <BingoTitle class="mb-12" />
        <h2 id="tagline">Play Bingo with friends</h2>
        <div class="mt-13">
          <router-link to="/Create">
            <v-btn class="mr-3" color="primary">Create game</v-btn>
          </router-link>

          <router-link to="/GamesList">
            <v-btn color="primary">Find Game</v-btn>
          </router-link>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BingoTitle from "@/components/BingoTitle";

export default {
  name: "Home",
  components: { BingoTitle },
};
</script>

<style scoped>
h2 {
  font-style: italic;
  /* font-family: "Arvo"; */
}
#tagline {
  color: var(--primary-color);
}
</style>
