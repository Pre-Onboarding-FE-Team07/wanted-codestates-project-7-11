<template>
  <section class="title">
    <p>M Y R E S U L T</p>
    <h1>나의 결과는?</h1>
  </section>
  <section class="chart">
    <div>
      <div class="between" v-for="(score, i) in userResult" :key="i">
        <div class="num">
          <article :style="selectScoreColor(score)">
            <span>{{ score }} </span> / 10
          </article>
        </div>
        <div class="num">
          <article :style="selectStandardColor(score)">
            {{ personality[i][0] }}
          </article>
        </div>
      </div>
    </div>
    <div class="chartBar">
      <div class="line">
        <p id="row" v-for="(score, i) in userResult" :key="i"></p>
      </div>
      <p id="col"></p>
      <ChartBar
        :user-result="userResult"
        :enterprise-result="enterpriseResult"
        :tab-num="tabNum"
      />
    </div>
    <div>
      <div class="between" v-for="(score, i) in userResult" :key="i">
        <div class="num">
          <article :style="selectStandardColor(10 - score)">
            {{ personality[i][1] }}
          </article>
        </div>
        <div class="num">
          <article :style="selectScoreColor(10 - score)">
            <span>{{ 10 - score }} </span> / 10
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ChartBar from "./ChartBar.vue";

const personality = [
  ["적극성", "수동성"],
  ["자신감", "신중함"],
  ["책임감", "무심함"],
  ["개인성향", "조직성향"],
  ["수평사고", "위계사고"],
];

export default {
  name: "ResultData",
  data() {
    return {
      personality,
    };
  },
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
  components: { ChartBar },
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
$bar-width: 14rem;
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
  font-size: 0.8rem;
  .between {
    display: flex;
    .num {
      margin: 0.9rem;
      article {
        font-weight: bold;
        span {
          font-size: 1rem;
        }
      }
    }
  }
}

.chartBar {
  width: $bar-width;
  position: relative;
  .line {
    width: $bar-width;
    padding-top: 20px;
    position: absolute;
    #row {
      width: $bar-width;
      border-top: 1px solid $color-gray;
      margin-bottom: 3rem;
      &:nth-child(3) {
        margin-bottom: 39px;
      }
      &:nth-child(4) {
        margin-bottom: 43px;
      }
    }
  }
  #col {
    /* position: absolute; */
    width: 7rem;
    height: 15rem;
    border-right: 1px solid $color-gray;
  }
}
@include mobile {
  .chart {
    flex-direction: column;
  }
}
</style>
