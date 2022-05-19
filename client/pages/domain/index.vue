<template>
  <v-container
    :style="$vuetify.breakpoint.xl ? 'padding: 0 15%; height: 100%;' : 'height: 100%;'"
  >
    <div
      v-if="loading"
    >
      Cargando...
    </div>

    <div
      v-else
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

      
        <v-row
          style="padding: 5% 0 2% 0"
        >
          <v-col
            class="d-flex align-center"
          >
            <img
              :src="domData.logo"
              height="75"
              width="75"
              class="mr-5"
            />

            <div>
              <h3>
                {{ getName(domData.host) }}
              </h3>

              {{ getDomain(domData.host) }}
            </div>
          </v-col>
        </v-row>

        <v-divider />

        <v-row
          style="padding: 3% 0 3% 0"
          class="d-flex flex-row"
        >
          <v-col>
            <h2 class="mb-2">
              Información
            </h2>

            <p class="ma-0">
              Información relevante del dominio
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            xs="12"
            md="4"
          >
            <v-card
              :outlined="!$vuetify.theme.dark"
            >
              <div 
                class="d-flex"
              >
                <v-card
                  class="ma-3 d-flex align-center justify-center"
                  height="50"
                  width="50"
                  elevation="0"
                  :color="$vuetify.theme.dark ? 'secondary' : 'grey lighten-3'"
                  rounded
                >
                  <img 
                    src="/icons/host-black.svg"
                    height="25"
                    width="25"
                  />
                </v-card>

                <div>
                  <v-card-title class="px-2 pt-2 pb-0">
                    Host
                  </v-card-title>

                  <v-card-text class="px-2 pb-2">
                    {{ domData.host }}
                  </v-card-text>
                </div>
              </div>
            </v-card>
          </v-col>

          <v-col
            xs="12"
            md="4"
          >
            <v-card
              :outlined="!$vuetify.theme.dark"
            >
              <div 
                class="d-flex"
              >
                <v-card
                  class="ma-3 d-flex align-center justify-center"
                  height="50"
                  width="50"
                  elevation="0"
                  :color="$vuetify.theme.dark ? 'secondary' : 'grey lighten-3'"
                  rounded
                >
                  <img 
                    src="/icons/globe-black.svg"
                    height="25"
                    width="25"
                  />
                </v-card>

                <div>
                  <v-card-title class="px-2 pt-2 pb-0">
                    Puerto
                  </v-card-title>

                  <v-card-text class="px-2 pb-2">
                    {{ domData.port }}
                  </v-card-text>
                </div>
              </div>
            </v-card>
          </v-col>

          <v-col
            xs="12"
            md="4"
          >
            <v-card
              :outlined="!$vuetify.theme.dark"
            >
              <div 
                class="d-flex"
              >
                <v-card
                  class="ma-3 d-flex align-center justify-center"
                  height="50"
                  width="50"
                  elevation="0"
                  :color="$vuetify.theme.dark ? 'secondary' : 'grey lighten-3'"
                  rounded
                >
                  <img 
                    src="/icons/shield-black.svg"
                    height="25"
                    width="25"
                  />
                </v-card>

                <div>
                  <v-card-title class="px-2 pt-2 pb-0">
                    Protocolo
                  </v-card-title>

                  <v-card-text class="px-2 pb-2">
                    {{ domData.protocol }}
                  </v-card-text>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-row
          style="padding: 3% 0 3% 0"
          class="d-flex flex-row"
        >
          <v-col>
            <h2 class="mb-2">
              Endpoints
            </h2>

            <p class="ma-0">
              Endpoints del dominio
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            v-for="(endpoint, i) in domData.endpoints"
            :key="i"
          >
            <v-expansion-panels
              flat
              hover
            >
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div
                    class="d-flex align-center"
                  >
                    <img
                      src="/icons/server.svg"
                      height="32"
                      width="32"
                      class="pa-0 mr-3"
                    >

                    {{ endpoint.ipAddress }}
                  </div>

                  <template
                    v-slot:actions
                  >
                    <v-icon
                      color="primary"
                    >
                      $expand
                    </v-icon>
                  </template>
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <v-card
                        outlined
                        rounded
                        class="pa-5 mt-1"
                        style="height: 100%; width: 100%;"
                        min-height="400"
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
                            Rango del endpoint:
                          </span>
                        </div>

                        <v-chart :option="fillGradeChartData(endpoint.grade)" autoresize />
                      </v-card>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col
                      md="6"
                    >
                      <v-card
                        outlined
                      >
                        <v-card-title
                          class="d-flex flex-row align-center"
                        >
                          <img
                            src="/icons/shield.svg"
                            height="24"
                            width="24"
                            class="mr-4"
                          />

                          <span 
                            class="text-secondary"
                          >
                            Protocolos utilizados
                          </span>
                        </v-card-title>

                        <v-card-text 
                          class="py-2 d-flex align-center"
                          v-for="(protocol, i) in endpoint.details.protocols"
                          :key="i"
                        >
                          {{ protocol.name }} {{ protocol.version }}
                        </v-card-text>
                      </v-card>
                    </v-col>

                    <v-col
                      xs="12"
                      md="6"
                    >
                      <v-card
                        outlined
                      >
                        <v-card-title
                          class="d-flex flex-row align-center"
                        >
                          <img
                            src="/icons/shield.svg"
                            height="24"
                            width="24"
                            class="mr-4"
                          />

                          <span 
                            class="text-secondary"
                          >
                            Protección de vulnerabilidades
                          </span>
                        </v-card-title>

                        <v-card-text 
                          class="py-2 d-flex align-center"
                        >
                          openSslCcs 

                          <img 
                            :src="getProtection(endpoint.details.openSslCcs)"
                            height="30"
                            width="30"
                            class="ml-2"
                          />
                        </v-card-text>

                        <v-card-text 
                          class="py-2 d-flex align-center"
                        >
                          openSSLLuckyMinus20  

                          <img 
                            :src="getProtection(endpoint.details.openSSLLuckyMinus20)"
                            height="30"
                            width="30"
                            class="ml-2"
                          />
                        </v-card-text>

                        <v-card-text 
                          class="py-2 d-flex align-center"
                        >
                          ticketbleed  

                          <img 
                            :src="getProtection(endpoint.details.ticketbleed)"
                            height="30"
                            width="30"
                            class="ml-2"
                          />
                        </v-card-text>

                        <v-card-text 
                          class="py-2 d-flex align-center"
                        >
                          bleichenbacher  

                          <img 
                            :src="getProtection(endpoint.details.bleichenbacher)"
                            height="30"
                            width="30"
                            class="ml-2"
                          />
                        </v-card-text>

                        <v-card-text 
                          class="py-2 d-flex align-center"
                        >
                          zombiePoodle  

                          <img 
                            :src="getProtection(endpoint.details.zombiePoodle)"
                            height="30"
                            width="30"
                            class="ml-2"
                          />
                        </v-card-text>

                        <v-card-text 
                          class="py-2 d-flex align-center"
                        >
                          goldenDoodle  

                          <img 
                            :src="getProtection(endpoint.details.goldenDoodle)"
                            height="30"
                            width="30"
                            class="ml-2"
                          />
                        </v-card-text>

                        <v-card-text 
                          class="py-2 d-flex align-center"
                        >
                          zeroLengthPaddingOracle  

                          <img 
                            :src="getProtection(endpoint.details.zeroLengthPaddingOracle)"
                            height="30"
                            width="30"
                            class="ml-2"
                          />
                        </v-card-text>

                        <v-card-text 
                          class="py-2 d-flex align-center"
                        >
                          sleepingPoodle  

                          <img 
                            :src="getProtection(endpoint.details.sleepingPoodle)"
                            height="30"
                            width="30"
                            class="ml-2"
                          />
                        </v-card-text>

                        <v-card-text 
                          class="py-2 d-flex align-center"
                        >
                          poodleTls  

                          <img 
                            :src="getProtection(endpoint.details.poodleTls)"
                            height="30"
                            width="30"
                            class="ml-2"
                          />
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
    </div>
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
      loading: true,
      domData: {},
      charOption: {
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 1,
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [0, '#FF6E76'],
                  [0.050, '#FF6E76'],
                  [0.125, '#FF6E76'],
                  [0.375, '#FDDD60'], 
                  [0.625, '#7CFFB2'],
                  [0.875, '#58D9F9'],
                  [1, '#7CFFB2'],
                ]
              }
            },
            pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '12%',
              width: 20,
              offsetCenter: [0, '-60%'],
              itemStyle: {
                color: 'auto'
              }
            },
            axisTick: {
              length: 12,
              lineStyle: {
                color: 'auto',
                width: 2
              }
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: 'inhert',
                width: 5
              }
            },
            axisLabel: {
              color: '#464646',
              fontSize: 20,
              distance: -60,
              formatter: function (value) {
                if (value === 1) {
                  return 'A+';
                } 
                else if (value === 0.875) {
                  return 'A';
                } 
                else if (value === 0.625) {
                  return 'B';
                } 
                else if (value === 0.375) {
                  return 'C';
                }
                else if (value === 0.125) {
                  return 'D';
                }
                else if (value === 0.050) {
                  return 'E';
                }
                else if (value === 0) {
                  return 'F';
                }
                return '';
              }
            },
            title: {
              offsetCenter: [0, '-20%'],
              fontSize: 30
            },
            detail: {
              offsetCenter: [0, '0%'],
              valueAnimation: true,
              color: 'auto'
            },
            center: ['50%', '75%'],
            data: [
              {
                value: 0
              }
            ]
          }
        ]
      }
    }
  },
  mounted() {
    this.$axios.post(`/domain/search`, { domain: this.$route.query.q })
      .then((response) => {
        this.domData = response.data
        this.loading = false
      })
      .catch((error) => {
        console.error(error)
      })
  },
  methods: {
    gradeToScore(protection) {
      switch (protection) {
        case 'A+':
          return 1
        case 'A':
          return 0.875
        case 'B':
          return 0.625
        case 'C':
          return 0.375
        case 'D':
          return 0.125
        case 'F':
          return 0
        default:
          return 0
      }
    },
    fillGradeChartData(grade) {
      let data = Object.assign({}, this.charOption)
      data.series[0].data[0].value = this.gradeToScore(grade)
      return data
    },
    getDomain: function (url) {
      let domain = (new URL(url));

      return domain.hostname
    },
    getName: function (url) {
      let domain = new URL(url);
      domain = domain.hostname.replace('www.','');
      domain = domain.replace('.com','');
      domain = domain.replace('.es','');
      domain = domain.replace('.',' ');
      return domain
    },
    getProtection: function (vul) {
      if (vul === 1) return "/icons/check.svg"
      else return "/icons/close-red.svg"
    }
  }
};
</script>