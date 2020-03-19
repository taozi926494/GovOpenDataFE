<template>
  <div class="field-table">
    <!-- 表头模块 -->
    <div class="field-table-tr field-table-th">
      <div
        class="field-table-td"
        v-for="(title, titleIndex) in data[0]"
        :key="titleIndex"
      >{{ title }}</div>
    </div>
    <!-- 表身模块 -->
    <div
      class="field-table-tr"
      v-for="(fieldRow, fieldRowIndex) in data.slice(1)"
      :key="fieldRowIndex"
    >
      <div
        class="field-table-td"
        v-for="(field, fieldIndex) in fieldRow"
        :key="fieldIndex"
      >{{ field }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Array }
  }
};
</script>

<style lang="scss">
.field-table {
  @include flex(column);
  $table-boder: 1px solid #a6caf3;
  width: 100%;
  &-tr {
    width: 100%;
    @include flex(row);
    border-top: $table-boder;

    &:last-child {
      border-bottom: $table-boder;
    }
  }
  &-th {
    background-color: #f5f9fd;
  }
  &-td {
    flex: 1;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    border-left: $table-boder;
    white-space: nowrap;
    font-size: $size-font-mini;
    text-overflow: ellipsis;

    &:last-child {
      border-right: $table-boder;
    }
  }
}
</style>