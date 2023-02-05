import { App } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart, RadarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent,
} from 'echarts/components'
import Chart from './BasicComponents/Charts/index.vue'
import Breadcrumb from './BasicComponents/Breadcrumb/index.vue'
import Loading from './BasicComponents/Loading/index.vue'
import SvgIcon from './BasicComponents/SvgIcon/index.vue'
import Table from './BasicComponents/Table/index.vue'
import Select from './BasicComponents/Select/index.vue'

// Manually introduce ECharts modules to reduce packing size

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent,
])

export default {
  install(Vue: App) {
    Vue.component('Chart', Chart)
    Vue.component('Breadcrumb', Breadcrumb)
    Vue.component('SvgIcon', SvgIcon)
    Vue.component('Loading', Loading)
    Vue.component('Table', Table)
    Vue.component('Select', Select)
  },
}
