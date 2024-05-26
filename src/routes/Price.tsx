import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoin } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

interface ICoinPrice {
  market_cap: number;
  circulating_supply: number;
  total_supply: number;
  ath: number;
  atl: number;
}

const Container = styled.div`
  position: absolute;
  top: 260px;
  left: 460px;
  height: 400px;
  width: 770px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  font-size: 20px;
  div {
    display: flex;
    flex-direction: column;
    gap: 30px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 30px;
    margin-left: 25px;
    &:nth-child(2) {
      span {
        &:first-child {
          font-size: 17px;
        }
      }
    }
    span {
      font-size: 19px;
      &:first-child {
        font-weight: 900;
      }
    }
  }
`;

interface IPrice {
  coinId: string;
}

function Price({ coinId }: IPrice) {
  const { data } = useQuery<ICoinPrice>(["coinPrice"], () => fetchCoin(coinId));

  return (
    <Container>
      <div>
        <span>
          Market Cap <FontAwesomeIcon icon={faCircleInfo} />
        </span>
        <span>$ {data?.market_cap}</span>
      </div>
      <div>
        <span>
          Circulating Supply <FontAwesomeIcon icon={faCircleInfo} />
        </span>
        <span>{data?.circulating_supply.toLocaleString()}</span>
      </div>
      <div>
        <span>
          Total Supply <FontAwesomeIcon icon={faCircleInfo} />
        </span>
        <span>{data?.total_supply.toLocaleString()}</span>
      </div>
      <div>
        <span>
          All Time High <FontAwesomeIcon icon={faCircleInfo} />
        </span>
        <span>$ {data?.ath}</span>
      </div>
      <div>
        <span>
          All Time Low <FontAwesomeIcon icon={faCircleInfo} />
        </span>
        <span>$ {data?.atl}</span>
      </div>
    </Container>
  );
}

export default Price;
