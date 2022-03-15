<template>
  <section>
    <RadarChart :chart-data="chartData" :options="options" />
    <img src="radar_cat.png" />
  </section>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { RadarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  name: "ChartPentagon",
  components: { RadarChart },
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
  setup(props) {
    const options = {
      reposive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      scales: {
        r: {
          angleLines: {
            color: "rgba(178, 178, 178, 1)",
          },
          grid: {
            color: "rgba(178, 178, 178, 1)",
            borderDash: [4],
          },
          ticks: {
            display: false,
            stepSize: 2,
            max: 10,
          },
          pointLabels: {
            color: "#121212",
            font: {
              family: "Noto Sans",
              size: 12,
              lineHeight: 1.3,
              weight: 700,
            },
            padding: 20,
          },
        },
      },
    };
    const chartData = reactive({
      labels: [
        ["적극적인", "Aggressive"],
        ["자신있는", "Confident"],
        ["책임있는", "Responsible"],
        ["개인주의", "Indivisual"],
        ["수평적인", "Horizontal"],
      ],
      datasets: [
        {
          data: props.userResult,
          backgroundColor: "rgba(110, 60, 249, 0.32)",
          borderColor: "rgba(110, 60, 249, 1)",
          borderWidth: 2,
          borderJoinStyle: "round",
          pointRadius: 0,
          order: 1,
        },
        {
          data: props.enterpriseResult || null,
          backgroundColor: "rgba(255, 193, 74, 0.32)",
          borderColor: "rgba(255, 211, 53, 1)",
          borderWidth: 2,
          borderJoinStyle: "round",
          pointRadius: 0,
          order: 0,
        },
        {
          data: [10, 10, 10, 10, 10],
          pointRadius: 16,
          borderWidth: 1,
          backgroundColor: "rgba(238, 238, 238, 0.32)",
          borderColor: "rgba(178, 178, 178, 1)",
          pointHoverRadius: 16,
          pointBackgroundColor: [
            "rgba(235, 133, 108, 0.7)",
            "rgba(108, 135, 245, 0.5)",
            "rgba(64, 171, 199, 0.5)",
            "rgba(229, 115, 160, 0.5)",
            "rgba(101, 184, 81, 0.5)",
          ],
          order: 2,
        },
      ],
    });
    return { options, chartData };
  },
});
</script>

<style lang="scss" scoped>
section {
  position: relative;
  padding: 0 15px;
  box-sizing: border-box;
  img {
    width: 54px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -15%);
  }
}
</style>
