const BASE_URL = `https://api.coingecko.com/api/v3/coins/markets`;

export function fetchCoins() {
  return fetch(`${BASE_URL}?vs_currency=usd&order=market_cap_desc&per_page=15`)
    .then((response) => response.json())
    .catch((err) => {
      console.log(err.message);
      return fetch("public/data/sample_coins.json").then((res) => res.json());
    });
}

// export async function fetchCoins() {
//   return await (
//     await fetch(
//       `${BASE_URL}?vs_currency=usd&order=market_cap_desc&per_page=15&page=1?x_cg_pro_api_key=CG-Rpj5KTXhfv5xEXw7tZRXPiSu`
//     )
//   ).json();
// }

export async function fetchCoin(coinId: string) {
  const json = await (
    await fetch(`${BASE_URL}?ids=${coinId}&vs_currency=usd`)
  ).json();
  return json[0];
}

export async function fetchCoinOhlc(coinId: string, coinSymbol: string) {
  return await (
    await fetch(
      `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinSymbol}-${coinId}`
    )
  ).json();
}
