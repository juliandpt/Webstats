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
          :class="$vuetify.breakpoint.xs ? 'text-center text-h3 font-weight-medium' : 'text-h2 font-weight-medium'"
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
        <!-- <apexchart
          type="radialBar"
          :series="data.chartData"
          :options="data.chartOptions"
        ></apexchart> -->
        <v-chart :option="chartOptions" />
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
  data () {
    return {
      chartOptions: {
        series: [
          {
            type: 'gauge',
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false,
              itemStyle: {
                borderWidth: 1,
                borderColor: '#464646'
              }
            },
            axisLine: {
              lineStyle: {
                width: 40
              }
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              distance: 50
            },
            data: [
              {
                value: 10,
                detail: {
                  show: false
                }
              },
              {
                value: 20,
                detail: {
                  show: false
                }
              },
              {
                value: 30,
                detail: {
                  show: false
                }
              },
              {
                value: 40,
                detail: {
                  show: false
                }
              },
              {
                value: 50,
                detail: {
                  show: false
                }
              },
            ],
            title: {
              fontSize: 14
            },
          }
        ]
      },
      interval: null
    }
  },
  created() {
    this.interval = this.setInterval()
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    setInterval() {
      setInterval(() => {
        for(let i = 0; i < this.chartOptions.series[0].data.length; i++) {
          this.$set(this.chartOptions.series[0].data[i], 'value', parseFloat((Math.random() * 100).toFixed(2)))
        }
      }, 2000)
    }
  }
};
</script>