// https://api.coincap.io/v2/assets

export async function fetchCoins() {
  return await (
    await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1"
    )
  ).json();
  // json.data.slice(0, 15)
}

export async function fetchCoin(coinId: string) {
  return await (
    await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  ).json();
}
