<template>
  <search-var-vue />
  <result-vue :user="user" :company="company" />
</template>

<script>
import { computed } from "vue";
import userData from "./datas/user.json";
import enterpriseData from "./datas/enterprise.json";
import SearchVarVue from "./components/SearchVar.vue";
import ResultVue from "./components/Result.vue";

export default {
  components: {
    SearchVarVue,
    ResultVue,
  },
  data() {
    return {
      user: computed(() => Object.values(userData)),
      company: computed(() => Object.values(enterpriseData[0].result)),
    };
  },
};
</script>
