<template>
  <div class="flex-col">
    <div class="flex justify-center">
      <circle-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    </div>
    <template v-if="!isLoading">
      <div class="flex flex-col lg:flex-row lg:justify-around lg:items-center">
        <div
          class="flex flex-col md:flex-row md:justify-between md:items-center"
        >
          <div class="flex flex-col items-center">
            <img
              :src="asset.image.large"
              :alt="asset.name"
              class="w-20 h-20 mr-5"
            />
            <h1 class="text-5xl">
              {{ asset.name }}
              <small class="sm:mr-2 text-gray-500 uppercase">{{
                asset.symbol
              }}</small>
            </h1>
          </div>

          <div class="my-10 flex flex-col">
            <ul>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 uppercase">Ranking</b>
                <span>#{{ asset.market_cap_rank }}</span>
              </li>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
                <span>{{ asset.market_data.current_price.usd | dollar }}</span>
              </li>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
                <span>{{ min | dollar }}</span>
              </li>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
                <span>{{ max | dollar }}</span>
              </li>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
                <span>{{ avg | dollar }}</span>
              </li>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
                <span>{{
                  asset.market_data.price_change_percentage_24h | percent
                }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Cambiar
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>

          <span class="text-xl"></span>
        </div>
      </div>
      <line-chart
        class="my-10"
        :colors="['#fc5353']"
        :min="(parseFloat(min) - 0.02).toFixed(2)"
        :max="parseFloat(max).toFixed(2) + 0.02"
        :data="data"
      />
      <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
      <table>
        <tr v-for="m in markets" :key="m.volume" class="border-b">
          <td class="flex items-center">
            <img
              :src="m.market.logo"
              :alt="m.market.name"
              class="w-11 pr-3 py-1"
            />
            <b>{{ m.market.name }}</b>
          </td>
          <td>{{ m.last | dollar }}</td>
          <td>{{ m.base }} / {{ m.target }}</td>
          <td>
            <ex-button v-if="!m.market.url" @custom-click="getUrl(m.market)">
              <slot>Obtener Link</slot>
            </ex-button>

            <a
              v-else
              class="hover:underline text-green-600 cursor-pointer"
              target="_blanck"
              :href="m.market.url"
              >{{ m.market.url }}</a
            >
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import api from "@/helpers/api";
import ExButton from "@/components/ExButton";

export default {
  data() {
    return {
      asset: {},
      prices: [],
      isLoading: false,
      data: {},
      markets: [],
    };
  },

  components: { ExButton },

  created() {
    this.isLoading = true;
    this.getCoin();
  },

  methods: {
    getCoin() {
      const id = this.$route.params.id;
      Promise.all([
        api.getAsset(id),
        api.getHistory24Hours(id),
        api.getMarkets(id),
      ])
        .then(([asset, history, markets]) => {
          this.asset = asset;
          this.prices = history.prices.map((e) => e.pop());
          const now = new Date();
          now.setHours(now.getHours() - 25);
          for (const price of this.prices) {
            now.setHours(now.getHours() + 1);
            this.data[`${now}`] = price;
          }
          this.markets = markets.tickers
            .filter((e) => e.base == "BTC")
            .slice(0, 10);
        })
        .finally(() => (this.isLoading = false));
    },
    getUrl(market) {
      return api
        .getExchangeURL(market.identifier)
        .then((resp) => this.$set(market, "url", resp.url));
    },
  },

  computed: {
    max() {
      return Math.max(...this.prices);
    },
    min() {
      return Math.min(...this.prices);
    },
    avg() {
      if (this.prices.length == 0) return 0;
      return this.prices.reduce((p, c) => p + c) / this.prices.length;
    },
  },
};
</script>
