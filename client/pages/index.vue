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
          :class="$vuetify.breakpoint.xs ? 'text-h3 font-weight-medium' : 'text-h1 font-weight-medium'"
        >
          Wow
        </h1>

        <h2
          :class="$vuetify.breakpoint.xs ? 'text-h4 font-body-2' : 'text-h2 font-body-2'"
        >
          Very error, Much 404
        </h2>

        <div
          :class="$vuetify.breakpoint.xs ? 'text-center mt-16' : 'mt-16'"
        >
          <p>
            The page you are looking for dosen't exists.
            
            <br>
            
            it seems you have taken a wrong turn.
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
            Buscar sede
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