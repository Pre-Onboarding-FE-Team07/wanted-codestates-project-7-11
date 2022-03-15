<template>
  <search-bar-vue />
  <chart-pentagon-vue
    :user-result="userResult"
    :enterprise-result="enterpriseResult"
  />
  <chart-bar-view-vue
    :user-result="userResult"
    :enterprise-result="enterpriseResult"
  />
  <chart-doughnut-vue
    :user-result="userResult"
    :enterprise-result="enterpriseResult"
    :enterprise-name="enterpriseName"
  />
</template>

<script>
import { computed } from "vue";
import userData from "./datas/user.json";
import enterpriseData from "./datas/enterprise.json";
import SearchBarVue from "./components/SearchBar.vue";
import ChartPentagonVue from "./components/ChartPentagon.vue";
import ChartBarViewVue from "./components/ChartBarView.vue";
import ChartDoughnutVue from "./components/ChartDoughnut.vue";

export default {
  components: {
    SearchBarVue,
    ChartPentagonVue,
    ChartBarViewVue,
    ChartDoughnutVue,
  },
  data() {
    return {
      userResult: computed(() => Object.values(userData)),
      enterpriseResult: computed(() => Object.values(enterpriseData[0].result)),
      enterpriseName: enterpriseData[0].enterprise,
    };
  },
};
</script>
