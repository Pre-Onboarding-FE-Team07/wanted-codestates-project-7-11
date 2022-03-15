<template>
  <search-bar-vue />
  <chart-bar-view-vue :user="user" :company="company" />
</template>

<script>
import { computed } from "vue";
import userData from "./datas/user.json";
import enterpriseData from "./datas/enterprise.json";
import SearchBarVue from "./components/SearchBar.vue";
import ChartBarViewVue from "./components/ChartBarView.vue";

export default {
  components: {
    SearchBarVue,
    ChartBarViewVue,
  },
  data() {
    return {
      user: computed(() => Object.values(userData)),
      company: computed(() => Object.values(enterpriseData[0].result)),
    };
  },
};
</script>
