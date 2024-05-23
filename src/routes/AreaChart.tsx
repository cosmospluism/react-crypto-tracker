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

function AreaChart({ coinId, coinSymbol }: IChart) {
  const { data } = useQuery<IData[]>(["coinOhlc", coinId], () =>
    fetchCoinOhlc(coinId, coinSymbol)
  );

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
            categories: data?.map((date) =>
              new Date(date.time_close * 1000).toISOString()
            ),
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
          chart: {
            toolbar: {
              show: false,
            },
          },
          colors: ["#008FFB"],
          fill: {
            type: "gradient",
            gradient: { gradientToColors: ["transparent"] },
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
            theme: "dark",
            y: {
              formatter: (value) => `$ ${value.toFixed(2)}`,
            },
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

export default AreaChart;
