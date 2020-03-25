<template>
    <div class="meta-item">
        <div class="meta-item-title">数据来源</div>
        <div class="meta-item-value">{{ data.department }}</div>
        <div class="meta-item-title">更新时间</div>
        <div class="meta-item-value">{{ data.update_date | formatEnTime }}</div>
        <div class="meta-item-title">资源类别</div>
        <div class="meta-item-value">{{ data.subject_origin }}</div>
        <div class="meta-item-title">下载次数</div>
        <div class="meta-item-value">{{ data.download_num }}</div>
    </div>

</template>

<script>
import { formatEnTime } from "@/utils/toolkit";
export default {
    props: {
        data: {
            type: Object
        }
    },
    filters: {
        formatEnTime
    }
}
</script>

<style lang="scss">
$table-boder: 1px solid #a6caf3;
.meta-item{
    width: 100%;
    @include flex(row);
    border-top: $table-boder;
    border-bottom: $table-boder;
    border-left: $table-boder;
    &-title, &-value{
        width: 100%;
        flex: 1;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        border-right: $table-boder;
        white-space: nowrap;
        font-size: $size-font-mini;
        text-overflow: ellipsis;
    }
    &-title{
        background-color: #f5f9fd;
    }
}
</style>