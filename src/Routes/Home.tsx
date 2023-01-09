import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import Footer from "../components/Footer";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0 20px;
  background-color: ${(props) => props.theme.bgColor};
`;

const Loading = styled.span`
  font-size: 25px;
  display: block;
  text-align: center;
  color: ${(props) => props.theme.textColor};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20vh;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;

const CoinList = styled.div`
  display: grid;
  justify-items: center;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  @media screen and (max-width: 400px) {
    gap: 15px;
  }
`;

const Coin = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.divColor};
  padding: 18px;
  border-radius: 15px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.1s cubic-bezier(0.25, 0.8, 0.25, 1);
  img {
    width: 50px;
    height: 50px;
    margin-bottom: 15px;
  }
  &:hover {
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
    transform: scale(1.1);
  }
  @media screen and (max-width: 450px) {
    width: 105px;
  }
  @media screen and (max-width: 370px) {
    width: 100px;
  }
`;

const Name = styled.p`
  max-width: 100px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 20px;
  color: ${(props) => props.theme.textColor};
  @media screen and (max-width: 450px) {
    width: 90px;
  }
`;

const Paging = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
`;

const PageList = styled.ul`
  display: flex;
  justify-content: center;
`;

const Page = styled.li<{ isActive: boolean }>`
  background-color: ${(props) => props.theme.divColor};
  border-radius: ${(props) => (props.isActive ? "50%" : "3px")};
  margin: 0 20px;
  font-size: 18px;

  :last-child {
    margin: 0;
  }
  :first-child {
    margin: 0;
  }
  a {
    color: ${(props) => props.theme.textColor};
    padding: 15px 19px;
    display: block;
  }
`;

interface Icoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
function Home() {
  const { isLoading, data } = useQuery<Icoin[]>("coins", fetchCoins);
  const page1Match = useRouteMatch("/pages/1");
  const page2Match = useRouteMatch("/pages/2");
  const page3Match = useRouteMatch("/pages/3");
  const homeMatch = useRouteMatch("/");
  const matchList = [page1Match, page2Match, page3Match];
  const homeList = [true, false, false];
  return (
    <Container>
      <Helmet>
        <title>Coin</title>
      </Helmet>
      <Header>
        <Title>Coin</Title>
      </Header>
      {isLoading ? (
        <Loading>Loading</Loading>
      ) : (
        <>
          {homeMatch?.isExact ? (
            <>
              <CoinList>
                {data?.slice(0, 33).map((coin) => (
                  <Link key={coin.id} to={"/" + coin.id}>
                    <Coin key={coin.id}>
                      <img
                        alt={coin.symbol}
                        src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                      />
                      <Name>{coin.name}</Name>
                    </Coin>
                  </Link>
                ))}
              </CoinList>
              <Paging>
                <PageList>
                  {["1", "2", "3"].map((page) => (
                    <Page key={page} isActive={homeList[+page - 1]}>
                      <Link to={"/pages/" + page}>{page}</Link>
                    </Page>
                  ))}
                </PageList>
              </Paging>
            </>
          ) : (
            <></>
          )}
          <Switch>
            <Route path={"/pages/1"}>
              <CoinList>
                {data?.slice(0, 33).map((coin) => (
                  <Link key={coin.id} to={"/" + coin.id}>
                    <Coin key={coin.id}>
                      <img
                        alt={coin.symbol}
                        src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                      />
                      <Name>{coin.name}</Name>
                    </Coin>
                  </Link>
                ))}
              </CoinList>
            </Route>
            <Route path={"/pages/2"}>
              <CoinList>
                {data?.slice(33, 66).map((coin) => (
                  <Link key={coin.id} to={"/" + coin.id}>
                    <Coin key={coin.id}>
                      <img
                        alt={coin.symbol}
                        src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                      />
                      <Name>{coin.name}</Name>
                    </Coin>
                  </Link>
                ))}
              </CoinList>
            </Route>
            <Route path={"/pages/3"}>
              <CoinList>
                {data?.slice(66, 99).map((coin) => (
                  <Link key={coin.id} to={"/" + coin.id}>
                    <Coin key={coin.id}>
                      <img
                        alt={coin.symbol}
                        src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                      />
                      <Name>{coin.name}</Name>
                    </Coin>
                  </Link>
                ))}
              </CoinList>
            </Route>
          </Switch>
          {!homeMatch?.isExact ? (
            <Paging>
              <PageList>
                {["1", "2", "3"].map((page) => (
                  <Page key={page} isActive={matchList[+page - 1] !== null}>
                    <Link to={"/pages/" + page}>{page}</Link>
                  </Page>
                ))}
              </PageList>
            </Paging>
          ) : (
            <></>
          )}
          <Footer />
        </>
      )}
    </Container>
  );
}

export default Home;
