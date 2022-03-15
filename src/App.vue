<template>
  <header-bar-vue />
  <search-bar-vue />
  <chart-pentagon-vue
    :user-result="userResult"
    :enterprise-result="enterpriseResult"
  />
  <tabs-select-vue />
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
    };
  },
};
</script>
