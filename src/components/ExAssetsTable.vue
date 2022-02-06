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
          <img :src="a.image" :alt="a.name" width="100px" height="100px" />
        </td>
        <td>{{ a.market_cap_rank }}</td>
        <td>
          <b>{{ a.name }}</b>
        </td>
        <td>{{ a.current_price }}</td>
        <td>{{ a.market_cap }}</td>
        <td>{{ a.price_change_percentage_24h }}</td>
        <td class="hidden sm:block"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "ExAssetsTable",

  props: {
    assets: {
      type: Array,
      default: () => [],
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
  min-width: 70px;
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
