import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Container,
  Title,
  Extrat,
  Incluir,
  Linha,
  Description,
  Input,
  Valor,
  Saldo,
  Empreita,
} from "./style";
import TokenContext from "../../contexts/TokenContext";
import FuncionariosContext from "../../contexts/FuncionariosContext";
import * as api from "../../services/api";
import { FcPlus } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import Swal from "sweetalert2";
import loadImage from "../../assets/authLoad.svg";
import { RiArrowGoBackFill, RiFolderUserLine } from "react-icons/ri";
import ObraContext from "../../contexts/ObraContext";
import dayjs from "dayjs";

const maskOnlyNumbers = (value) => {
  return (Number(value.replace(/\D/g, "")) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export default function EmpreitasPage() {
  const { token, setToken } = useContext(TokenContext);
  const { funcionarios, setFuncionarios } = useContext(FuncionariosContext);
  const { obraContext, setObraContext } = useContext(ObraContext);
  const [page, setPage] = useState();
  const [empreitas, setEmpreitas] = useState([]);
  const [valor, setValor] = useState([]);
  const [disabledButton, setDisabledButton] = useState(false);
  const [errorData, setErrorData] = useState();
  const date = dayjs().format("DD-MM-YYYY");
  const [funAux, setFunAux] = useState();
  let total = 0;

  const [formData, setFormData] = useState({
    obraId: parseInt(obraContext.id),
    funcionarioId: 1,
    valor: "",
    description: "",
  });

  const navigate = useNavigate();

  useEffect(async () => {
    const promise = await api.empreitasGet(token, obraContext.id);
    setEmpreitas(promise);
    const promise2 = await api.funcionariosGet(token);
    setFuncionarios(promise2);
  }, [page]);
  if (token === "") return;

  function handleInput(e) {
    if (e.target.name == "valor") {
      const valor = parseInt(e.target.value.replace(/\D/g, ""));
      setFormData({ ...formData, [e.target.name]: valor });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  async function handleEmpreita(e) {
    e.preventDefault();
    setDisabledButton(true);
    setErrorData({ ...formData });
    setTimeout(() => setErrorData(), 3500);
    console.log(formData);
    const promise = await api.empreitasPost(token, formData);
    if (promise === 401) {
      return Swal.fire({
        icon: "error",
        title: "Ops...",
        text: "Este nome de obra não está cadastrado!",
      });
    } else if (promise === 422) {
      return Swal.fire({
        icon: "error",
        title: "Ops...",
        text: "Este formato esta errado!",
      });
    } else {
      setDisabledButton(false);
      setPage("");
    }
    setPage("");
  }

  return (
    <Container>
      {!page ? (
        <>
          <Title>
            <h1>Empreitas de {obraContext.name}</h1>
            <RiArrowGoBackFill
              size={28}
              color={"#ffffff"}
              onClick={() => navigate("/obras/services")}
            />
          </Title>
          <Extrat>
            {!empreitas ? (
              <h1>
                Não há registros de<br></br>empreitas para esta obra!
              </h1>
            ) : (
              empreitas.map((n) => (
                <Empreita>
                  <Linha>
                    <Description>
                      <RiFolderUserLine size={30} color={"#ffffff"} />
                      <span>{n.description}</span>
                    </Description>
                    <Valor font-weight={"entrada"}>
                      {(n.valor / 100).toFixed(2)}
                    </Valor>
                  </Linha>
                  <Linha>
                    <Description>
                      <p>Funcionario: </p>
                    </Description>
                    <span>{n.funcionario.nome}</span>
                  </Linha>
                  <Linha>
                    <Description>
                      <h3>Valor Pago: </h3>
                    </Description>
                    <Valor font-weight={"entrada"}>
                      {(n.valorPago / 100).toFixed(2)}
                    </Valor>
                  </Linha>
                </Empreita>
              ))
            )}
          </Extrat>
          <Incluir onClick={() => setPage("inserir")}>
            <div>
              <FcPlus size={50} />
            </div>
          </Incluir>
        </>
      ) : (
        <>
          <Title>
            <h1>Nova Empreita para {obraContext.name}</h1>
            <RiArrowGoBackFill
              size={25}
              color={"#ffffff"}
              onClick={() => setPage("")}
            />
          </Title>
          <form onSubmit={handleEmpreita}>
            <Input>
              <select
                value={formData.funcionarioId}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    funcionarioId: parseInt(e.target.value),
                  });
                }}
              >
                {funcionarios.map((f) => (
                  <option value={f.id}>{f.nome}</option>
                ))}
              </select>
              <input
                value={valor}
                name="valor"
                onChange={(e) => {
                  setValor(maskOnlyNumbers(e.target.value));
                  handleInput(e);
                }}
                placeholder="Valor"
              />
              <input
                type="text"
                value={formData.description}
                name="description"
                onChange={(e) => handleInput(e)}
                placeholder="Nome da Empreita"
              />
              <button type="submit" disabled={disabledButton}>
                {disabledButton ? (
                  <img width={50} height={50} src={loadImage} alt="Loading" />
                ) : (
                  "Salvar Empreita"
                )}
              </button>
            </Input>
          </form>
        </>
      )}
    </Container>
  );
}
