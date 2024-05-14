import ApexCharts from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinOhlc } from "../api";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 350px;
  left: 440px;
  height: 400px;
  width: 850px;
  border: 1px solid white;
`;

interface IChart {
  coinId: string;
}

function Chart({ coinId }: IChart) {
  const { data } = useQuery(["coinOhlc", coinId], () => fetchCoinOhlc(coinId));
  console.log(data);

  return (
    <Container>
      {/* <ApexCharts type="area" height={350} series={[]} /> */}
    </Container>
  );
}

export default Chart;
