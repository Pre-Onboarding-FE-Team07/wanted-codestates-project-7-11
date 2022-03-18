<template>
  <section>
    <div class="title-wrap" v-once>
      <p class="subject">MATCHING RATE</p>
      <h1 class="title">나와 기업의 매칭률은?</h1>
    </div>
    <div class="chart-wrap" v-if="enterpriseResult">
      <DoughnutChart
        class="chart"
        :chart-data="chartData"
        :options="chartOptions"
      />
      <div class="result">
        {{ enterpriseName }} 기업은<br />나의 진단결과와
        <p>
          <b>{{ matchRate }}%</b><span>일치합니다.</span>
        </p>
      </div>
    </div>
    <div class="empty" v-else>선택된 기업이 없습니다.</div>
  </section>
</template>

<script>
import { defineComponent, watch, ref, reactive, computed } from "vue";
import { DoughnutChart } from "vue-chart-3";
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
    enterpriseName: {
      type: String,
      default: "",
    },
  },
  components: { DoughnutChart },
  setup(props) {
    let matchRate = ref(0);
    let chartData = reactive({
      labels: ["매칭률(%)"],
      datasets: [
        {
          data: computed(() => {
            const rate = matchRate.value;
            return [rate, 100 - rate];
          }),
          backgroundColor: ["#6C87F580", "#F7F7F7"],
        },
      ],
    });

    const chartOptions = ref({
      maintainAspectRatio: false,
    });

    watch(
      () => props.enterpriseResult,
      () => {
        const { userResult, enterpriseResult } = props;
        matchRate.value = createChart(userResult, enterpriseResult);
      }
    );

    return { chartData, matchRate, chartOptions };
  },
});

const createChart = (userResult, enterpriseResult) => {
  if (!enterpriseResult) {
    return null;
  }
  return Math.round(getMatchRate(userResult, enterpriseResult));
};

const getMatchRate = (a, b) => {
  let rates = 0;
  a.map((score, index) => {
    let value = score / b[index];
    value = value > 1 ? 1 : value;
    rates += value;
  });
  return (rates * 100) / a.length;
};
</script>
<style lang="scss" scoped>
@import "../scss/chartDoughnut";
</style>
