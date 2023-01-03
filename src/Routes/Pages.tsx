import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Link } from "react-router-dom";
import { Icoin } from "./Home";
import {
  Container,
  Header,
  Title,
  CoinList,
  Coin,
  Name,
  Paging,
  PageList,
  Page,
} from "./Home";

interface Iparams {
  page: string;
}
function Pages() {
  const { isLoading, data } = useQuery<Icoin[]>("coins", fetchCoins);
  const { page } = useParams<Iparams>();
  let coins: Icoin[] = [];
  if (page === "1" && !isLoading) {
    coins = data?.slice(0, 33) || [];
  } else if (page === "2" && !isLoading) {
    coins = data?.slice(33, 66) || [];
  } else if (page === "3" && !isLoading) {
    coins = data?.slice(66, 99) || [];
  } else {
    coins = [];
  }

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
            {coins?.map((coin) => (
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

export default Pages;
