<template>
  <v-container
    style="height: 100%"
    :style="$vuetify.breakpoint.xl ? 'padding: 0 15%' : ''"
  >
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
          <v-row
            v-for="user in users"
            :key="user._id"
            align="center"
            class="rounded table-row"
            no-gutters
          >
            <v-col cols="2">
              <p>{{ user.name }} {{ user.surnames }}</p>
            </v-col>
            <v-col cols="2" class="cut-text">
              <p>{{ user.email }}</p>
            </v-col>
            <v-spacer />
            <v-col>
              <v-row no-gutters justify="end">
                <v-btn icon>
                  <v-icon @click="selectDeleteAdmin(user._id)">mdi-delete</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon @click="editDialog = true">mdi-pencil</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>
    <div class="pt-5" style="height: 50%">
      <p>Estadísticas</p>
      <v-row style="height: 100%; max-height: 100%">
        <v-col cols="6">
          <v-card rounded class="pa-5" style="height: 100%">
            <p>Busquedas mas recientes</p>
            <div class="table">
              <v-row
                v-for="recent in recents"
                :key="recent._id"
                align="center"
                class="rounded table-row"
                no-gutters
              >
                <v-col cols="1">
                  <v-img :src="recent.logo" height="25" width="25" />
                </v-col>
                <v-col>
                  <p>{{ convertDomain(recent.host) }}</p>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card rounded class="pa-5" style="height: 100%">
            <p>Top busquedas</p>
            <div class="table">
              <v-row
                v-for="top in tops"
                :key="top._id"
                align="center"
                class="rounded table-row"
                no-gutters
              >
                <v-col cols="1">
                  <v-img :src="top.logo" height="25" width="25" />
                </v-col>
                <v-col>
                  <p>{{ convertDomain(top.host) }}</p>
                </v-col>
                <v-spacer />
                <v-col>
                  <v-row no-gutters justify="end">
                    <p>{{ top.timesSearched }}</p>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card rounded class="px-5 pt-5" style="height: 100%">
            <!-- <apexchart
              type="radialBar"
              :series="timeCharData.chartData"
              :options="timeCharData.chartOptions"
            ></apexchart> -->
            <v-chart :option="chartOptions" />
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card rounded class="pa-5" style="height: 100%">
            <v-chart :option="pieChartOptions" />
          </v-card>
        </v-col>
      </v-row>
    </div>

    <v-dialog v-model="editDialog" width="500">
      <v-card>
        <v-card-title class="pb-10">
          Editar usuario

          <v-spacer />

          <v-btn
            icon
            text
            color="secondary"
            @click.stop="editDialog = !editDialog"
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
                @click="editDialog = !editDialog"
              >
                Cancel
              </v-btn>
            </v-col>

            <v-col cols="6">
              <v-btn
                block
                x-large
                color="primary"
                elevation="0"
                dark
                :loading="loading"
                @click="editAdmin()"
              >
                Edit
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" width="500">
      <v-card>
        <v-card-title class="d-flex justify-center pb-10">
          <img src="/icons/trash.svg" width="40" height="40" />
        </v-card-title>

        <v-card-text class="text-center">
          Estas seguro que quieres eliminar a Admin?
        </v-card-text>

        <v-card-text>
          <v-alert border="left" text type="error">
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
                Cancel
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
                Delete
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth'],
  head() {
    return {
      title: "Dashboard",
    };
  },
  data() {
    return {
      users: [],
      recents: [],
      tops: [],
      editDialog: false,
      deleteDialog: false,
      loading: false,
      name: "",
      surnames: "",
      email: "",
      password: "",
      repeatPassword: "",
      selectedAdmin: "",
      repeatPasswordRules: [(value) => value === password],
      chartOptions: {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: 0,
          right: 0,
          bottom: 0,
          height: '100%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Line 1',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8
            },
            emphasis: {
              focus: 'series'
            },
            data: []
          },
        ]
      },
      pieChartOptions: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: []
          }
        ]
      }
    };
  },
  async created() {
    try {
      this.users = (await this.$axios.$get("/admin/getAdmins"));
      this.recents = (await this.$axios.$get("/domain/recents")).results;
      this.tops = (await this.$axios.$get("/domain/tops")).results;
      await this.setWeeklyData()
      await this.setGrades()
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async setWeeklyData() {
      let weeklyData = await this.$axios.$get("/domain/weekly")
      weeklyData.forEach(data => {
        this.chartOptions.xAxis[0].data.push(data._id)
        this.chartOptions.series[0].data.push(data.totalSearches)
      })
    },
    async setGrades()  {
      let grades = await this.$axios.$get("/domain/grades")
      let data = []
      grades.forEach(grade => {
        data.push({ value: grade.grades, name: grade._id })
      })
      this.pieChartOptions.series[0].data = data
    },
    convertDomain(url) {
      let res = new URL(url);

      return res.hostname;
    },
    selectDeleteAdmin(admin) {
      this.selectedAdmin = admin
      this.deleteDialog = true
    },
    selectEditAdmin(admin) {
      this.selectedAdmin = admin
      this.editDialog = true
    },
    deleteAdmin() {
      console.log(this.selectedAdmin)
      this.$axios.delete(`/admin/delete/${this.selectedAdmin}`)
        .then((repsonse) => {
          console.log(repsonse)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    editAdmin() {
      let payload = {
        name: this.name,
        surnames
      }
    },
    userLogout() {
      localStorage.removeItem('token');
      this.$router.push('/login')
    }
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