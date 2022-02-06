const url = "https://api.coingecko.com/api/v3/";

const getAssets = async () => {
  return fetch(
    `${url}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`
  )
    .then((resp) => resp.json())
    .then((data) => data);
};

export default {
  getAssets,
};
