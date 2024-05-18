import styled from "styled-components";
import ApexCharts from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinOhlc } from "../api";

const Container = styled.div`
  position: absolute;
  /* top: 350px; */
  /* left: 440px; */
  /* height: 400px;
  width: 850px; */
  top: 280px;
  left: 490px;
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

function Chart({ coinId, coinSymbol }: IChart) {
  const { data } = useQuery<IData[]>(["coinOhlc", coinId], () =>
    fetchCoinOhlc(coinId, coinSymbol)
  );
  console.log(data);

  return (
    <Container>
      <ApexCharts
        type="area"
        options={{
          xaxis: {
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          chart: {
            toolbar: {
              show: false,
            },
          },
          fill: {
            type: "gradient",
            gradient: { gradientToColors: ["lightblue"], stops: [0, 100] },
          },
        }}
        series={[
          {
            name: "price",
            data: data?.map((price) => Number(price.close)) ?? [],
          },
        ]}
      />
    </Container>
  );
}

export default Chart;
