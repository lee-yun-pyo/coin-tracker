import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";

const Foot = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  justify-content: space-between;
  padding: 20px;
  background-color: ${(props) => props.theme.divColor};
  box-shadow: rgb(0 0 0 / 4%) 0px -5px 5px;
`;

const Btn = styled.button`
  background-color: transparent;
  border-radius: 50%;
  padding: 5px;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.grayText};
  &:hover {
    color: ${(props) => props.theme.textColor};
  }
`;

const GithubDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Span = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;

const Github = styled.a`
  padding: 3px;
  border-radius: 10px;
  margin-top: 7px;
  color: ${(props) => props.theme.textColor};
`;
function Footer() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDark = () => {
    setDarkAtom((prev) => !prev);
  };
  return (
    <Foot>
      <Btn onClick={toggleDark}>
        <i className="fa-regular fa-moon fa-2x"></i>
      </Btn>
      <GithubDiv>
        <Span>Coin Tracker</Span>
        <Github
          href="https://github.com/lee-yun-pyo/coin-tracker"
          target="_blank"
        >
          <i className="fa-brands fa-square-github fa-2x"></i>
        </Github>
      </GithubDiv>
    </Foot>
  );
}

export default Footer;
