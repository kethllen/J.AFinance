import React, { useContext, useState } from "react";
import * as api from "../../services/api";
import { useNavigate } from "react-router";
import { Container, StyledLink, Title, Input } from "./style";
import TokenContext from "../../contexts/TokenContext";
import logo from "../../assets/logo.png";

export default function LoginPage() {
  const { setToken } = useContext(TokenContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    const { token } = await api.signIn({
      email,
      password,
    });
    if (token) {
      localStorage.setItem("token", token);
      setToken(token);
      navigate("/obras");
    }
  }

  return (
    <Container>
      <img src={logo} />
      <Title>J.AFinance</Title>
      <form onSubmit={handleLogin}>
        <Input>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />
          <button type="submit">Entrar</button>
        </Input>
      </form>
      <StyledLink to="/sing-up">Primeira vez? Cadastre-se!</StyledLink>
    </Container>
  );
}
