<template>
  <!-- <a class="hover-box" :href="news.url" target="_blank">
    <div class="hover-box-inner">
     
    </div>
  </a>-->
  <HoverCard>
    <a class="news-item" :href="news.url" target="_blank">
      <div class="news-item-title">
        <h4>{{ news.title }}</h4>
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
    </a>
  </HoverCard>
</template>

<script>
import HoverCard from "@/components/HoverCard";
export default {
  props: {
    news: { type: Object }
  },
  components: {
    HoverCard
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss">
.news-item {
  // @include shadow-card;
  display: block;
  background-color: white;
  padding: 10px 20px;

  &-title {
    color: $color-font-gray;
    text-align: left;
    font-weight: 700;
    margin: 10px 0;
    h4 {
      margin: 0;
    }
  }
  &-info,
  &-abstract {
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