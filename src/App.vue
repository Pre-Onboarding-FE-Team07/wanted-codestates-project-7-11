<template>
  <search-bar-vue />
  <chart-pentagon-vue :user-result="userData" :enterprise="enterpriseData[0]" />
  <chart-bar-view-vue :user="user" :company="company" />
</template>

<script>
import { computed } from "vue";
import userData from "./datas/user.json";
import enterpriseData from "./datas/enterprise.json";
import SearchBarVue from "./components/SearchBar.vue";
import ChartPentagonVue from "./components/ChartPentagon.vue";
import ChartBarViewVue from "./components/ChartBarView.vue";

export default {
  components: {
    SearchBarVue,
    ChartPentagonVue,
    ChartBarViewVue,
  },
  data() {
    return {
      user: computed(() => Object.values(userData)),
      userData: userData,
      company: computed(() => Object.values(enterpriseData[0].result)),
      enterpriseData: enterpriseData,
    };
  },
};
</script>
