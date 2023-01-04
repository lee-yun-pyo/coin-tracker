import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { fetchInfo, fetchPrice } from "../api";

interface IcoinId {
  coinId: string;
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
  links: object;
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

const Loading = styled.span``;

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;
const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
const BtnToHome = styled.button`
  background-color: transparent;
  border: none;
  color: #62626c;
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
  font-size: 25px;
  font-weight: 600;
`;
const Price = styled.span`
  font-size: 25px;
  font-weight: 600;
  margin: 9px 0;
`;
const Percent24h = styled.span<IPercent24h>`
  color: ${(props) =>
    props.percent24h && props.percent24h >= 0 ? "#4880EE" : "#DA5157"};
  font-weight: 600;
  span {
    color: gray;
    font-weight: normal;
  }
`;
const Rank = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 20px;
  border-radius: 12px;
  background-color: aliceblue;
  span {
    font-size: 20px;
  }
  p {
    margin-top: 5px;
    font-size: 25px;
    font-weight: 600;
  }
`;

function Coin() {
  const { coinId } = useParams<IcoinId>();
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
  return infoLoading ? (
    <Loading>Loading</Loading>
  ) : (
    <>
      <Container>
        <Nav>
          <BtnToHome>
            <Link to={"/"}>
              <i className="fa-solid fa-chevron-left fa-2x"></i>
            </Link>
          </BtnToHome>
          <BtnToHome>
            <i className="fa-regular fa-moon fa-2x"></i>
          </BtnToHome>
        </Nav>
        <Header>
          <TitleDiv>
            <Title>{infoData?.name}</Title>
            <Price>${coinPrice?.toFixed(2)}</Price>
            <Percent24h percent24h={percent24h || undefined}>
              {coinPrice && percent24h
                ? percent24h >= 0
                  ? `+$${((coinPrice * Math.abs(percent24h)) / 100).toFixed(2)}`
                  : `-$${((coinPrice * Math.abs(percent24h)) / 100).toFixed(2)}`
                : undefined}{" "}
              ({percent24h}%) <span>24h ago</span>
            </Percent24h>
          </TitleDiv>
          <Rank>
            <span>Rank</span>
            <p>{infoData?.rank}</p>
          </Rank>
        </Header>
      </Container>
    </>
  );
}

export default Coin;
