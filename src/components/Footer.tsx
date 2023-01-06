import styled from "styled-components";

const Foot = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  justify-content: space-between;
  padding: 20px;
  background-color: aliceblue;
  box-shadow: rgb(0 0 0 / 4%) 0px -5px 5px;
`;

const Btn = styled.button`
  background-color: transparent;
  border-radius: 50%;
  padding: 5px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: aliceblue;
  }
`;

const GithubDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Span = styled.span`
  font-size: 18px;
  margin-right: 10px;
  font-weight: 600;
`;

const Github = styled.a`
  padding: 3px;
  border-radius: 10px;
  margin-top: 7px;
  &:hover {
    background-color: aliceblue;
  }
`;
function Footer() {
  return (
    <Foot>
      <Btn>
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
