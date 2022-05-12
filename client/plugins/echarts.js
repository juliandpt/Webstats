import Vue from 'vue'
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'

// import ECharts modules manually to reduce bundle size
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart,
  GaugeChart,
  LineChart,
  PieChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  GaugeChart,
  LineChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent
]);

// register globally (or you can do it locally)
Vue.component('v-chart', ECharts)