import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";

export const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20vh;
`;

export const Title = styled.h1`
  font-size: 40px;
  font-weight: 600;
`;

export const CoinList = styled.div`
  display: grid;
  justify-items: center;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
`;

export const Coin = styled.div`
  width: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.1s cubic-bezier(0.25, 0.8, 0.25, 1);
  img {
    width: 55px;
    height: 55px;
    margin-bottom: 15px;
  }
  &:hover {
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
    transform: scale(1.1);
  }
`;

export const Name = styled.p`
  max-width: 100px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Paging = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const PageList = styled.ul`
  display: flex;
  justify-content: center;
`;

export const Page = styled.li`
  background-color: aliceblue;
  border-radius: 10px;
  margin: 0 20px;
  font-size: 18px;
  :last-child {
    margin: 0;
  }
  :first-child {
    margin: 0;
  }
  a {
    padding: 15px;
    display: block;
  }
`;

export interface Icoin {
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
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>

      {isLoading ? (
        "Loading"
      ) : (
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
                <Page key={page}>
                  <Link to={"/pages/" + page}>{page}</Link>
                </Page>
              ))}
            </PageList>
          </Paging>
        </>
      )}
    </Container>
  );
}

export default Home;
