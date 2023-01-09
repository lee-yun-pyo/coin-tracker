import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "../atom";

interface IPriceProps {
  coinId: string;
}

interface ICoinHistory {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const Message = styled.span`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  display: block;
  color: ${(props) => props.theme.textColor};
`;

function Chart({ coinId }: IPriceProps) {
  const isDark = useRecoilState(isDarkAtom);
  const { isLoading, data } = useQuery<ICoinHistory[]>(
    ["history", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000,
    }
  );
  let howIncrease = 0;
  if (Array.isArray(data)) {
    howIncrease = Number(data[20].close) - Number(data[0].close);
  }
  return (
    <div>
      {isLoading ? (
        <Message>Loading chart...</Message>
      ) : Array.isArray(data) ? (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => +price.close) as number[],
            },
          ]}
          options={{
            chart: {
              height: 500,
              width: 500,
              background: "transparent",
              toolbar: { show: false },
            },
            colors: howIncrease >= 0 ? ["#DA5157"] : ["#4880EE"],
            fill: {
              type: "solid",
            },
            tooltip: {
              theme: "light",
              y: {
                formatter: (value) =>
                  `$${Number(value.toFixed(2)).toLocaleString()}`,
                title: {
                  formatter: (name) => "Price",
                },
              },
              marker: {
                show: false,
              },
            },
            stroke: { curve: "smooth", width: 4 },
            theme: {
              mode: isDark[0] ? "light" : "dark",
            },
            grid: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((value) =>
                new Date(value.time_close * 1000).toDateString()
              ),
            },
            yaxis: {
              labels: {
                show: false,
              },
            },
          }}
        />
      ) : (
        <Message>Price data not found</Message>
      )}
    </div>
  );
}

export default Chart;
