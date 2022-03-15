<template>
  <section class="title">
    <p>M Y R E S U L T</p>
    <h1>나의 결과는?</h1>
  </section>
  <section class="chart">
    <div>
      <div class="between" v-for="(score, i) in user" :key="i">
        <section class="num">
          <article :style="selectScoreColor(score)">
            <span>{{ score }} </span> / 10
          </article>
        </section>
        <section class="num">
          <article :style="selectStandardColor(score)">{{ left[i] }}</article>
        </section>
      </div>
    </div>
    <div class="chartBar">
      <div class="line">
        <p id="row" v-for="(score, i) in user" :key="i"></p>
      </div>
      <p id="col"></p>
      <BarChart :user="user" :company="company" />
    </div>
    <div>
      <div class="between" v-for="(score, i) in user" :key="i">
        <section class="num">
          <article :style="selectStandardColor(10 - score)">
            {{ right[i] }}
          </article>
        </section>
        <section class="num">
          <article :style="selectScoreColor(10 - score)">
            <span>{{ 10 - score }} </span> / 10
          </article>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import BarChart from "./BarChart.vue";

const leftResult = ["적극성", "자신감", "책임감", "개인성향", "수평사고"];
const rightResult = ["수동성", "신중함", "무심함", "조직성향", "위계사고"];

export default {
  name: "ResultData",
  data() {
    return {
      left: leftResult,
      right: rightResult,
    };
  },
  props: {
    user: {
      type: Number,
      required: true,
    },
    company: {
      type: Number,
      required: true,
    },
  },
  components: { BarChart },
  methods: {
    selectScoreColor(num) {
      let color = "color:#578339";
      if (num < 5) {
        color = "color:#000";
      }
      return color;
    },
    selectStandardColor(num) {
      let color = "color:#25BB6A";
      if (num < 5) {
        color = "color:#000";
      }
      return color;
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  p {
    font-size: 1rem;
  }
  h1 {
    font-size: 3rem;
    padding: 0.5rem;
  }
}
.chart {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .between {
    display: flex;
    .num {
      article {
        padding: 1.1rem;
        font-weight: bold;
        span {
          font-size: 1.2rem;
        }
      }
    }
  }
}

.chartBar {
  width: 20rem;
  padding: 0;
  position: relative;
  .line {
    width: 20rem;
    padding-top: 20px;
    position: absolute;
    #row {
      width: 20rem;
      border-top: 1px solid #ddd;
      margin-bottom: 48px;
    }
  }
  #col {
    position: absolute;
    width: 10rem;
    height: 15rem;
    border-right: 1px solid #ddd;
  }
}
</style>
