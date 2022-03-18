<template>
  <header-bar-vue />
  <search-bar-vue @search="search" @reset="reset" />
  <chart-pentagon-vue
    :user-result="userResult"
    :enterprise-result="enterpriseResult"
  />
  <tabs-select-vue @click-tab="clickNum" />
  <chart-bar-view-vue
    :user-result="userResult"
    :enterprise-result="enterpriseResult"
    :tab-num="tabNum"
  />
  <chart-doughnut-vue
    :user-result="userResult"
    :enterprise-result="enterpriseResult"
    :enterprise-name="enterpriseName"
  />
</template>

<script>
import { computed } from "vue";
import userData from "./data/user.json";
import enterpriseData from "./data/enterprise.json";
import HeaderBarVue from "./components/HeaderBar.vue";
import SearchBarVue from "./components/SearchBar.vue";
import ChartPentagonVue from "./components/ChartPentagon.vue";
import TabsSelectVue from "./components/TabsSelect.vue";
import ChartBarViewVue from "./components/ChartBarView.vue";
import ChartDoughnutVue from "./components/ChartDoughnut.vue";

export default {
  components: {
    HeaderBarVue,
    SearchBarVue,
    ChartPentagonVue,
    TabsSelectVue,
    ChartBarViewVue,
    ChartDoughnutVue,
  },
  data() {
    return {
      userResult: computed(() => Object.values(userData)),
      enterpriseResult: null,
      enterpriseName: null,
      tabNum: 0,
    };
  },
  methods: {
    search(enterprise) {
      this.enterpriseName = enterprise;
      const { result } = enterpriseData.find(
        (data) => data.enterprise === enterprise
      );
      this.enterpriseResult = Object.values(result || {});
    },
    reset() {
      this.enterpriseName = null;
      this.enterpriseResult = null;
    },
    clickNum(num) {
      // console.log(num);
      this.tabNum = num;
    },
  },
};
</script>
