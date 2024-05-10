export async function fetchCoins() {
  const json = await (
    await fetch("https://api.coinpaprika.com/v1/tickers")
  ).json();
  return json.slice(0, 15);
}

export async function fetchCoinIcon() {
  return await (
    await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=21&page=1"
    )
  ).json();
}

export async function fetchCoin(coinId: string) {
  return await (
    await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  ).json();
}
