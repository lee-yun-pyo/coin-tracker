import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
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

function Coin() {
  const { coinId } = useParams<IcoinId>();
  const { isLoading: infoLoading, data: infoData } = useQuery<Iinfo>(
    "info",
    () => fetchInfo(coinId)
  );
  return <h1>{coinId}</h1>;
}

export default Coin;
