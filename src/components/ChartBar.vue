<template>
  <BarChart
    v-bind="barChartProps"
    :style="{
      width: '15rem',
      height: '15rem',
      alignItems: 'center',
    }"
  />
</template>

<script>
import { computed, defineComponent, ref, toRefs } from "vue";
import { BarChart, useBarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

const changeData = (data) => {
  return data?.map((element) => (element > 5 ? -element : element)) || [];
};

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
  },
  chartData: "BarProcess",
  components: { BarChart },
  setup(props) {
    const { userResult, enterpriseResult } = toRefs(props);
    const options = ref({
      barThickness: 10,
      responsive: true,
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

    const chartData = computed(() => ({
      labels: ["", "", "", "", ""],
      datasets: [
        {
          data: changeData(userResult.value),
          backgroundColor: "#6E3CF9",
        },
        {
          data: changeData(enterpriseResult.value),
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
