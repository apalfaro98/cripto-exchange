<template>
  <div>
    <ex-assets-table :assets="assets" />
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
    };
  },

  created() {
    api.getAssets().then((assets) => (this.assets = assets));
  },
};
</script>
