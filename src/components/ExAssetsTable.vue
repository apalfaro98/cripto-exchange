<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th>
          <span
            class="underline cursor-pointer"
            :class="orderAsc ? 'up' : 'down'"
            @click="invertOrder()"
            >Ranking</span
          >
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <input
            class="bg-gray-100 focus:outline-none border-b border-gray-400 py-2 px-4 block w-full appearance-none leading-normal"
            id="filter"
            placeholder="Buscar..."
            type="text"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="a in filteredAssets"
        :key="a.id"
        class="border-b border-gray-200 hover:bg-gray-100"
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

  data() {
    return {
      filter: "",
      orderAsc: true,
    };
  },

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
    invertOrder() {
      this.orderAsc = !this.orderAsc;
    },
  },

  computed: {
    filteredAssets() {
      const filt = this.assets.filter(
        (e) =>
          e.name.toLowerCase().includes(this.filter.toLowerCase()) ||
          e.symbol.toLowerCase().includes(this.filter.toLowerCase())
      );
      return this.orderAsc ? filt : filt.reverse();
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
