<template>
  <v-container 
    :style="$vuetify.breakpoint.xl ? 'padding: 0 15%' : ''"
  >
    <div 
      v-if="loading"
    >
      Cargando...
    </div>

    <div 
      v-else
    >
      <v-row 
        class="mt-16"
      >
        <v-spacer />

        <div 
          class="d-flex align-center"
        >
          <div 
            class="mr-5"
          >
            Hola, {{ admin.name }}
          </div>

          <v-menu offset-y>
            <template 
              v-slot:activator="{ on, attrs }"
            >
              <v-btn 
                fab 
                color="primary" 
                elevation="0" 
                v-bind="attrs" 
                v-on="on"
              >
                {{ getLetter(admin.name) }}
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-btn
                  color="secondary"
                  text
                  block
                  @click="selectEditAdmin(admin._id)"
                >
                  Editar
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn 
                  color="error" 
                  text 
                  block 
                  @click="userLogout()"
                >
                  Cerrar sesión
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-row>

      <div>
        <div 
          class="mt-16 mb-8 d-flex flex-row align-center"
        >
          <img 
            src="/icons/admins.svg" 
            height="30" 
            width="30" 
            class="mr-4" 
          />

          <h2> Administradores </h2>

          <v-spacer />

          <v-btn 
            fab 
            icon 
            color="primary"
            @click="selectCreateAdmin()"
          >
            <img 
              src="/icons/plus.svg" 
              height="35" 
              width="35" 
            />
          </v-btn>
        </div>

        <v-row>
          <v-col
            xs="12"
            sm="12"
            md="12"
            lg="4"
            v-for="a in admins"
            :key="a._id"
          >
            <v-card class="text-center">
              <v-card-title>
                <v-spacer />

                <v-menu 
                  offset-y
                >
                  <template 
                    v-slot:activator="{ on, attrs }"
                  >
                    <v-btn 
                      icon 
                      v-bind="attrs" 
                      v-on="on"
                    >
                      <img 
                        src="/icons/dots.svg" 
                        height="25" 
                        width="25" 
                      />
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item>
                      <v-btn
                        color="secondary"
                        text
                        block
                        @click="selectEditAdmin(a)"
                      >
                        Editar
                      </v-btn>
                    </v-list-item>
                    <v-list-item>
                      <v-btn
                        color="error"
                        text
                        block
                        @click="selectDeleteAdmin(a)"
                      >
                        Eliminar
                      </v-btn>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-title>

              <v-card-text 
                class="pa-4"
              >
                <v-avatar 
                  size="100" 
                  color="primary" 
                  class="text-h4"
                >
                  {{ getLetter(a.name) }}
                </v-avatar>
              </v-card-text>

              <v-card-text 
                class="font-weight-black pb-0"
              >
                {{ a.name }} {{ a.surnames }}
              </v-card-text>

              <v-card-text 
                class="pb-8"
              >
                {{ a.email }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <div 
        class="pt-5" 
        style="height: 50%"
      >
        <div 
          class="mt-16 mb-8 d-flex flex-row align-center"
        >
          <img 
            src="/icons/dashboard.svg" 
            height="30" 
            width="30" 
            class="mr-4" 
          />

          <h2> Estadísticas </h2>
        </div>
        <v-row 
          style="height: 100%; 
          max-height: 100%"
        >
          <v-col 
            cols="6"
          >
            <v-card 
              rounded 
              class="pa-5" 
              :outlined="!$vuetify.theme.dark"
              style="height: 100%"
            >
              <div 
                class="mt-2 mb-4 d-flex flex-row align-center"
              >
                <img
                  src="/icons/clock.svg"
                  height="24"
                  width="24"
                  class="mr-4"
                />

                <span> Recientes </span>
              </div>

              <div 
                class="table"
              >
                <v-row
                  v-for="recent in recents"
                  :key="recent._id"
                  align="center"
                  class="rounded table-row"
                  no-gutters
                >
                  <v-col 
                    cols="1"
                  >
                    <v-img 
                      :src="recent.logo" 
                      height="25" 
                      width="25" 
                    />
                  </v-col>
                  <v-col>
                    <p>{{ convertDomain(recent.host) }}</p>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
          <v-col 
            cols="6"
          >
            <v-card 
              rounded 
              :outlined="!$vuetify.theme.dark"
              class="pa-5" 
              style="height: 100%"
            >
              <div 
                class="mt-2 mb-4 d-flex flex-row align-center"
              >
                <img
                  src="/icons/trophy.svg"
                  height="24"
                  width="24"
                  class="mr-4"
                />

                <span> Más buscados </span>
              </div>

              <div 
                class="table"
              >
                <v-row
                  v-for="top in tops"
                  :key="top._id"
                  align="center"
                  class="rounded table-row"
                  no-gutters
                >
                  <v-col 
                    cols="1"
                  >
                    <v-img 
                      :src="top.logo" 
                      height="25" 
                      width="25" 
                    />
                  </v-col>

                  <v-col>
                    <p> {{ convertDomain(top.host) }} </p>
                  </v-col>

                  <v-spacer />

                  <v-col>
                    <v-row 
                      no-gutters 
                      justify="end"
                    >
                      <p> {{ top.timesSearched }} </p>
                    </v-row>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
          <v-col 
            cols="6"
          >
            <v-card 
              rounded 
              :outlined="!$vuetify.theme.dark"
              class="px-5 pt-5" 
              style="height: 100%"
            >
              <div 
                class="mt-2 mb-4 d-flex flex-row align-center"
              >
                <img
                  src="/icons/schedule.svg"
                  height="24"
                  width="24"
                  class="mr-4"
                />

                <span> Ultimas busquedas </span>
              </div>

              <v-chart :option="chartOptions" />
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card 
              rounded 
              :outlined="!$vuetify.theme.dark"
              class="pa-5" 
              style="height: 100%" 
              min-height="450"
            >
              <div 
                class="mt-2 mb-4 d-flex flex-row align-center"
              >
                <img
                  src="/icons/medal.svg"
                  height="24"
                  width="24"
                  class="mr-4"
                />

                <span 
                  class="text-secondary"
                > 
                  Rango de endpoints 
                </span>
              </div>

              <v-chart :option="pieChartOptions" />
            </v-card>
          </v-col>
        </v-row>
      </div>

      <v-dialog 
        v-model="dialog" 
        width="500"
      >
        <v-card>
          <v-card-title 
            class="pb-10"
            v-if="edit"
          >
            Editar administrador

            <v-spacer />

            <v-btn
              icon
              text
              color="secondary"
              @click.stop="dialog = !dialog"
            >
              <img src="/icons/close-grey.svg" height="24" width="24" />
            </v-btn>
          </v-card-title>

          <v-card-title 
            class="pb-10"
            v-else
          >
            Crear administrador

            <v-spacer />

            <v-btn
              icon
              text
              color="secondary"
              @click.stop="dialog = !dialog"
            >
              <img src="/icons/close-grey.svg" height="24" width="24" />
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field
                  filled
                  rounded
                  auto-grow
                  required
                  clearable
                  clear-icon="mdi-window-close"
                  label="Nombre"
                  placeholder="Nombre"
                  hide-details="auto"
                  class="rounded"
                  color="primary"
                  v-model="name"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field
                  filled
                  rounded
                  auto-grow
                  required
                  clearable
                  clear-icon="mdi-window-close"
                  label="Apellidos"
                  placeholder="Apellidos"
                  hide-details="auto"
                  class="rounded"
                  color="primary"
                  v-model="surnames"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field
                  filled
                  rounded
                  auto-grow
                  required
                  clearable
                  clear-icon="mdi-window-close"
                  label="Email"
                  placeholder="example@domain.com"
                  hide-details="auto"
                  class="rounded"
                  color="primary"
                  v-model="email"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field
                  filled
                  rounded
                  auto-grow
                  required
                  clearable
                  clear-icon="mdi-window-close"
                  label="Contraseña"
                  placeholder="Contraseña"
                  hide-details="auto"
                  class="rounded"
                  color="primary"
                  v-model="password"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field
                  filled
                  rounded
                  auto-grow
                  required
                  clearable
                  clear-icon="mdi-window-close"
                  label="Repetir contraseña"
                  placeholder="Repetir contraseña"
                  hide-details="auto"
                  class="rounded"
                  color="primary"
                  v-model="repeatPassword"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-btn
                  block
                  x-large
                  text
                  color="secondary"
                  elevation="0"
                  @click="dialog = !dialog"
                >
                  Cancelar
                </v-btn>
              </v-col>

              <v-col 
                cols="6"
                v-if="edit"
              >
                <v-btn
                  block
                  x-large
                  color="primary"
                  elevation="0"
                  dark
                  :loading="loading"
                  @click="editAdmin()"
                >
                  Editar
                </v-btn>
              </v-col>

              <v-col 
                cols="6"
                v-else
              >
                <v-btn
                  block
                  x-large
                  color="primary"
                  elevation="0"
                  dark
                  :loading="loading"
                  @click="createAdmin()"
                >
                  Crear
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="deleteDialog"
        width="500"
      >
        <v-card>
          <v-card-title 
            class="d-flex justify-center pb-10"
            >
            <img 
              src="/icons/trash.svg" 
              width="40" 
              height="40" 
            />
          </v-card-title>

          <v-card-text 
            class="text-center"
          >
            Estas seguro que quieres realizar esta acción?
          </v-card-text>

          <v-card-text>
            <v-alert 
              border="left" 
              text 
              type="error"
            >
              <strong> Alerta </strong>

              <br />

              Esta acción elimina definitivamente al Administrador de la base de
              datos
            </v-alert>
          </v-card-text>

          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-btn
                  block
                  x-large
                  text
                  color="secondary"
                  elevation="0"
                  @click="deleteDialog = !deleteDialog"
                >
                  Cancelar
                </v-btn>
              </v-col>

              <v-col cols="6">
                <v-btn
                  block
                  x-large
                  color="error"
                  elevation="0"
                  dark
                  :loading="loading"
                  @click="deleteAdmin()"
                >
                  Eliminar
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-snackbar
        app
        right
        :text="!$vuetify.theme.dark"
        v-model="snackbarShow"
        :color="error ? 'red darken-3' : 'green darken-2'"
      >
        <v-layout
          align-center
          pr-4
        >
          <img
            src="/icons/error-white.svg"
            class="mr-1"
            height="24"
            width="24"
            v-if="error && $vuetify.theme.dark"
          >

          <img
            src="/icons/error.svg"
            class="mr-1"
            height="24"
            width="24"
            v-if="error && !$vuetify.theme.dark"
          >

          <img
            src="/icons/circle-check-white.svg"
            class="mr-1"
            height="24"
            width="24"
            v-if="!error && $vuetify.theme.dark"
          >

          <img
            src="/icons/circle-check-green.svg"
            class="mr-1"
            height="24"
            width="24"
            v-if="!error && !$vuetify.theme.dark"
          >

          {{ text }}
        </v-layout>

        <template
          v-slot:action="{ attrs }"
        >
          <v-btn
            icon
            v-bind="attrs"
            @click="snackbarShow = false"
          >
            <img
              src="/icons/close-white.svg"
              height="24"
              width="24"
              v-if="$vuetify.theme.dark"
            >

            <img
              src="/icons/close-red.svg"
              height="24"
              width="24"
              v-if="!$vuetify.theme.dark && error"
            >

            <img
              src="/icons/close-green.svg"
              height="24"
              width="24"
              v-if="!$vuetify.theme.dark && !error"
            >
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
export default {
  middleware: ["auth"],
  head() {
    return {
      title: "Dashboard",
    };
  },
  data() {
    return {
      admin: {},
      admins: [],
      recents: [],
      tops: [],

      dialog: false,
      edit: false,
      deleteDialog: false,

      loading: true,

      snackbarShow: false,
      error: false,
      text: "",

      name: "",
      surnames: "",
      email: "",
      password: "",
      repeatPassword: "",
      selectedAdmin: "",
      repeatPasswordRules: [(value) => value === password],

      chartOptions: {
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        grid: {
          left: 0,
          right: 0,
          bottom: 0,
          height: "100%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Line 1",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
            },
            emphasis: {
              focus: "series",
            },
            data: [],
          },
        ],
      },
      pieChartOptions: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [],
          },
        ],
      },
    };
  },
  async created() {
    try {
      this.admin = await this.$axios.$get("/admin/user");
      this.admins = await this.$axios.$get("/admin/getAdmins");
      this.recents = await this.$axios.$get("/domain/recents");
      this.tops = await this.$axios.$get("/domain/tops");
      await this.setWeeklyData();
      await this.setGrades();
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.$router.push("/admin/login");
    }
  },
  methods: {
    async setWeeklyData() {
      let weeklyData = await this.$axios.$get("/domain/weekly");
      weeklyData.forEach((data) => {
        this.chartOptions.xAxis[0].data.push(data._id);
        this.chartOptions.series[0].data.push(data.totalSearches);
      });
    },
    async setGrades() {
      let grades = await this.$axios.$get("/domain/grades");
      let data = [];
      grades.forEach((grade) => {
        data.push({ value: grade.grades, name: grade._id });
      });
      this.pieChartOptions.series[0].data = data;
    },
    deleteAdmin() {
      this.$axios
        .delete(`/admin/delete/${this.selectedAdmin._id}`)
        .then((repsonse) => {
          this.error = false
          this.text = 'Admin eliminado correctamente!'
          this.loading = false
          this.deleteDialog = false
          this.snackbarShow = true
        })
        .catch((error) => {
          this.error = true
          this.text = 'Algo salio mal...'
          this.loading = false
          this.snackbarShow = true
        });
    },
    editAdmin() {
      if (this.name === "") this.name = selectedAdmin.name;
      if (this.surnames === "") this.surnames = selectedAdmin.surnames;
      if (this.email === "") this.email = selectedAdmin.email;
      if (this.password === "") this.password = "1234";

      let payload = {
        name: this.name,
        surnames: this.surnames,
        email: this.email,
        password: this.password,
      };

      this.$axios
        .post(`/admin/edit/${this.selectedAdmin._id}`, payload)
        .then((response) => {
          this.error = false
          this.text = 'Admin editado correctamente!'
          this.loading = false
          this.dialog = false
          this.snackbarShow = true
        })
        .catch((error) => {
          this.error = true
          this.text = 'Algo salio mal...'
          this.loading = false
          this.snackbarShow = true
        })
    },
    createAdmin() {
      let payload = {
        name: this.name,
        surnames: this.surnames,
        email: this.email,
        password: this.password,
      };

      this.$axios
        .put('/admin/register', payload)
        .then((response) => {
          this.error = false
          this.text = 'Admin creado correctamente!'
          this.loading = false
          this.dialog = false
          this.snackbarShow = true
        })
        .catch((error) => {
          this.error = true
          this.text = 'Algo salio mal...'
          this.loading = false
          this.snackbarShow = true
        })
    },
    selectDeleteAdmin(admin) {
      this.selectedAdmin = admin;
      this.deleteDialog = true;
    },
    selectEditAdmin(admin) {
      this.selectedAdmin = admin;
      this.edit = true
      this.dialog = true;
    },
    selectCreateAdmin() {
      this.edit = false
      this.dialog = true;
    },
    convertDomain(url) {
      let res = new URL(url);

      return res.hostname;
    },
    userLogout() {
      localStorage.removeItem("token");
      this.$router.push("/admin/login");
    },
    getLetter(name) {
      let string = name.charAt(0).toUpperCase();
      return string;
    },
  },
};
</script>

<style lang="scss" scoped>
.table {
  .table-row {
    padding: 0.5rem;

    &:nth-child(even) {
      background-color: #9e9e9e60;
    }
    p {
      margin: 0;
    }
  }

  .cut-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>