import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Link } from "react-router-dom";

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
  overflow: scroll;
  background-color: rgba(0, 0, 0, 0.3);
  margin: 0;
  height: 700px;
`;

const LoadingText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
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

const Table = styled.table`
  width: 100%;
  text-align: center;
  line-height: 50px;
  td {
    border-top: 3px solid rgba(0, 0, 0, 0.2);
    padding: 10px;
    padding-left: 18px;
    &:nth-child(2) {
      cursor: pointer;
    }
  }
`;

const FirstRow = styled.tr`
  color: grey;
  font-size: 14px;
  th {
    padding-left: 10px;
  }
`;

const SecondRow = styled.tr`
  transition: all 0.2s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
  td:nth-child(2) {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
  }
`;

const Img = styled.img`
  width: 25px;
  margin-right: 7px;
  text-align: center;
`;

interface ICoins {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
}

function Coins() {
  const { isLoading, data: coinData } = useQuery<ICoins[]>(
    "all coins",
    fetchCoins
  );

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
            <Table>
              <thead>
                <FirstRow>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>24h Change</th>
                  <th>Price Graph</th>
                </FirstRow>
              </thead>
              {coinData?.map((coin) => (
                <tbody key={coin.id}>
                  <SecondRow>
                    <td>{coin.market_cap_rank}</td>
                    <td>
                      <Img src={coin.image} alt="icon" />
                      <Link to={`/${coin.id}`}>
                        {coin.name} ({coin.symbol.toUpperCase()})
                      </Link>
                    </td>
                    <td>$ {coin.current_price}</td>
                    <td>
                      {coin.price_change_percentage_24h <= 0
                        ? ` ${coin.price_change_percentage_24h.toFixed(2)}`
                        : `▴ ${coin.price_change_percentage_24h.toFixed(2)}`}
                      %
                    </td>
                    <td>{coin.id}</td>
                  </SecondRow>
                </tbody>
              ))}
            </Table>
          )}
        </Main>
      </Container>
    </>
  );
}

export default Coins;
