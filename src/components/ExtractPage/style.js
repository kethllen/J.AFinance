import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  background-color: #8c11be;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 326px;
  margin-top: 25px;
  h1 {
    font-family: "Raleway", sans-serif;
    font-size: 26px;
    font-style: normal;
    font-weight: 700;
    line-height: 31px;
    letter-spacing: 0em;
    text-align: left;

    color: #ffffff;
  }
  img {
    height: 24px;
    width: 23px;
    color: #ffffff;
  }
`;
const Linha = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Extrat = styled.div`
  box-sizing: border-box;
  position: relative;
  margin-top: 20px;
  height: 60vh;
  width: 326px;
  padding: 13px;
  padding-bottom: 40px;
  border-radius: 5px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  h1 {
    position: absolute;
    top: 180px;
    left: 68px;
    height: 100%;
    color: #868686;
    font-family: "Raleway", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: center;
    align-self: center;
    justify-self: center;
  }
`;
const Valor = styled.div`
  font-family: "Raleway", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  color: ${(props) => (props.color === "saida" ? "#c70000" : "#03AC00")};
`;
const Description = styled.div`
  font-family: "Raleway", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  display: flex;
  gap: 5px;
  padding-top: 15px;
  margin-bottom: 15px;
  .data {
    color: #c6c6c6;
  }
  span {
    color: #000000;
  }
`;
const Saldo = styled.div`
  width: 303px;
  font-family: "Raleway", sans-serif;
  font-size: 17px;
  font-style: normal;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 12px;
  .value {
    font-weight: 400;
    text-align: right;
    color: ${(props) => (props.color === "saida" ? "#c70000" : "#03AC00")};
  }
  span {
    font-weight: 700;
    color: #000000;
  }
`;
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 326px;
  position: fixed;
  bottom: 16px;
  img {
    height: 114px;
    width: 155px;
    border-radius: 5px;
  }
`;

export { Container, Extrat, Title, Footer, Saldo, Description, Valor, Linha };
