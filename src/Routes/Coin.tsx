import { useParams } from "react-router-dom";

interface IcoinId {
  coinId: string;
}

function Coin() {
  const { coinId } = useParams<IcoinId>();
  return <h1>{coinId}</h1>;
}

export default Coin;
