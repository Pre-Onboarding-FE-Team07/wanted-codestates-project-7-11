<template>
  <section>
    <div class="row">
      <span class="row left-item"
        >검색 결과
        <RightChevronIcon />
      </span>
      <span class="row right-item" v-if="query"
        >{{ query }}
        <ResetIcon @click="reset" />
      </span>
    </div>
    <input
      type="text"
      v-model.trim="text"
      placeholder="기업명을 검색하세요."
      @input="change"
      @focus="focus"
      @blur="blur"
      @keypress.enter="submit"
    />
    <div class="suggestions" v-if="(focused && suggestions.length) || !matched">
      <ul v-if="matched">
        <li v-for="(suggestion, index) in suggestions" :key="index">
          {{ suggestion }}
        </li>
      </ul>
      <span v-else>해당 기업 정보가 없습니다.</span>
    </div>
  </section>
</template>

<script>
import enterprises from "../data/enterprise.json";
import RightChevronIcon from "../assets/right-chevron.svg";
import ResetIcon from "../assets/reset.svg";

function getSuggestions(keyword) {
  const query = new RegExp(keyword.split("").join(".*?"), "gi");
  return enterprises
    .map(({ enterprise }) => enterprise)
    .filter((enterprise) => query.test(enterprise));
}

export default {
  name: "SearchBar",
  emits: ["search", "reset"],
  components: { RightChevronIcon, ResetIcon },
  data() {
    return {
      text: "",
      query: "",
      suggestions: [],
      focused: false,
      matched: true,
    };
  },
  methods: {
    change({ target: { value } }) {
      this.matched = true;
      this.suggestions = value ? getSuggestions(value.trim()) : [];
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
        this.$emit("search", suggestion);
      } else {
        this.matched = false;
      }
    },
    reset() {
      this.$emit("reset");
      this.query = "";
      this.text = "";
      this.matched = true;
      this.suggestions = [];
    },
  },
};
</script>

<style lang="scss">
section {
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 20px;
  position: relative;

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #727272;
    gap: 8px;
    white-space: nowrap;

    .left-item {
      font-size: 16px;
      font-weight: bold;
    }

    .right-item {
      font-size: 14px;
      text-overflow: ellipsis;

      svg {
        cursor: pointer;
      }
    }
  }

  input {
    padding: 14px 16px;
    font-size: 14px;
    border: 1px solid #f2f2f2;
    background-color: #f8f8f8;
    border-radius: 4px;
    outline: none;

    &::placeholder {
      color: #b2b2b2;
    }
  }

  .suggestions {
    position: absolute;
    box-sizing: border-box;
    max-height: 200px;
    overflow-y: auto;
    top: 100px;
    left: 16px;
    right: 16px;
    padding: 8px;
    border: 1px solid #f2f2f2;
    border-radius: 4px;

    li {
      border: 4px;
      padding: 8px;
      cursor: pointer;

      &:hover {
        background-color: rgb(0 0 0 / 5%);
      }
    }
  }
}
</style>
