<template>
  <div>
    <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    <ex-assets-table v-if="!isLoading" :assets="assets" />
  </div>
</template>

<script>
import ExAssetsTable from "@/components/ExAssetsTable";
import api from "@/helpers/api";

export default {
  name: "HomePage",
  components: { ExAssetsTable },

  data() {
    return {
      assets: [],
      isLoading: false,
    };
  },

  created() {
    this.isLoading = true;
    api
      .getAssets()
      .then((assets) => (this.assets = assets))
      .finally(() => (this.isLoading = false));
  },
};
</script>
