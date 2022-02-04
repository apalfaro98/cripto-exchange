<template>
  <main>
    <ex-header />
    <ex-assets-table />
  </main>
</template>

<script>
import ExHeader from "@/components/ExHeader";
import ExAssetsTable from "./components/ExAssetsTable.vue";

export default {
  name: "app",
  components: { ExHeader, ExAssetsTable },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
