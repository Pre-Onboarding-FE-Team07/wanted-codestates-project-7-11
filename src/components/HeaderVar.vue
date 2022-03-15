<template>
  <div class="header">
    <div class="title-wrap">
      <div class="arrow-wrap">
        <img src="../assets/back-button.png" />
      </div>
      <h1 class="title">진단결과</h1>
    </div>
    <p class="reload" @click="reload">다시 진단하기</p>
  </div>
</template>

<script>
export default {
  method: {
    reload() {
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  width: 360px;
  height: 72px;
  padding: 16px;
  top: 0;
  background: #ffffff;
  border: 1px solid lightgray;
}

.title-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 220px;
  height: 34px;
}

.title {
  width: 100px;
  height: 34px;
  font-weight: 700;
  font-size: 24px;
  line-height: 140%;
  color: #121212;
  margin: 0px 12px;
}

.arrow-wrap {
  margin: 5px;
}

img {
  width: 28px;
  height: 28px;
}

.reload {
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  text-align: right;
  font-style: normal;
  color: #6e3cf9;
  cursor: pointer;
}
</style>
