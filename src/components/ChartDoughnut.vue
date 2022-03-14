<template>
  <section>
    <div class="title-wrap" v-once>
      <p class="subject">MATCHING RATE</p>
      <h1 class="title">나와 기업의 매칭률은?</h1>
    </div>
    <div class="chart-wrap" v-if="enterprise">
      <DoughnutChart
        class="chart"
        :chart-data="chartData"
        :options="chartOptions"
      />
      <div class="result">
        {{ enterprise.enterprise }} 기업은<br />나의 진단결과와
        <p>
          <b>{{ matchRate }}%</b><span>일치합니다.</span>
        </p>
      </div>
    </div>
    <div class="empty" v-else>선택된 기업이 없습니다.</div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  props: {
    userResult: {
      type: Object,
      default: null,
    },
    enterprise: {
      type: Object,
      default: null,
    },
  },
  components: { DoughnutChart },
  data() {
    return {
      chartData: {},
      matchRate: null,
      chartOptions: {
        options: {},
      },
    };
  },
  watch: {
    enterprise() {
      this.createChart();
    },
  },
  methods: {
    createChart() {
      if (!this.enterprise) {
        return false;
      }
      const matchRate = Math.round(
        getMatchRate(this.userResult, this.enterprise.result)
      );
      const chartData = {
        labels: ["매칭률(%)"],
        datasets: [
          {
            data: [matchRate, 100 - matchRate],
            backgroundColor: ["#6C87F580", "#F7F7F7"],
          },
        ],
      };
      this.chartData = chartData;
      this.matchRate = matchRate;
    },
  },
});

const getMatchRate = (a, b) => {
  let rates = 0;
  const keys = Object.keys(a);
  keys.map((key) => {
    let value = a[key] / b[key];
    value = value > 1 ? 1 : value;
    rates += value;
  });
  return (rates * 100) / keys.length;
};
</script>
<style lang="scss">
@import "~/scss/chartDoughnut";
</style>
