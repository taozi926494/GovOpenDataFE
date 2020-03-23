<template>
  <div class="news-item">
    <div class="news-item-title" >
      <a :href="news.url" target="_blank">{{ news.title }}</a>
    </div>
    <div class="news-item-abstract">
      <span>{{ news.abstract }}</span>
    </div>
    <div class="news-item-info">
      来源：
      <span>{{ news.origin }}</span>
      时间：
      <span>{{ news.time }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    news: { type: Object}
  },
  data() {
    return {
    }
  },
  methods: {
  }

};
</script>

<style lang="scss">
.news-item {
  background-color: white;
  margin-bottom: 10px;
  padding: 10px 20px;
  border-bottom: 1px solid #e4ebf0;
  @include shadow-card;
  &-title {
    color: $color-font-gray;
    cursor: pointer;
    text-align: left;
    font-weight: 700;
    margin: 10px 0;
    a {
      text-decoration: none;
      color: #02070e;
    }
  }
  &-info, &-abstract {
    font-size: 14px;
    color: $color-font-gray;
    line-height: 15px;
    overflow: hidden;
    margin-bottom: 10px;
    display: flex;
    span {
      color: #5d7a9e;
      padding-right: 40px;
      text-align: left;
    }
  }
}
</style>