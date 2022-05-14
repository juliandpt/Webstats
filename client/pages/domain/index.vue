<template>
  <v-container
    :style="$vuetify.breakpoint.xl ? 'padding: 0 15%; height: 100%;' : 'height: 100%;'"
  >
    <v-row>
      <v-col
        class="d-flex align-center"
      >
        <v-btn
          icon
          color="secondary"
          class="mr-4"
          to="/search"
        >
          <img 
            src="/icons/arrow.svg"
            height="25"
            width="25"
          />
        </v-btn>

        Volver a buscar
      </v-col>
    </v-row>

    <v-row>
      <v-col
        class="d-flex align-center"
      >
        <img
          :src="domData.logo"
          height="75"
          width="75"
        />

        <div>
          <!-- {{ getName(domData.host) }}

          {{ getDomain(domData.host) }} -->
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      title: "Dominio",
    };
  },
  data() {
    return {
      domData: {},
      caca: []
    }
  },
  mounted() {
    this.$axios.post(`/domain/search`, { domain: this.$route.query.q })
      .then((response) => {
        console.log(response.data)
        this.domData = response.data
      })
      .catch((error) => {
        console.error(error)
      })
  },
  methods: {
    getDomain: function (url) {
      let domain = (new URL(url));

      return domain.hostname
    },
    getName: function (url) {
      console.log(this.domData)
      console.log(url)
      let domain = new URL(url);
      domain = domain.hostname.replace('www.','');

      return domain
    },
  }
};
</script>