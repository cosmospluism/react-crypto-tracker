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
  top: 260px;
  left: 460px;
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
  // console.log(data);

  return (
    <Container>
      <ApexCharts
        type="area"
        options={{
          xaxis: {
            // type: "datetime",
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            labels: {
              show: false,
            },
            categories: data?.map((date) => date.time_close),
          },
          yaxis: {
            labels: {
              style: {
                colors: ["white"],
                fontSize: "14px",
              },
            },
            stepSize: 2000,
          },
          chart: {
            toolbar: {
              show: false,
            },
          },
          colors: ["#008FFB"],
          fill: {
            type: "gradient",
            gradient: { gradientToColors: ["transparent"], stops: [0, 100] },
          },
          grid: {
            borderColor: "rgba(299, 299, 299, 0.2)",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
          },
          tooltip: {
            y: {
              formatter: (value) => `$ ${value.toFixed(2)}`,
            },
            theme: "dark",
          },
        }}
        series={[
          {
            name: "Price",
            data: data?.map((price) => Number(price.close)) ?? [],
          },
        ]}
      />
    </Container>
  );
}

export default Chart;
