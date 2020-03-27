<template>
  <el-popover placement="bottom" width="200" trigger="click" class="province-item">
    <div class="gov-list">
      <a
        v-for="gov in governments"
        :key="gov.gov_id"
        class="gov-link"
        @click="govClick({government: gov})"
      >{{ gov.region }}</a>
    </div>
    <div slot="reference" class="province">
      <img v-bind:src="require(`@/assets/index/icons_region/${province}.png`)" />
      {{ province }}
    </div>
  </el-popover>
</template>

<script>
export default {
  props: {
    province: {
      type: String
    },
    governments: {
      type: Array
    }
  },
  methods: {
    govClick(gov) {
      this.$emit("gov-click", gov);
    }
  }
};
</script>

<style lang="scss">
.province-item {
  .province {
    @include flex(column);
  }

  img {
    width: 70px;
    height: 70px;
  }
}

.gov-list {
  @include flex(row, flex-start);
}
.gov-link {
  cursor: pointer;
  margin-left: 10px;
  height: 25px;
  padding-bottom: 3px;
  &:hover {
    font-weight: bolder;
    border-bottom: 2px solid $color-main-blue;
  }
}
</style>