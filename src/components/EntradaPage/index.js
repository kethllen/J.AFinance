import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Container, Title, Input } from "./style";
import TokenContext from "../../contexts/TokenContext";

export default function EntradaPage() {
  const { token } = useContext(TokenContext);
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  function handleEntrada(e) {
    e.preventDefault();
    const promise = axios.post(
      "https://api-my--wallet.herokuapp.com/extract",
      {
        value,
        description,
        type: "entrada",
      },
      config
    );

    promise.then((response) => {
      navigate("/extract");
    });
    promise.catch((error) => {
      console.log(error.response.data);
      setValue("");
      setDescription("");
    });
  }
  return (
    <Container>
      <Title>
        <h1>Nova entrada</h1>
      </Title>
      <form onSubmit={handleEntrada}>
        <Input>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Valor"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição"
          />
          <button type="submit">Salvar entrada</button>
        </Input>
      </form>
    </Container>
  );
}
