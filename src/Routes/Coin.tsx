import { useQuery } from "react-query";
import {
  useParams,
  Link,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { fetchInfo, fetchPrice } from "../api";
import Footer from "../components/Footer";
import CandleStick from "./CandleStick";
import Chart from "./Chart";
import Price from "./Price";

interface IcoinId {
  coinId: string;
}
interface Ireficon {
  iconColor: string;
  isHref: string | undefined;
}
interface Iinfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: object;
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: {
    facebook?: string;
    reddit?: string;
    source_code?: string;
    youtube?: string;
  };
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface Iprice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

interface IPercent24h {
  percent24h: number | undefined;
}

const Loading = styled.span`
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 30px;
  color: ${(props) => props.theme.textColor};
`;

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0 20px;
  background-color: ${(props) => props.theme.bgColor};
`;
const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
const BtnToHome = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.grayText};
`;
const Header = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 30px 0;
`;
const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;
const PriceSpan = styled.span`
  font-size: 22px;
  font-weight: 600;
  margin: 9px 0;
  color: ${(props) => props.theme.textColor};
`;
const Percent24h = styled.span<IPercent24h>`
  color: ${(props) =>
    props.percent24h && props.percent24h >= 0 ? "#DA5157" : "#4880EE"};
  font-weight: 600;
  span {
    color: ${(props) => props.theme.grayText};
    font-weight: normal;
    margin-left: 5px;
  }
`;
const Rank = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 20px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.divColor};
  span {
    font-size: 18px;
    color: ${(props) => props.theme.textColor};
  }
  p {
    margin-top: 5px;
    font-size: 25px;
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
  }
`;

const Main = styled.main``;

const Tabs = styled.div`
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${(props) => props.theme.divColor};
  margin: 20px 0;
  border-radius: 15px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  padding: 10px 15px;
  border-radius: 10px;
  a {
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
    font-weight: ${(props) => (props.isActive ? "700" : "500")};
  }
`;

const Description = styled.div`
  background-color: ${(props) => props.theme.divColor};
  border-radius: 15px;
  padding: 25px 22px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.textColor};
  span {
    font-weight: 600;
    font-size: 18px;
    display: block;
    margin-bottom: 15px;
  }
  p {
    font-size: 16px;
    line-height: 1.4em;
  }
`;

const Reference = styled.div`
  background-color: ${(props) => props.theme.divColor};
  border-radius: 15px;
  padding: 25px 22px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.textColor};
  > span {
    font-weight: 600;
    font-size: 18px;
    display: block;
    margin-bottom: 15px;
  }
`;

const RefLink = styled.a<Ireficon>`
  display: ${(props) => (props.isHref ? "block" : "none")};
  background-color: ${(props) => props.theme.grayDiv};
  color: ${(props) => props.iconColor};
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  :hover {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  }
  i {
    margin-right: 8px;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span {
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
  }
`;

function Coin() {
  const { coinId } = useParams<IcoinId>();
  const chartMatch = useRouteMatch("/:coinId/chart");
  const candleMatch = useRouteMatch("/:coinId/candle-stick");
  const priceMatch = useRouteMatch("/:coinId/price");
  const { isLoading: infoLoading, data: infoData } = useQuery<Iinfo>(
    ["info", coinId],
    () => fetchInfo(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<Iprice>(
    ["price", coinId],
    () => fetchPrice(coinId)
  );
  const percent24h = priceData?.quotes.USD.percent_change_24h;
  const coinPrice = priceData?.quotes.USD.price;
  const loading = infoLoading || priceLoading;
  return (
    <Container>
      {loading ? (
        <Loading>Loading</Loading>
      ) : (
        <>
          <Nav>
            <BtnToHome>
              <Link to={"/"}>
                <i className="fa-solid fa-chevron-left fa-2x"></i>
              </Link>
            </BtnToHome>
          </Nav>
          <Header>
            <TitleDiv>
              <Title>{infoData?.name}</Title>
              <PriceSpan>
                ${Number(coinPrice?.toFixed(2)).toLocaleString()}
              </PriceSpan>
              <Percent24h percent24h={percent24h || undefined}>
                {coinPrice && percent24h
                  ? percent24h >= 0
                    ? `+$${((coinPrice * Math.abs(percent24h)) / 100).toFixed(
                        2
                      )}`
                    : `-$${((coinPrice * Math.abs(percent24h)) / 100).toFixed(
                        2
                      )}`
                  : undefined}{" "}
                ({percent24h}%) <span>24h ago</span>
              </Percent24h>
            </TitleDiv>
            <Rank>
              <span>Rank</span>
              <p>{infoData?.rank}</p>
            </Rank>
          </Header>
          <Main>
            <Switch>
              <Route path={"/:coinId/chart"}>
                <Chart coinId={coinId} />
              </Route>
              <Route path={"/:coinId/price"}>
                <Price
                  percent30m={priceData?.quotes.USD.percent_change_30m}
                  percent1h={priceData?.quotes.USD.percent_change_1h}
                  percent12h={priceData?.quotes.USD.percent_change_12h}
                  percent7d={priceData?.quotes.USD.percent_change_7d}
                  percent30d={priceData?.quotes.USD.percent_change_30d}
                  percent1y={priceData?.quotes.USD.percent_change_1y}
                />
              </Route>
              <Route path={"/:coinId/candle-stick"}>
                <CandleStick coinId={coinId} />
              </Route>
            </Switch>
            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Line Chart</Link>
              </Tab>
              <Tab isActive={candleMatch !== null}>
                <Link to={`/${coinId}/candle-stick`}>CandleStick</Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
              </Tab>
            </Tabs>
            <Description>
              <span>Description</span>
              <p>{infoData?.description}</p>
            </Description>
            <Reference>
              <span>Reference Link</span>
              <div>
                <RefLink
                  target="_blank"
                  iconColor="#171515"
                  isHref={infoData?.links.source_code}
                  href={infoData?.links.source_code}
                >
                  <div>
                    <i className="fa-brands fa-github fa-lg"></i>
                    <span>Github</span>
                  </div>
                </RefLink>
                <RefLink
                  target="_blank"
                  iconColor="#FF4500"
                  isHref={infoData?.links.reddit}
                  href={infoData?.links.reddit}
                >
                  <div>
                    <i className="fa-brands fa-reddit fa-lg"></i>
                    <span>Reddit</span>
                  </div>
                </RefLink>
                <RefLink
                  target="_blank"
                  iconColor="#FE0000"
                  isHref={infoData?.links.youtube}
                  href={infoData?.links.youtube}
                >
                  <div>
                    <i className="fa-brands fa-youtube fa-lg"></i>
                    <span>Youtube</span>
                  </div>
                </RefLink>
                <RefLink
                  target="_blank"
                  iconColor="#1877F2"
                  isHref={infoData?.links.facebook}
                  href={infoData?.links.facebook}
                >
                  <div>
                    <i className="fa-brands fa-facebook fa-lg"></i>
                    <span>Facebook</span>
                  </div>
                </RefLink>
              </div>
            </Reference>
          </Main>
          <Footer />
        </>
      )}
    </Container>
  );
}

export default Coin;
