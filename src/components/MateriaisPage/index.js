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
} from "./style";
import TokenContext from "../../contexts/TokenContext";
import * as api from "../../services/api";
import { FcPlus } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import Swal from "sweetalert2";
import loadImage from "../../assets/authLoad.svg";
import { RiArrowGoBackFill } from "react-icons/ri";
import ObraContext from "../../contexts/ObraContext";
import dayjs from "dayjs";

const maskOnlyNumbers = (value) => {
  return (Number(value.replace(/\D/g, "")) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export default function MateriaisPage() {
  const { token, setToken } = useContext(TokenContext);
  const { obraContext, setObraContext } = useContext(ObraContext);
  const [page, setPage] = useState();
  const [materiais, setMateriais] = useState([]);
  const [valor, setValor] = useState([]);
  const [disabledButton, setDisabledButton] = useState(false);
  const [errorData, setErrorData] = useState();
  const date = dayjs().format("DD-MM-YYYY");
  let total = 0;
  const [formData, setFormData] = useState({
    obraId: parseInt(obraContext.id),
    description: "",
    fornecedor: "",
    data: date,
    valor: "",
  });

  const navigate = useNavigate();

  useEffect(async () => {
    const promise = await api.materiaisGet(token, obraContext.id);
    setMateriais(promise);
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

  async function handleMaterias(e) {
    e.preventDefault();
    setDisabledButton(true);
    setErrorData({ ...formData });
    setTimeout(() => setErrorData(), 3500);

    const promise = await api.materiaisPost(token, formData);
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
      setFormData({
        obraId: parseInt(obraContext.id),
        description: "",
        fornecedor: "",
        data: date,
        valor: "",
      });
      setPage("");
    }
    setPage("");
  }
  materiais.map((n) => (total += n.valor));
  return (
    <Container>
      {!page ? (
        <>
          <Title>
            <h1>Materiais de {obraContext.name}</h1>
            <RiArrowGoBackFill
              size={28}
              color={"#ffffff"}
              onClick={() => navigate("/obras/services")}
            />
          </Title>
          <Extrat>
            {!materiais ? (
              <h1>
                Não há registros de<br></br>materiais para esta obra!
              </h1>
            ) : (
              materiais.map((n) => (
                <Linha key={n.id}>
                  <Description>
                    <p className="data">{n.data.substring(0, 5)}</p>
                    <span>{n.description}</span>
                  </Description>

                  <Valor color={"saida"}>{(n.valor / 100).toFixed(2)}</Valor>
                </Linha>
              ))
            )}
            {!materiais ? (
              ""
            ) : (
              <Saldo color={"saida"}>
                <span>Total</span>
                <div className="value">{(total / 100).toFixed(2)}</div>
              </Saldo>
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
            <h1>Novo Material para {obraContext.name}</h1>
            <RiArrowGoBackFill
              size={25}
              color={"#ffffff"}
              onClick={() => setPage("")}
            />
          </Title>
          <form onSubmit={handleMaterias}>
            <Input>
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
                placeholder="Nome do material"
              />
              <input
                type="text"
                value={formData.fornecedor}
                name="fornecedor"
                onChange={(e) => handleInput(e)}
                placeholder="Nome da Fornecedor"
              />
              <button type="submit" disabled={disabledButton}>
                {disabledButton ? (
                  <img width={50} height={50} src={loadImage} alt="Loading" />
                ) : (
                  "Salvar Material"
                )}
              </button>
            </Input>
          </form>
        </>
      )}
    </Container>
  );
}
