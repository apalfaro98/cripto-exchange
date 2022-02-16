const url = "https://api.coingecko.com/api/v3/";

const getAssets = async () => {
  return fetch(
    `${url}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`
  ).then((resp) => resp.json());
};

const getAsset = async (id) => {
  return fetch(`${url}coins/${id}?localization=false`).then((resp) =>
    resp.json()
  );
};

const getHistory24Hours = async (id) => {
  return fetch(
    `${url}coins/${id}/market_chart?vs_currency=usd&days=1&interval=hourly`
  ).then((resp) => resp.json());
};

const getMarkets = async (id) => {
  return fetch(
    `${url}coins/${id}/tickers?include_exchange_logo=true&page=1`
  ).then((resp) => resp.json());
};

const getExchangeURL = async (id) => {
  return fetch(`${url}exchanges/${id}`).then((resp) => resp.json());
};

export default {
  getAssets,
  getAsset,
  getHistory24Hours,
  getMarkets,
  getExchangeURL,
};
