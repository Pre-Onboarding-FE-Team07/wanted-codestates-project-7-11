<template>
  <section>
    <div class="tab-container">
      <button
        v-for="(item, index) in tabItems"
        @click="onEmit(index)"
        :key="index"
        :class="{ active: selectedTab === index }"
      >
        <img :src="item.img" />
        <span class="tab-title">{{ item.title }}</span>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  components: {},

  emits: ["clickTab"],
  methods: {
    onEmit(id) {
      this.selectedTab = id;
      this.$emit("clickTab", this.selectedTab);
    },
  },
  mounted() {},

  data() {
    return {
      selectedTab: 0,
      tabItems: [
        {
          title: "모두",
          img: require("../assets/all.png"),
        },
        {
          title: "본인",
          img: require("../assets/me.png"),
        },
        {
          title: "회사",
          img: require("../assets/company.png"),
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px 16px;
  box-sizing: border-box;
  background: #fff;
}

.tab-container {
  display: flex;
  width: 100%;
  height: 45px;
  background: #f8f8f8;
  border: 1px solid #f2f2f2;
  box-sizing: border-box;
  border-radius: 4px;
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 14px 16px;
  box-sizing: border-box;
  background: #f2f2f2;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &.active {
    background-color: white;
    color: #121212;
  }
}

img {
  width: 14px;
  margin-right: 6px;
}

.tab-title {
  font-family: "Noto Sans";
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: #727272;
}
</style>
