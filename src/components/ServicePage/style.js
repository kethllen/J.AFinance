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
const Services = styled.div`
  box-sizing: border-box;
  position: relative;
  margin-top: 8px;
  height: 80vh;
  width: 326px;
  padding: 13px;
  padding-bottom: 40px;
  overflow: scroll;
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  div {
    position: relative;
    height: 115px;
    width: 118px;
    background-color: #7db9df; //#000080
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: "Raleway", sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: center;
    align-self: center;
    border-radius: 5px;
  }
`;
export { Container, Services, Title };
