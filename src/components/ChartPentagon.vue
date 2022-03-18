<template>
  <section>
    <RadarChart :chart-data="chartData" :options="options" />
    <img src="../assets/radar_cat.png" />
  </section>
</template>

<script>
import { defineComponent, watch, ref } from "vue";
import { RadarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

const USER = 0;
const ENTERPRISE = 1;

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
    tabNum: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const options = {
      reposive: true,
      maintainAspectRatio: false,
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
    const chartData = ref(
      createChart(props.userResult, props.enterpriseResult)
    );

    watch(
      () => props.enterpriseResult,
      () => {
        chartData.value = createChart(props.userResult, props.enterpriseResult);
      }
    );
    return { options, chartData };
  },
  methods: {
    show(idx) {
      this.chartData.datasets[idx].fill = true;
      this.chartData.datasets[idx].showLine = true;
    },
    hide(idx) {
      this.chartData.datasets[idx].fill = false;
      this.chartData.datasets[idx].showLine = false;
    },
  },
  beforeUpdate() {
    const changeTab = {
      tab: {
        0: (enterpriseResult) => {
          this.chartData.datasets[ENTERPRISE].data = [...enterpriseResult];
          this.show(USER);
          this.show(ENTERPRISE);
        },
        1: () => {
          this.show(USER);
          this.hide(ENTERPRISE);
        },
        2: (enterpriseResult) => {
          this.chartData.datasets[ENTERPRISE].data = [...enterpriseResult];
          this.hide(USER);
          this.show(ENTERPRISE);
        },
      },
      change(enterpriseResult, tabNum) {
        console.log(enterpriseResult, tabNum);
        if (enterpriseResult) this.tab[tabNum](enterpriseResult);
        else this.tab[1]();
      },
    };
    changeTab.change(this.enterpriseResult, this.tabNum);
  },
});

const createChart = (userResult, enterpriseResult) => ({
  labels: [
    ["적극적인", "Aggressive"],
    ["자신있는", "Confident"],
    ["책임있는", "Responsible"],
    ["개인주의", "Indivisual"],
    ["수평적인", "Horizontal"],
  ],
  datasets: [
    {
      data: userResult,
      backgroundColor: "rgba(110, 60, 249, 0.32)",
      borderColor: "rgba(110, 60, 249, 1)",
      borderWidth: 2,
      borderJoinStyle: "round",
      pointRadius: 0,
      order: 1,
    },
    {
      data: enterpriseResult || null,
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
