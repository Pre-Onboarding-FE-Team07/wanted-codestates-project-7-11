<template>
  <header>
    <div class="title-wrap">
      <div class="arrow-wrap">
        <img src="../assets/back-button.png" />
      </div>
      <h1 class="title">진단결과</h1>
    </div>
    <button class="reload" @click="reload">다시 진단하기</button>
  </header>
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
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 72px;
  padding: 0 16px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid lightgray;
}

.title-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 13rem;
  height: 2rem;
}

.title {
  width: 13rem;
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
  width: 1.5rem;
  height: 1.5rem;
}

.reload {
  width: 7rem;
  height: 22px;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  text-align: right;
  font-style: normal;
  color: #6e3cf9;
  cursor: pointer;
  border: none;
  background: none;
}
</style>
