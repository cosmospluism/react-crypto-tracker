import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faChartColumn } from "@fortawesome/free-solid-svg-icons";
import { Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import AreaChart from "./AreaChart";
import Candlestick from "./Candlestick";

const Container = styled.div`
  position: absolute;
  top: 260px;
  left: 460px;
  height: 400px;
  width: 770px;
`;

const Btns = styled.div`
  position: absolute;
  top: -10px;
  right: -80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Btn = styled.button<{ $isActive: boolean }>`
  all: unset;
  font-size: 20px;
  padding: 12px;
  background-color: ${(props) =>
    props.$isActive ? "rgba(0, 0, 0, 0.3)" : null};
  color: ${(props) => (props.$isActive ? "white" : "rgba(299, 299, 299, 0.4)")};
  border: 2px solid rgba(299, 299, 299, 0.4);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s linear;
`;

// interface
interface IChart {
  coinId: string;
  coinSymbol: string;
}

function Chart({ coinId, coinSymbol }: IChart) {
  const areaMatch = useRouteMatch(`/${coinId}/chart/area`);
  const candleMatch = useRouteMatch(`/${coinId}/chart/candlestick`);

  return (
    <Container>
      {areaMatch !== null || candleMatch !== null ? null : (
        <AreaChart coinId={coinId} coinSymbol={coinSymbol} />
      )}
      <Btns>
        <Btn $isActive={areaMatch !== null}>
          <Link to={`/${coinId}/chart/area`}>
            <FontAwesomeIcon icon={faChartLine} />
          </Link>
        </Btn>
        <Btn $isActive={candleMatch !== null}>
          <Link to={`/${coinId}/chart/candlestick`}>
            <FontAwesomeIcon icon={faChartColumn} />
          </Link>
        </Btn>
      </Btns>
      <Switch>
        <Route path={"/:coinId/chart/area"}>
          <AreaChart coinId={coinId} coinSymbol={coinSymbol} />
        </Route>
        <Route path={"/:coinId/chart/candlestick"}>
          <Candlestick coinId={coinId} coinSymbol={coinSymbol} />
        </Route>
      </Switch>
    </Container>
  );
}

export default Chart;
