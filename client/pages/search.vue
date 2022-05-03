<template>
  <v-container
    :style="$vuetify.breakpoint.xl ? 'padding: 0 15%' : ''"
  >
    <v-row
      align="center"
      justify="center"
      class="input"
    >
      <v-text-field
        filled
        solo
        clearable
        label="Buscar"
        placeholder="Buscar"
      >
        <template 
          v-slot:prepend-inner
        >
          <v-img
            src="/icons/search-grey.svg"
            height="20"
            width="20"
            class="ml-2"
          ></v-img>

          <v-divider 
            vertical
            class="mx-4"
          ></v-divider>
        </template>
      </v-text-field>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.input {
  min-height: 15rem;
  padding: 0 20%;
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