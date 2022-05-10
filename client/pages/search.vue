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
        hint="https://www.example.com"
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

    <v-row>
      <v-col
        xs="12"
        sm="6"
        md="6"
        lg="4"
        xl="4"
        class="pb-0"
        v-for="(item, i) in suggestions"
        :key="i"
      >
        <v-card>
          <div 
            class="d-flex"
          >
            <v-avatar
              class="ma-3"
              size="100"
              tile
            >
              <v-img :src="item.logo"></v-img>
            </v-avatar>

            <div>

              <v-card-text>
                <p class="font-weight-bold">Nombre pagina</p>
                {{ convertDomain(item.host) }}
              </v-card-text>
              <v-card-actions style="position: absolute; bottom: 0; right: 0">
                <v-btn
                  icon
                  right
                  color="grey"
                  @click="getDomainInfo(item.host)"
                >
                  <v-img
                    src="/icons/link.svg"
                    height="25"
                    width="25"
                  >
                  </v-img>
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>

        <div
          class="ma-2 d-flex flex-row align-center"
        >
          <v-spacer></v-spacer>

          <img
            src="/icons/eye.svg"
            height="20"
            width="20"
            class="mx-1"
          >

          {{ item.timesSearched }}
        </div>
      </v-col>
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
    loading: false,
    suggestions: []
  }),
  mounted() {
    this.$axios.get('/domain/recents')
      .then((response) => {
        this.suggestions = response.data.results
        console.log(response)
      })
      .catch((error) => {
      })
  },
  methods: {
    getDomainInfo: function (domain) {
      this.$axios.get('/domain/search', )
      .then((response) => {
        this.suggestions = response
      })
      .catch((error) => {
      })
    },
    convertDomain: function (url) {
      let res = new URL(url)

      return res.hostname
    }
  }
};
</script>