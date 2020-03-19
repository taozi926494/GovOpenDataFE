<template>
  <div class="statis-card">
    <img :src="iconSrc" />
    <div class="info">
      <div class="title">{{ title }}</div>
      <div>
        <span class="number">{{ value }}</span>
        {{ unit }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    value: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: ""
    },
    iconSrc: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss">
.statis-card {
  @include flex();
  @include shadow-card;
  background-color: $color-pure-white;
  
  width: 200px;
  height: 80px;
  cursor: pointer;
  img {
    margin-right: 20px;
    height: 40%;
  }
  .info {
    color: $color-font-gray;
    font-size: $size-font-small;
    
    text-align: left;
    font-family: "Microsoft YaHei" !important;
    .title {
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    .number {
      color: $color-main-blue;
      font-size: $size-font-bigger;
      margin-right: 2px;
    }
  }
}
</style>