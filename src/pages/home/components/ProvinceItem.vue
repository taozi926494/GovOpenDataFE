<template>
  <el-popover placement="bottom" width="200" trigger="click" class="province-item">
    <div class="gov-list">
      <div class="sub_region" v-for="gov in governments" :key="gov.gov_id">
        <a class="index-gov-link" @click="govClick({government: gov})">{{ gov.region }}</a>
      </div>
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
      this.$emit('gov-click', gov)
    }
  }
};
</script>

<style lang="scss">
.province-item {
  .gov-list {
    @include flex();
  }
  .province {
    @include flex(column);
  }
}
</style>