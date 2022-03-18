<template>
  <BarChart
    v-bind="barChartProps"
    :style="{
      position: 'absolute',
      top: 0,
      marginLeft: '-36px',
    }"
  />
</template>

<script>
import { computed, defineComponent, ref, toRefs } from "vue";
import { BarChart, useBarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  props: {
    userResult: {
      type: Array,
      required: true,
    },
    enterpriseResult: {
      type: Array,
      default: null,
    },
    tabNum: {
      type: Number,
      default: 0,
    },
  },
  chartData: "BarProcess",
  components: { BarChart },
  setup(props) {
    const { userResult, enterpriseResult, tabNum } = toRefs(props);
    const options = ref({
      barThickness: 10,

      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
      plugins: {
        legend: false,
        tooltip: false,
      },
    });

    const changeUserData = (data, num) => {
      if (num !== 2) {
        return data?.map((element) => (element > 5 ? -element : element));
      } else {
        return [];
      }
    };

    const changeEnterPriseData = (data, num) => {
      if (num !== 1) {
        return data?.map((element) => (element > 5 ? -element : element));
      } else {
        return [];
      }
    };

    const chartData = computed(() => ({
      labels: ["", "", "", "", ""],
      datasets: [
        {
          data: changeUserData(userResult.value, tabNum.value),
          backgroundColor: "#6E3CF9",
        },
        {
          data: changeEnterPriseData(enterpriseResult.value, tabNum.value),
          backgroundColor: "#FFD966",
        },
      ],
    }));

    const { barChartProps, barChartRef } = useBarChart({
      chartData,
      options,
    });

    return { barChartProps, barChartRef };
  },
});
</script>
