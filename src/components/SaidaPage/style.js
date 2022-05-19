import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  background-color: #8C11BE;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.div`
    display: flex;
    flex-direction: row;
    width: 326px;
    position: fixed;
    top:25px;
    h1{
        font-family: 'Raleway', sans-serif;
        font-size: 26px;
        font-style: normal;
        font-weight: 700;
        line-height: 31px;
        letter-spacing: 0em;
        text-align: left;
        color: #FFFFFF;
    }

`
const Input = styled.div`
display: flex;
flex-direction: column;
margin-top:96px;
input{
  height: 58px;
  width: 326px;
  left: 25px;
  top: 233px;
  border-radius: 5px;
    margin-bottom: 3%;
    background-color: #FFFFFF;
    border:none;
    ::placeholder {
    color: #000000;
    font-family: 'Raleway', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    text-align: left;
  }
}
button{
  height: 46px;
width: 326px;
border-radius: 5px;
border: none;
color: #FFFFFF;
margin-bottom: 36px;
    background-color:#A328D6;
    font-family: 'Raleway', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0em;
    text-align: center;
}
`

export {
  Container,
  Title,
  Input
}