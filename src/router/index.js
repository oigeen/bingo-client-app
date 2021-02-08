import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Play from "../views/Play.vue";
import Create from "../views/Create.vue";
import GamesList from "../views/GamesList.vue";
import GameMaster from "../views/GameMaster.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/Create",
    name: "Create",
    component: Create
  },
  {
    path: "/:id/Play/:playerId",
    name: "Play",
    component: Play
  },
  {
    path: "/GamesList",
    name: "GamesList",
    component: GamesList
  },
  {
    path: "/:id/GameMaster",
    name: "GameMaster",
    component: GameMaster
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
