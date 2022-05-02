<template>
  <v-container
    :style="$vuetify.breakpoint.xl ? 'padding: 0 15%' : ''"
  >
    <v-row>
      <v-text-field
        solo
        label="Search"
        width="5"
        clearable
        prepend-inner-icon="mdi-map-marker"
      >
      
      </v-text-field>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.container {
  min-height: 100%;
}
</style>

<script>
export default {
  head() {
    return {
      title: "Búsqueda",
    };
  },
  data: () => ({
    
  }),
  methods: {
    
  }
};
</script>