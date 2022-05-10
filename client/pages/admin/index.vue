<template>
  <v-container style="height: 100%" :style="$vuetify.breakpoint.xl ? 'padding: 0 15%' : ''">
    <div style="max-height: 50%">
      <p>Lista de usuarios</p>
      <v-card rounded class="pa-5">
        <v-row class="font-weight-bold px-2" no-gutters> 
          <v-col cols="2">
            <p>Nombre</p>
          </v-col>
          <v-col cols="2">
            <p>Email</p>
          </v-col>
        </v-row>
        <div class="table">
          <v-row v-for="user in users" :key="user._id" align="center" class="rounded table-row" no-gutters>
            <v-col cols="2">
              <p>{{ user.name }} {{ user.surnames }}</p>
            </v-col>
            <v-col cols="2">
              <p>{{ user.email }}</p>
            </v-col>
            <v-spacer />
            <v-col>
              <v-row no-gutters justify="end">
                <v-btn icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>
    <div class="pt-5" style="height: 50%">
      <p>Estadisticas</p>
      <v-row style="height: 100%; max-height: 100%">
        <v-col cols="6">
          <v-card rounded class="pa-5" style="height: 100%">
            <p>Busquedas mas recientes</p>
            <div class="table">
            <v-row v-for="recent in recents" :key="recent._id" align="center" class="rounded table-row" no-gutters>
              <v-col cols="1">
                <v-img :src="recent.logo" height="25" width="25" />
              </v-col>
              <v-col>
                <p>{{ convertDomain(recent.host) }}</p>
              </v-col>
              <v-spacer />
              <v-col>
                <v-row no-gutters justify="end">
                  <v-btn icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </div>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card rounded class="pa-5" style="height: 100%">
            <p>Top busquedas</p>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card rounded class="pa-5" style="height: 100%"></v-card>
        </v-col>
        <v-col cols="6">
          <v-card rounded class="pa-5" style="height: 100%"></v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      recents: [],
      tops: []
    }
  },
  async created() {
    try {
      this.users = (await this.$axios.$get('/admin/getAdmins')).admins
      this.recents = (await this.$axios.$get('/domain/recents')).results
      this.tops = (await this.$axios.$get('/domain/tops')).results
    } catch(error) {
      console.log(error)
    }

    console.log(this.recents)
  },
  methods: {
    convertDomain(url) {
      let res = new URL(url)

      return res.hostname
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  .table-row {
    padding: .5rem;

    &:nth-child(even) {
      background-color: #9e9e9e60;
    }
    p {
      margin: 0;
    }
  }
}
</style>