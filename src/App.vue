<template>
  <div>
    <v-app :style="cssProps">
      <v-app-bar class="bottom-border" app color="secondary">
        <router-link to="/">
          <v-toolbar-title id="brand">BINGOALS</v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              <v-icon>mdi-information-outline</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2">
              Hi there! :)
            </v-card-title>

            <v-card-text class="pa-3">
              Thank you for checking out Bingoals. This simple project was built
              as portfolio project by me, Eugene Price.<br />

              <br />

              For more information about me and my contact details please head
              to
              <a href="http://eugeneprice.com">my personal website!</a>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-app-bar>

      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    cssProps() {
      return {
        "--primary-color": this.$vuetify.theme.themes.light.primary,
        "--secondary-color": this.$vuetify.theme.themes.light.secondary,
        "--success-color": this.$vuetify.theme.themes.light.success,
      };
    },
  },
  created: function () {
    let random = Math.floor(Math.random() * 1000000);
    let userId = this.$cookies.get("userId");
    if (!userId) {
      this.$cookies.set("userId", random, 60 * 60 * 12);
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Londrina+Solid:wght@300&family=Arvo:ital@1&family=Luckiest+Guy&family=Modak&family=Spartan&display=swap&family=Yusei+Magic&display=swap");
* {
  font-family: "Roboto";
}

a {
  text-decoration: none;
}

#brand {
  font-family: "Luckiest Guy", cursive;
  font-size: 32px;
  color: var(--primary-color);
}
h1 {
  font-family: "Luckiest Guy", cursive;
  font-size: 28px;
  color: var(--primary-color);
}

h2 {
  font-family: "Yusei Magic";
  color: var(--primary-color);
  margin-top: 20px;
}

h3 {
  font-family: "Yusei Magic";
  color: var(--primary-color);
  margin-top: 10px;
}
.yellowBackground {
  height: 100%;
  background-color: var(--secondary-color);
}
</style>
