import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { Link, Route, Switch, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoin } from "../api";
import Price from "./Price";
import Chart from "./Chart";
import { useRouteMatch } from "react-router-dom";

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
    &:hover {
      color: white;
    }
  }
`;
const Main = styled.div`
  overflow: scroll;
  background-color: rgba(0, 0, 0, 0.3);
  height: 700px;
  margin: 0;
  padding: 65px;
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
const CoinName = styled.h1`
  font-size: 25px;
  margin-bottom: 20px;
  opacity: 0.5;
`;

const CoinPrice = styled.div`
  display: flex;
  align-items: center;
  color: white;
  margin-bottom: 14px;
  h2 {
    font-size: 35px;
    font-weight: bolder;
    margin-right: 15px;
  }
  span {
    border: none;
    border-radius: 7px;
    background-color: #537895;
    padding: 10px;
  }
`;

const Price24h = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
  span {
    &:first-child {
      font-size: 19px;
      color: #74a8d0;
      margin-right: 10px;
    }
    &:nth-child(2) {
      font-size: 13px;
      border: 1.5px solid rgba(299, 299, 299, 0.15);
      border-radius: 6px;
      background-color: rgba(299, 299, 299, 0.08);
      padding: 5px 7px;
    }
  }
`;

const Btns = styled.div`
  display: inline-block;
  background-color: rgba(299, 299, 299, 0.05);
  border: 2px solid rgba(299, 299, 299, 0.4);
  border-radius: 7px;
  padding: 10px;
`;

const Btn = styled.button<{ $isActive: boolean }>`
  all: unset;
  font-size: 20px;
  padding: 12px;
  background-color: ${(props) =>
    props.$isActive ? "rgba(0, 0, 0, 0.3)" : null};
  color: ${(props) => (props.$isActive ? "white" : "rgba(299, 299, 299, 0.4)")};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s linear;
  &:nth-child(2) {
    margin-left: 10px;
  }
`;

// interface
interface IParmas {
  id: string;
}

interface ICoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  price_change_24h: number;
}

function Coin() {
  const { id: coinId } = useParams<IParmas>();
  const { isLoading, data } = useQuery<ICoin>(["coin: ", coinId], () =>
    fetchCoin(coinId)
  );
  const priceMatch = useRouteMatch(`/${coinId}/price`);
  const chartMatch = useRouteMatch(`/${coinId}/chart`);

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
          <Link to={"/"}>
            <SquareIcon src="/square.png" alt="icon" />
          </Link>
          <Link to={"/"}>
            <Title>Crypto Tracker</Title>
          </Link>
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
            <>
              <CoinName>{data?.name}</CoinName>
              <CoinPrice>
                <h2>$ {data?.current_price}</h2>
                <span>
                  {data
                    ? data.price_change_percentage_24h <= 0
                      ? ` ${data?.price_change_percentage_24h.toFixed(2)}`
                      : `▴ ${data?.price_change_percentage_24h.toFixed(2)}`
                    : null}
                  %
                </span>
              </CoinPrice>
              <Price24h>
                <span>
                  {data
                    ? data.price_change_24h <= 0
                      ? `- $${Math.abs(data?.price_change_24h)?.toFixed(2)}`
                      : `+ $${data?.price_change_24h?.toFixed(2)}`
                    : null}
                </span>
                <span>24h</span>
              </Price24h>
              <Btns>
                <Btn $isActive={priceMatch !== null}>
                  <Link to={`/${coinId}/price`}>Price</Link>
                </Btn>
                <Btn $isActive={chartMatch !== null}>
                  <Link to={`/${coinId}/chart`}>Chart</Link>
                </Btn>
              </Btns>
              <Switch>
                <Route path={"/:coinId/price"}>
                  <Price coinId={coinId} />
                </Route>
                <Route path={"/:coinId/chart"}>
                  <Chart coinId={coinId} coinSymbol={data?.symbol ?? ""} />
                </Route>
              </Switch>
            </>
          )}
        </Main>
      </Container>
    </>
  );
}

export default Coin;
