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
        v-model="domain"
        @keyup.enter="searchDomain()"
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
        md="6"
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
                <h2 
                  class="font-weight-bold mb-2"
                >
                  {{ getName(item.host) }}
                </h2>

                {{ convertDomain(item.host) }}
              </v-card-text>
              <v-card-actions style="position: absolute; bottom: 0; right: 0">
                <v-btn
                  icon
                  right
                  color="grey"
                  @click="getDomain(item.host)"
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
  min-height: 30rem;
  padding: 0 15%;
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
    domain: "",
    suggestions: []
  }),
  mounted() {
    this.$axios.get('/domain/domains')
      .then((response) => {
        this.suggestions = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    searchDomain: function () {
      this.$router.push({
        path: '/domain',
        query: { q: this.domain },
      })
    },
    getDomain: function (host) {
      this.$router.push({
        path: '/domain',
        query: { q: host },
      })
    },
    convertDomain: function (url) {
      let res = new URL(url)

      return res.hostname
    },
    getName: function (url) {
      let domain = new URL(url);
      domain = domain.hostname.replace('www.','');
      domain = domain.replace('.com','');
      domain = domain.replace('.es','');
      domain = domain.replace('.',' ');
      
      return domain
    }
  }
};
</script>