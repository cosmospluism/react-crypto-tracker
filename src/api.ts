export async function fetchCoins() {
  const json = await (await fetch("https://api.coincap.io/v2/assets")).json();
  return json.data.slice(0, 10);
}
