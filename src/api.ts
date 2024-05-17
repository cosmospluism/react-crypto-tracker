const BASE_URL = `https://api.coingecko.com/api/v3/coins/markets`;

export async function fetchCoins() {
  return await fetch(
    `${BASE_URL}?vs_currency=usd&order=market_cap_desc&per_page=15`
  )
    .then((response) => response.json())
    .catch(async (err) => {
      console.log(err);
      return await fetch("http://localhost:3000/data/sample_coins.json").then(
        (res) => res.json()
      );
    });
}

// export async function fetchCoin(coinId: string) {
//   const response = await fetch(`${BASE_URL}?ids=${coinId}&vs_currency=usd`);
//   const json = response.json();
//   console.log(json);
//   return json;

//   // const json = await fetch(`${BASE_URL}?ids=${coinId}&vs_currency=usd`).then(
//   //   (res) =>
//   //     res
//   //       .json()
//   //       .then((json) => {
//   //         return json[0];
//   //       })
//   //       .catch(async (err) => {
//   //         console.log(err);
//   //         return await fetch(
//   //           "http://localhost:3000/data/sample_coin.json"
//   //         ).then((res) => res.json());
//   //       })
//   // );
// }

export async function fetchCoin(coinId: string) {
  const json = await (
    await fetch(`${BASE_URL}?ids=${coinId}&vs_currency=usd`)
  ).json();
  console.log(json);

  return json[0];
}

export async function fetchCoinOhlc(coinId: string, coinSymbol: string) {
  return await (
    await fetch(
      `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinSymbol}-${coinId}`
    )
  ).json();
}
