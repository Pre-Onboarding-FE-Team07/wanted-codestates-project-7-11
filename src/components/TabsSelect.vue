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
  padding: 20px 16px;
  width: 360px;
  height: 84px;
  top: 381px;
  background: #ffffff;
}

.tab-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 328px;
  height: 45px;
  left: 16px;
  top: 20px;
  background: #f8f8f8;
  border: 1px solid #f2f2f2;
  box-sizing: border-box;
}

button {
  display: flex;
  width: 109px;
  height: 45px;
  border-radius: 4px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14px 16px 14px 16px;
  background: #f2f2f2;
  border: none;
  flex-grow: 1;
}

img {
  width: 14px;
}

button {
  cursor: pointer;
  .active {
    background-color: white;
    color: #121212;
  }
}

.tab-title {
  width: 30px;
  height: 17px;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 17px;
  order: 1;
  margin: 0 6px;
}
</style>
