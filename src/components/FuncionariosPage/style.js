import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  background-color: #808080;
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
  .logo {
    display: flex;
    flex-direction: row;
    gap: 1px;
    img {
      height: 30px;
      width: 40px;
    }
    h1 {
      font-family: "Saira Stencil One", cursive;
      font-size: 16px;
      color: #ffffff;
      font-style: normal;
      font-weight: 400;
      line-height: 50px;
      letter-spacing: 0em;
    }
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
  height: 70vh;
  width: 326px;
  padding: 13px;
  padding-bottom: 40px;
  border-radius: 5px;
  background-color: #7db9df;
  display: flex;
  flex-direction: column;
  overflow: scroll;
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
const Incluir = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
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
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  display: flex;
  gap: 10px;
  padding-top: 15px;
  margin-bottom: 15px;
  cursor: pointer;

  span {
    padding-top: 5px;
    color: #000000;
  }
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 35px;
  input {
    height: 58px;
    width: 326px;
    left: 25px;
    top: 233px;
    border-radius: 5px;
    margin-bottom: 3%;
    background-color: #ffffff;
    border: none;
    ::placeholder {
      color: #000000;
      font-family: "Raleway", sans-serif;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      text-align: left;
    }
  }
  button {
    height: 46px;
    width: 326px;
    border-radius: 5px;
    border: none;
    color: #ffffff;
    margin-bottom: 36px;
    background-color: #469bd2;
    font-family: "Raleway", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0em;
    text-align: center;
  }
`;
export { Container, Extrat, Title, Description, Valor, Linha, Incluir, Input };
