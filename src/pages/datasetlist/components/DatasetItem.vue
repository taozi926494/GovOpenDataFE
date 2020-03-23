<template>
  <div class="data-item">
    <div class="data-item-title">{{ dataset.name }}</div>
    <div class="data-base-info">
      来源：
      <span>{{ dataset.department }}</span>
      更新时间：
      <span>{{ dataset.update_date | formatEnTime }}</span>
      主题分类：
      <span>信息产业</span>
    </div>
    <div class="data-base-info">
      <i class="el-icon-download" />
      <span class="number">{{ dataset.download_num}}</span>
      <i class="el-icon-view" />
      <span class="number">{{ dataset.view_num }}</span>
    </div>
  </div>
</template>

<script>
import { formatEnTime } from "@/utils/toolkit";
export default {
  props: {
    dataset: { type: Object }
  },
  filters: {
    formatEnTime
  }
};
</script>

<style lang="scss">
.data-item {
  margin-bottom: 10px;
  padding: 10px 20px;
  border-bottom: 1px solid #e4ebf0;
  &:first-child {
    border-top: 1px solid #e4ebf0;
  }
  &-title {
    color: #45668f;
    cursor: pointer;
    text-align: left;
    font-weight: 700;
    margin: 10px 0;
  }
  .data-base-info {
    font-size: 14px;
    color: #aab8ca;
    line-height: 15px;
    overflow: hidden;
    margin-bottom: 10px;
    display: flex;
    span {
      color: #5d7a9e;
      padding-right: 40px;
    }
    i {
      margin-right: 4px;
    }
    span.number {
      padding-right: 12px;
    }
  }
}
</style>