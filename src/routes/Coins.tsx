import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid rgba(299, 299, 299, 0.2);
  border-bottom: transparent;
  border-radius: 10px 10px 0px 0px;
  margin: 100px 70px;
  margin-bottom: 0;
  height: 680px;
  background-color: rgba(299, 299, 299, 0.08);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 30px;
  margin-bottom: 0;
  border-bottom: 2px solid rgba(299, 299, 299, 0.1);
  padding-bottom: 25px;
`;

const SquareIcon = styled.img`
  width: 30px;
  margin-right: 13px;
`;

const Title = styled.h1`
  font-size: 25px;
  font-family: "Baloo Bhaijaan 2", sans-serif;
`;

const Nav = styled.div``;

const List = styled.ul`
  display: flex;
  gap: 23px;
  margin-left: 35px;
  font-size: 14px;
  opacity: 0.8;
  li {
    cursor: pointer;
  }
`;

const Main = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  margin: 0;
  padding: 30px;
  height: 700px;
`;

const LoadingText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  width: 100%;
  font-size: 40px;
`;

const Loader = styled.div`
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: white;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
  @keyframes l3 {
    to {
      transform: rotate(1turn);
    }
  }
`;

interface ICoins {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoins[]>("all coins", fetchCoins);

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@400..800&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Container>
        <Header>
          <SquareIcon src="./square.png" alt="icon" />
          <Title>Crypto Tracker</Title>
          <Nav>
            <List>
              <li>Buy Crypto</li>
              <li>Cryptocurrencies</li>
              <li>Pricing</li>
            </List>
          </Nav>
        </Header>
        <Main>
          {isLoading ? (
            <LoadingText>
              <Loader></Loader>
            </LoadingText>
          ) : (
            <ul>
              {data?.map((coin) => (
                <li key={coin.id}>
                  {coin.rank}
                  {coin.name}
                  {coin.priceUsd}
                </li>
              ))}
            </ul>
          )}
        </Main>
      </Container>
    </>
  );
}

export default Coins;
