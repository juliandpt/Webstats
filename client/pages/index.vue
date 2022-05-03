<template>
  <v-container
    :style="$vuetify.breakpoint.xl ? 'padding: 0 15%' : ''"
  >
    <v-row>
      <v-col
        cols="12"
        md="6"
        sm="12"
        :class="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 'd-flex flex-column justify-center align-center' : 'd-flex flex-column justify-center'"
      >
        <h1
          :class="$vuetify.breakpoint.xs ? 'text-h3 font-weight-medium' : 'text-h2 font-weight-medium'"
        >
          Webstats. La herramienta de análisis de dominios
        </h1>

        <div
          :class="$vuetify.breakpoint.xs ? 'text-center mt-8' : 'mt-8'"
        >
          <p>
            Descubra la herramienta de dominios más sofisticada y fácil de usar del mundo
          </p>
        </div>

        <div
          :class="$vuetify.breakpoint.xs ? 'mb-5 mt-5' : 'mt-5'"
        >
          <v-btn
            dark
            x-large
            elevation="0"
            color="primary"
            class="px-12"
            to="/search"
          >
            Analizar dominio

            <img
              src="/icons/arrow-right.svg"
              height="22"
              width="22"
              class="mr-n1 ml-2"
            >
          </v-btn>
        </div>
      </v-col>

      <v-col
        cols="12"
        md="6"
        sm="12"
        class="d-flex flex-column justify-center"
        :order="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? '1' : '2'"
      >
        <v-img
          src=""
          height="auto"
          max-height="400"
          contain
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.container,
.row {
  height: 100%;
}
</style>

<script>
export default {
  head() {
    return {
      title: "Inicio",
    };
  },
  data: () => ({
    
  }),
  methods: {
    
  }
};
</script>