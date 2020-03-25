<template>
    <div class="subject-item">
      <img
        v-bind:src="require(`@/assets/index/icons_subject/${subject}.png` )"
      />
      {{ subject }}
    </div>
</template>

<style lang="scss">

</style>

<script>
export default {
  props: {
    subject: {
      type: String
    },
  }
}
</script>

<style lang="scss">
.subject-item {
    width: 110px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    margin: 30px;
    cursor: pointer;
    img {
        margin: 0 auto;
        margin-bottom: 15px;
        height: 40px;
        width: 40px;
    }
}
</style>
