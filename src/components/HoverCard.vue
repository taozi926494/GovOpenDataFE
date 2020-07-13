<template>
  <div class="hover-card">
    <slot />
  </div>
</template>

<style lang="scss">
.hover-card {
  position: relative;
  background-color: #fff;
  border-radius: 50px;
  transition: all 0.5s;

  &:after {
    content: "";
    border-radius: 5px;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: all 0.5s;
  }

  &:hover {
    transform: scale(1.01);
    &::after {
      opacity: 1;
    }
  }
}
</style>

<script>
export default {
  name: "HoverCard"
};
</script>