<template>
  <div>
    <span>검색 결과 ＞</span>
    <span>{{ query }}</span>
  </div>
  <input
    placeholder="기업명을 검색하세요."
    @input="change"
    @blur="blur"
    @keyup.enter="submit"
  />
  <ul>
    <li v-for="(suggestion, index) in suggestions" :key="index">
      {{ suggestion }}
    </li>
  </ul>
</template>

<script>
import enterprises from "../data/enterprise.json";

export default {
  name: "SearchBar",
  data() {
    return {
      query: "",
      suggestions: [],
    };
  },
  methods: {
    change({ target: { value } }) {
      const query = new RegExp(value.split("").join(".*?"), "gi");
      this.suggestions = value
        ? enterprises
            .map(({ enterprise }) => enterprise)
            .filter((enterprise) => query.test(enterprise))
        : [];
    },
    blur() {
      this.suggestions = [];
    },
    submit({ target: { value } }) {
      this.query = value;
    },
  },
};
</script>
