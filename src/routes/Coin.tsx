import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoin } from "../api";

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
  height: 700px;
  margin: 0;
  padding: 45px;
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
  font-size: 30px;
  margin-bottom: 20px;
  opacity: 0.5;
`;

const CoinPrice = styled.div`
  display: flex;
  align-items: center;
  h2 {
    font-size: 35px;
    margin-bottom: 40px;
    margin-right: 15px;
  }
`;

const Btn = styled.button`
  font-size: 20px;
  padding: 10px 15px;
  border: 2px solid rgba(299, 299, 299, 0.4);
  border-radius: 8px;
  color: rgba(299, 299, 299, 0.4);
  background: transparent;
  cursor: pointer;
  margin-left: 10px;
  transition: all 0.3s linear;
  &:hover {
    background-color: aliceblue;
    color: black;
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
}

function Coin() {
  const { id: coinId } = useParams<IParmas>();
  const { isLoading, data } = useQuery<ICoin>(["coin: ", coinId], () =>
    fetchCoin(coinId)
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
          <Link to={"/"}>
            <SquareIcon src="./square.png" alt="icon" />
          </Link>
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
            <>
              <CoinName>{data?.name}</CoinName>
              <CoinPrice>
                <h2>$ {data?.current_price}</h2>
                <span>
                  {data
                    ? data.price_change_percentage_24h <= 0
                      ? ` ${data?.price_change_percentage_24h}`
                      : `▴ ${data?.price_change_percentage_24h}`
                    : null}
                  %
                </span>
              </CoinPrice>
              <div>
                <Btn>Price</Btn>
                <Btn>Chart</Btn>
              </div>
            </>
          )}
        </Main>
      </Container>
    </>
  );
}

export default Coin;
