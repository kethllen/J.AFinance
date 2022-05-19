import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  Container,
  Saldo,
  Description,
  Title,
  Extrat,
  Footer,
  Valor,
  Linha,
} from "./style";
import exit from "../../assets/exit.png";
import entrada from "../../assets/entrada.png";
import saida from "../../assets/saida.png";
import TokenContext from "../../contexts/TokenContext";
import { Link } from "react-router-dom";
import NameContext from "../../contexts/NameContext";

export default function ExtractPage() {
  const { token } = useContext(TokenContext);
  const { nameContext } = useContext(NameContext);
  const [extrato, setExtrato] = useState([]);
  const navigate = useNavigate();
  let total = 0;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    console.log(token);
    const promise = axios.get(
      "https://api-my--wallet.herokuapp.com/extract",
      config
    );
    promise.then((response) => {
      console.log(response.data);
      setExtrato(response.data);
    });
    promise.catch((error) => {
      alert(error.response.data);
    });
  }, []);
  if (extrato) {
    extrato.forEach((element) => {
      const aux = element.value.replace(",", ".");
      if (element.type === "entrada") total += parseFloat(aux);
      else total -= parseFloat(aux);
    });
  }
  total = total.toFixed(2);
  const totalaux = total.replace(".", ",");
  if (token === "") return;
  return (
    <Container>
      <Title>
        <h1>Olá, {nameContext}</h1>
        <img
          src={exit}
          onClick={() => {
            navigate("/");
          }}
        ></img>
      </Title>
      <Extrat>
        {!extrato ? (
          <h1>
            Não há registros de<br></br>entrada ou saída
          </h1>
        ) : (
          extrato.map((n) => (
            <Linha>
              <Description>
                <p className="data">{n.data}</p>
                <span>{n.description}</span>
              </Description>
              <Valor color={n.type}>{n.value}</Valor>
            </Linha>
          ))
        )}
        {!extrato ? (
          ""
        ) : (
          <Saldo color={total >= 0 ? "entrada" : "saida"}>
            <span>Saldo</span>
            <div className="value">{totalaux}</div>
          </Saldo>
        )}
      </Extrat>
      <Footer>
        <img
          src={entrada}
          onClick={() => {
            navigate("/entrada");
          }}
        ></img>
        <img
          src={saida}
          onClick={() => {
            navigate("/saida");
          }}
        ></img>
      </Footer>
    </Container>
  );
}
