import styled from "styled-components";
import ApexCharts from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinOhlc } from "../api";

const Container = styled.div`
  height: 400px;
  width: 770px;
`;

// interface
interface IChart {
  coinId: string;
  coinSymbol: string;
}

interface IData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Candlestick({ coinId, coinSymbol }: IChart) {
  const { data } = useQuery<IData[]>(["coinOhlc", coinId], () =>
    fetchCoinOhlc(coinId, coinSymbol)
  );
  const ohlcData =
    data &&
    data?.map((coin) => {
      return {
        x: new Date(coin.time_close * 1000).toISOString(),
        y: [coin.open, coin.high, coin.low, coin.close],
      };
    });

  return (
    <Container>
      <ApexCharts
        type="candlestick"
        series={[
          {
            data: ohlcData ?? [],
          },
        ]}
        options={{
          chart: {
            toolbar: {
              show: false,
            },
          },
          xaxis: {
            type: "datetime",
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            labels: {
              show: false,
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: ["white"],
                fontSize: "14px",
              },
              formatter: (value) => `$ ${value}`,
            },
            tickAmount: 4,
          },
          tooltip: {
            theme: "dark",
          },
          grid: {
            borderColor: "rgba(299, 299, 299, 0.2)",
          },
        }}
      />
    </Container>
  );
}

export default Candlestick;
