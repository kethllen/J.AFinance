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
import FechamentosContext from "../../contexts/FechamentosContext";
import * as api from "../../services/api";
import { FcPlus } from "react-icons/fc";
import { HiPencilAlt } from "react-icons/hi";
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

export default function FechamentosPage() {
  const { token, setToken } = useContext(TokenContext);
  const { obraContext, setObraContext } = useContext(ObraContext);
  const [page, setPage] = useState();
  const { fechamentos, setFechamentos } = useContext(FechamentosContext);
  const [valor, setValor] = useState([]);
  const [disabledButton, setDisabledButton] = useState(false);
  const [errorData, setErrorData] = useState();
  const date = dayjs().format("DD-MM-YYYY");
  let total = 0;
  const [formData, setFormData] = useState({
    obraId: parseInt(obraContext.id),
    data: date,
  });
  const navigate = useNavigate();

  useEffect(async () => {
    const promise = await api.fechamentosGet(token, obraContext.id);
    setFechamentos(promise);
  }, [page]);
  if (token === "") return;
  function formatarValor(valor) {
    const atual = valor / 100;
    const f2 = atual.toLocaleString("pt-br", { minimumFractionDigits: 2 });

    return f2;
  }
  function handleInput(e) {
    if (e.target.name == "valor") {
      const valor = parseInt(e.target.value.replace(/\D/g, ""));
      setFormData({ ...formData, [e.target.name]: valor });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  async function createFechamento() {
    setDisabledButton(true);
    setPage("inserir");
    const promise = await api.fechamentosPost(token, formData);
    if (promise === 401) {
      Swal.fire({
        icon: "error",
        title: "Ops...",
        text: "Este nome de obra não está cadastrado!",
      });
    } else if (promise === 422) {
      Swal.fire({
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

  async function handleFechamento(e) {
    e.preventDefault();
    setDisabledButton(true);
    setErrorData({ ...formData });
    setTimeout(() => setErrorData(), 3500);

    const promise = await api.fechamentosPost(token, formData);
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
  fechamentos.map((n) => (total += n.valor));
  fechamentos.sort(function (a, b) {
    return a.id - b.id;
  });
  return (
    <Container>
      {!page ? (
        <>
          <Title>
            <h1>Fechamentos</h1>
            <RiArrowGoBackFill
              size={28}
              color={"#ffffff"}
              onClick={() => navigate("/obras/services")}
            />
          </Title>
          <Extrat>
            {!fechamentos ? (
              <h1>
                Não há registros de<br></br>fechamentos para esta obra!
              </h1>
            ) : (
              fechamentos.map((n) => (
                <Linha
                  key={n.id}
                  onClick={() => navigate(`/fechamentos/${n.id}/pagamentos`)}
                >
                  <Description>
                    <HiPencilAlt size={30} color={"#ffffff"} />
                    <p className="data">{n.data}</p>
                  </Description>

                  <Valor color={"saida"}>{formatarValor(n.valor)}</Valor>
                </Linha>
              ))
            )}
            {!fechamentos ? (
              ""
            ) : (
              <Saldo color={"saida"}>
                <span>Total</span>
                <div className="value">{formatarValor(total)}</div>
              </Saldo>
            )}
          </Extrat>
          <Incluir onClick={() => createFechamento()}>
            <div>
              <FcPlus size={50} />
            </div>
          </Incluir>
        </>
      ) : (
        <img width={150} height={150} src={loadImage} alt="Loading" />
      )}
    </Container>
  );
}
