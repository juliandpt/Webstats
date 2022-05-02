<template>
  <div
    :class="$vuetify.theme.dark ? 'glass-black' : 'glass-white'"
  >
    <v-card
      flat
      color="transparent"
    >
      <v-container>
        <v-app-bar
          flat
          plain
          color="transparent"
        >
          <v-btn
            icon
            text
            large
            :color="$vuetify.theme.dark ? 'white' : 'black'"
            v-if="$vuetify.breakpoint.xs"
            @click.stop="drawer = !drawer"
          >
            <img
              src="/icons/bars-white.svg"
              height="24"
              width="24"
              v-if="$vuetify.theme.dark"
            >

            <img
              src="/icons/bars-black.svg"
              height="24"
              width="24"
              v-else
            >
          </v-btn>

          <v-toolbar-title
            class="pa-0 d-flex align-center"

          >
            <div 
              class="mr-2"
              v-if="!$vuetify.breakpoint.xs"
            >
              <img
              src="/icons/chart.svg"
              height="28"
              width="28"
            ></div>

            <div>
              Webstats
            </div>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <div
            v-if="!$vuetify.breakpoint.xs"
          >
            <v-btn
              text
              plain
              v-for="(route, i) in routes"
              :key="i"
              :to="route.link"
            >
              {{ route.title }}
            </v-btn>
          </div>

          <v-spacer></v-spacer>

          <div>
            <v-btn
              icon
              color="transparent"
              :plain="!$vuetify.breakpoint.xs"
              @click="toggleTheme()"
            >
              <v-fab-transition
                hide-on-leave
              >
                <img
                  src="/icons/sun.svg"
                  height="24"
                  width="24"
                  v-if="!$vuetify.theme.dark"
                >
              </v-fab-transition>

              <v-fab-transition
                hide-on-leave
              >
                <img
                  src="/icons/moon.svg"
                  height="24"
                  width="24"
                  v-if="$vuetify.theme.dark"
                >
              </v-fab-transition>
            </v-btn>
          </div>
        </v-app-bar>
      </v-container>
    </v-card>

    <v-navigation-drawer
      app
      absolute
      temporary
      v-model="drawer"
      v-if="$vuetify.breakpoint.xs"
    >
      <v-list
        flat
      >
        <v-list-item-group
          color="primary"
        >
          <v-btn
            icon
            text
            x-large
            color="secondary"
            v-if="$vuetify.breakpoint.xs"
            @click.stop="drawer = !drawer"
          >
            <img
              src="/icons/close-grey.svg"
              height="24"
              width="24"
            >
          </v-btn>

          <v-list-item
            v-for="(route, i) in routes"
            :key="i"
            :to="route.link"
          >
            <v-list-item-icon>
              <img
                :src="route.link === $route.path ? route.icon : route.icon_grey"
                height="28"
                width="28"
              >
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                v-text="route.title"
                :class="route.link === $route.path ? 'primary--text' : 'secondary--text'"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style lang="scss">
.v-btn--active {
  background-color: transparent !important;
  color: #4CAF50 !important;
}
.glass-white {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 50;
}
.glass-black {
  background-color: rgb(18, 18, 18, 0.8);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 50;
}
</style>

<script>
export default({
  data: () => ({
    drawer: false,
    group: null,
    routes: [
      {
        title: 'Inicio',
        icon: "/icons/home.svg",
        icon_grey: "/icons/home-grey.svg",
        link: "/"
      },
      {
        title: 'Búsqueda',
        icon: "/icons/search.svg",
        icon_grey: "/icons/search-grey.svg",
        link: "/search"
      },
      {
        title: 'Global',
        icon: "/icons/chart.svg",
        icon_grey: "/icons/chart-grey.svg",
        link: "/global"
      },
      {
        title: 'Contacto',
        icon: "/icons/mail.svg",
        icon_grey: "/icons/mail-grey.svg",
        link: "/contact"
      },
    ],
  }),
  watch: {
    group () {
      this.drawer = false
    },
  },
  methods: {
    toggleTheme: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    }
  },
  mounted() {
    const theme = localStorage.getItem("dark_theme");
    if (theme) {
      if (theme === "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.$vuetify.theme.dark = true;
      localStorage.setItem(
        "dark_theme",
        this.$vuetify.theme.dark.toString()
      );
    }
  }
})
</script>