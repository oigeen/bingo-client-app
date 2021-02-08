<template>
  <div>
    <v-card color="secondary_light" class="mx-auto pa-6">
      <h3>Settings</h3>

      <v-divider />
      <v-card-text>
        <v-switch
          v-model="autocallSettings.on"
          @change="updateAutocallSettings"
          :label="`Autocall ${autocallSettings.on ? 'On' : 'Off'}`"
        />
        <v-radio-group
          label="Autocall Speed"
          v-model="autocallSettings.repeatFrequency"
          @change="updateAutocallSettings"
        >
          <v-radio label="slow" color="primary" value="10000" key="slow">
          </v-radio>
          <v-radio label="medium" color="primary" value="7500" key="medium">
          </v-radio>
          <v-radio label="fast" color="primary" value="5000" key="fast">
          </v-radio>
          <v-radio
            label="lightning"
            color="primary"
            value="1000"
            key="lightning"
          >
          </v-radio>
          <v-radio
            label="virtually instant"
            color="primary"
            value="1"
            key="virtually instant"
          >
          </v-radio>
        </v-radio-group>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "MasterSettings",
  props: { autocallSettings: Object },
  data() {
    return {
      autocallSpeed: "slow",
      autocall: false,
    };
  },
  methods: {
    updateAutocallSettings() {
      this.$emit("updateAutocallSettings", this.autocallSettings);
    },
  },
};
</script>

<style scoped>
.inline {
  display: inline;
}
</style>