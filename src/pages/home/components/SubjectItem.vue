<template>
  <div class="subject-item">
    <img v-bind:src="require(`@/assets/index/icons_subject/${subject}.png` )" />
    <span>{{ subject }}</span>
  </div>
</template>

<style lang="scss">
</style>

<script>
export default {
  props: {
    subject: {
      type: String
    }
  }
};
</script>

<style lang="scss">
.subject-item {
  @include flex(column);
  cursor: pointer;
  img {
    height: 40px;
    width: 40px;
  }
}
</style>
