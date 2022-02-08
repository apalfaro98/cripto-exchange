<template>
  <div class="flex-col">
    <template v-if="asset.id">
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
    </template>
  </div>
</template>

<script>
import api from "@/helpers/api";

export default {
  data() {
    return {
      asset: {},
      prices: [],
    };
  },

  created() {
    this.getCoin();
    this.getHistory();
  },

  methods: {
    getCoin() {
      const id = this.$route.params.id;
      api.getAsset(id).then((data) => (this.asset = data));
    },
    getHistory() {
      const id = this.$route.params.id;
      api.getHistory24Hours(id).then((data) => {
        this.prices = data.prices.map((e) => e.pop());
      });
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
      return this.prices.reduce((p, c) => p + c) / this.prices.length;
    },
  },
};
</script>
