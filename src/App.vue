<template>
  <search-bar-vue />
  <my-result-vue :user="user" :company="company" />
</template>

<script>
import { computed } from "vue";
import userData from "./datas/user.json";
import enterpriseData from "./datas/enterprise.json";
import SearchBarVue from "./components/SearchBar.vue";
import MyResultVue from "./components/MyResult.vue";

export default {
  components: {
    SearchBarVue,
    MyResultVue,
  },
  data() {
    return {
      user: computed(() => Object.values(userData)),
      company: computed(() => Object.values(enterpriseData[0].result)),
    };
  },
};
</script>
