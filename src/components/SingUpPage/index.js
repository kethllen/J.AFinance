import React, { useContext, useState } from "react";
import * as api from "../../services/api";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router";
import { Container, StyledLink, Title, Input } from "./style";

export default function SingUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  async function handleSingUp(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    } else {
      const promise = await api.signUp({
        name,
        email,
        password,
      });
      if (promise) {
        navigate("/");
      }
    }
  }

  return (
    <Container>
      <img src={logo} />
      <Title>J.AFinance</Title>
      <form onSubmit={handleSingUp}>
        <Input>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
          />
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
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme a senha"
          />
          <button type="submit">Cadastrar</button>
        </Input>
      </form>
      <StyledLink to="/">Já tem uma conta? Entre agora!</StyledLink>
    </Container>
  );
}
