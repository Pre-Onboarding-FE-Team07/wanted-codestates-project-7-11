<template>
  <div>
    <span>검색 결과 ＞</span>
    <span>{{ query }}</span>
  </div>
  <input
    type="text"
    v-model="text"
    placeholder="기업명을 검색하세요."
    @input="change"
    @focus="focus"
    @blur="blur"
    @keypress.enter="submit"
  />
  <div v-if="focused">
    <ul>
      <li v-for="(suggestion, index) in suggestions" :key="index">
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>

<script>
import enterprises from "../data/enterprise.json";

function getSuggestions(keyword) {
  const query = new RegExp(keyword.split("").join(".*?"), "gi");
  return enterprises
    .map(({ enterprise }) => enterprise)
    .filter((enterprise) => query.test(enterprise));
}

export default {
  name: "SearchBar",
  data() {
    return {
      text: "",
      query: "",
      suggestions: [],
      focused: false,
    };
  },
  methods: {
    change({ target: { value } }) {
      this.suggestions = value ? getSuggestions(value) : [];
    },
    focus() {
      this.focused = true;
    },
    blur() {
      this.focused = false;
    },
    submit() {
      const suggestion = this.suggestions[0];
      if (suggestion) {
        this.query = suggestion;
        this.text = suggestion;
      }
    },
  },
};
</script>
