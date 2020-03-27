<template>
  <div id="layout">
    <Header />
    <router-view id="container"></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss">
#layout {
  @include flex(column, flex-start);
  width: 100%;
  height: 100%;
  overflow: auto;
  #container {
    width: 100%;
    flex: 1;
  }
}
</style>

