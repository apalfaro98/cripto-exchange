<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th>
          <span>Ranking</span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block"></td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="a in assets"
        :key="a.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
      >
        <td>
          <img :src="a.image" :alt="a.name" class="w-6" />
        </td>
        <td>{{ a.market_cap_rank }}</td>
        <td>
          <b>
            <router-link
              class="hover:underline text-green-500"
              :to="{ name: 'coin-detail', params: { id: a.id } }"
            >
              {{ a.name }}
            </router-link>
            <small class="ml-1 text-gray-500 uppercase">
              {{ a.symbol }}
            </small>
          </b>
        </td>
        <td>{{ a.current_price | dollar }}</td>
        <td>{{ a.market_cap | dollar }}</td>
        <td
          :class="
            a.price_change_percentage_24h < 0
              ? 'text-red-500'
              : 'text-green-500'
          "
          class="font-bold"
        >
          {{ a.price_change_percentage_24h | percent }}
        </td>
        <td class="sm:block">
          <ex-button @custom-click="getCoin(a.id)">
            <span>Detalles</span>
          </ex-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import ExButton from "./ExButton.vue";

export default {
  name: "ExAssetsTable",

  components: { ExButton },

  props: {
    assets: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    getCoin(id) {
      this.$router.push({ name: "coin-detail", params: { id } });
    },
  },
};
</script>

<style scoped>
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

img {
  display: block;
  min-width: 30px;
}

@media (min-width: 320px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
