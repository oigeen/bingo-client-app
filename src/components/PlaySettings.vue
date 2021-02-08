<template>
  <v-card color="secondary_light" class="mx-auto pa-6">
    <v-title><h3>Settings</h3></v-title>
    <v-divider />
    <v-card-actions>
      <v-switch
        :label="`Autostamp ${autostampSettings.on ? 'On' : 'Off'}`"
        v-model="autostampSettings.on"
        @change="updateAutostampSettings"
      ></v-switch>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "PlaySettings",
  data() {
    return {
      autostampSettings: { on: false },
    };
  },
  methods: {
    updateAutostampSettings: function () {
      this.$emit("updateAutostampSettings", this.autostampSettings);
    },
  },
};
</script>

<style scoped>
</style>