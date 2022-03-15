<template>
  <section>
    <div class="top-row">
      <div class="top-row__left">
        <span>검색 결과</span>
        <RightChevronIcon />
      </div>
      <div class="top-row__right" v-if="query">
        <span>{{ query }}</span>
        <ResetIcon @click="reset" />
      </div>
    </div>
    <input
      type="text"
      v-model.trim="text"
      placeholder="기업명을 검색하세요."
      ref="input"
      @input="change"
      @focus="focus"
      @blur="blur"
      @keypress.enter="submit"
      @keydown.up="up"
      @keydown.down="down"
    />
    <div class="suggestions" v-if="(focused && suggestions.length) || !matched">
      <ul
        v-if="matched"
        ref="suggestions"
        @mouseover="mouseover"
        :class="{ keyboardMode }"
      >
        <li
          v-for="(suggestion, index) in suggestions"
          :key="index"
          @mousemove="keyboardMode = false"
          @mousedown="select"
          :class="{ selected: selectedIndex === index }"
          :data-index="index"
        >
          {{ suggestion }}
        </li>
      </ul>
      <span v-else>해당 기업 정보가 없습니다.</span>
    </div>
  </section>
</template>

<script>
import { fuzzyMatcher } from "../utils/search";
import enterprises from "../datas/enterprise.json";
import RightChevronIcon from "../assets/right-chevron.svg";
import ResetIcon from "../assets/reset.svg";

function getSuggestions(keyword) {
  const query = fuzzyMatcher(keyword);
  return enterprises
    .map(({ enterprise }) => enterprise)
    .filter((enterprise) => query.test(enterprise));
}

function selectSuggestion(suggestion) {
  this.text = suggestion;
  this.selectedIndex = -1;
  if (this.query === suggestion) return;
  this.$emit("search", suggestion);
  this.query = suggestion;
  this.suggestions = [suggestion];
}

function scrollIntoView() {
  this.$refs.suggestions.children[this.selectedIndex].scrollIntoView({
    block: "center",
    inline: "nearest",
  });
}

function controlKeyboard(event, type) {
  event.preventDefault();
  if (event.isComposing) return;
  this.keyboardMode = true;
  if (type === "up") {
    if (this.selectedIndex <= 0) return;
    this.selectedIndex -= 1;
  } else if (type === "down") {
    if (this.selectedIndex >= this.suggestions.length - 1) return;
    this.selectedIndex += 1;
  }
  scrollIntoView.call(this);
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
      keyboardMode: false,
      selectedIndex: -1,
    };
  },
  methods: {
    change({ target: { value } }) {
      this.matched = true;
      this.selectedIndex = -1;
      this.suggestions = value ? getSuggestions(value.trim()) : [];
    },
    focus() {
      this.focused = true;
    },
    blur() {
      this.focused = false;
    },
    submit() {
      const suggestion =
        this.selectedIndex >= 0
          ? this.suggestions[this.selectedIndex]
          : this.suggestions[0];
      this.selectedIndex = -1;

      if (suggestion) {
        selectSuggestion.call(this, suggestion);
        this.$refs.input.blur();
      } else {
        this.matched = false;
      }
    },
    select({ target: { textContent: suggestion } }) {
      selectSuggestion.call(this, suggestion);
    },
    up(event) {
      controlKeyboard.call(this, event, "up");
    },
    down(event) {
      controlKeyboard.call(this, event, "down");
    },
    mouseover({ target }) {
      if (this.keyboardMode) return;
      this.selectedIndex = +target.dataset.index;
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
@mixin flex-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

@mixin ellipsis {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

section {
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 20px;
  position: relative;

  .top-row {
    @include flex-row;
    justify-content: space-between;
    color: #727272;
    position: relative;

    &__left {
      white-space: nowrap;
      @include flex-row;
      font-size: 16px;
      font-weight: bold;
    }

    &__right {
      @include flex-row;
      font-size: 14px;
      overflow: hidden;
      margin-right: 20px;

      > span {
        @include ellipsis;
      }

      > svg {
        position: absolute;
        right: 0;
        cursor: pointer;
      }
    }
  }

  input {
    padding: 14px 16px;
    font-size: 14px;
    color: #121212;
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
    font-size: 14px;
    color: #121212;

    li {
      border: 4px;
      padding: 4px;
      @include ellipsis;
      cursor: pointer;

      &.selected {
        background-color: rgb(0 0 0 / 5%);
      }
    }
  }
}
</style>
