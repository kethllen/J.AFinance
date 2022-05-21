import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Container,
  Extrat,
  Title,
  Description,
  Valor,
  Linha,
  Incluir,
  Input,
  Saldo,
} from "./style";
import { useParams } from "react-router-dom";
import FuncionariosContext from "../../contexts/FuncionariosContext";
import TokenContext from "../../contexts/TokenContext";
import * as api from "../../services/api";
import { FcPlus } from "react-icons/fc";
import { FaUserAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import loadImage from "../../assets/authLoad.svg";
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiHome } from "react-icons/bi";
import ObraContext from "../../contexts/ObraContext";
import FechamentosContext from "../../contexts/FechamentosContext";

const maskOnlyNumbers = (value) => {
  return (Number(value.replace(/\D/g, "")) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export default function PagamentosPage() {
  const { token, setToken } = useContext(TokenContext);
  const { funcionarios, setFuncionarios } = useContext(FuncionariosContext);
  const { fechamentos, setFechamentos } = useContext(FechamentosContext);
  const { obraContext, setObraContext } = useContext(ObraContext);
  const [page, setPage] = useState("");
  const [pagamentos, setPagamentos] = useState([]);
  const [empreitas, setEmpreitas] = useState([]);
  const [disabledButton, setDisabledButton] = useState(false);
  const [valor, setValor] = useState([]);
  const [errorData, setErrorData] = useState();
  let data = "";
  let total = 0;
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fechamentoId: parseInt(id),
    empreitaId: 0,
    funcionarioId: 1,
    valor: 0,
    quantDias: "",
  });
  const empreitasOptions = [
    {
      id: 0,
      obraId: "",
      funcionarioId: "",
      valor: "",
      description: "DIARISTA",
    },
    ...empreitas,
  ];
  const navigate = useNavigate();

  useEffect(async () => {
    const promise = await api.empreitasGet(token, obraContext.id);
    setEmpreitas(promise);
    const promise2 = await api.funcionariosGet(token);
    setFuncionarios(promise2);
    const aux = fechamentos.filter((n) => n.id == parseInt(id));
    data = aux.data;
    setPagamentos(aux);
    console.log("AUX");
    console.log(aux);
  }, [page]);
  if (token === "") return;

  function handleInput(e) {
    if (e.target.name == "valor") {
      const valor = parseInt(e.target.value.replace(/\D/g, ""));
      setFormData({ ...formData, [e.target.name]: valor });
    } else {
      if (e.target.name == "quantDias") {
        const dias = parseInt(e.target.value);
        setFormData({ ...formData, [e.target.name]: dias });
      } else {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
    }
  }

  async function handlePagamentos(e) {
    e.preventDefault();
    setDisabledButton(true);

    const promise = await api.pagamentosPost(token, formData);

    if (promise === 409) {
      return Swal.fire({
        icon: "error",
        title: "Ops...",
        text: "Este nome de funcionario ja está cadastrado!",
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
  pagamentos?.map((n) => (total += n.valor));
  return (
    <Container>
      {!page ? (
        <>
          <Title>
            <h1>Pagamentos</h1>
            <RiArrowGoBackFill
              size={28}
              color={"#ffffff"}
              onClick={() => navigate("/fechamentos")}
            />
          </Title>
          <Extrat>
            {!pagamentos ? (
              <h1>
                Não há registros de<br></br>pagamentos
              </h1>
            ) : (
              pagamentos?.map((n) => (
                <Linha>
                  <Description>
                    <FaUserAlt size={25} color={"#ffffff"} />
                    <span>{n.funcionario.nome}</span>
                  </Description>
                  <Valor color={"saida"}>{(n.valor / 100).toFixed(2)}</Valor>
                </Linha>
              ))
            )}
            {!pagamentos ? (
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
              <FcPlus size={40} />
            </div>
          </Incluir>
        </>
      ) : (
        <>
          <Title>
            <h1>Novo Pagamento</h1>
            <RiArrowGoBackFill
              size={25}
              color={"#ffffff"}
              onClick={() => setPage("")}
            />
          </Title>
          <form onSubmit={handlePagamentos}>
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
              <select
                value={formData.empreitaId}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    empreitaId: parseInt(e.target.value),
                  });
                }}
              >
                {empreitasOptions.map((f) => (
                  <option value={f.id}>{f.description}</option>
                ))}
              </select>
              <input
                type="number"
                value={formData.quantDias}
                name="quantDias"
                onChange={(e) => handleInput(e)}
                placeholder="Quant. Dias"
              />
              <input
                value={valor}
                name="valor"
                onChange={(e) => {
                  setValor(maskOnlyNumbers(e.target.value));
                  handleInput(e);
                }}
                placeholder="Valor"
              />
              <button type="submit" disabled={disabledButton}>
                {disabledButton ? (
                  <img width={50} height={50} src={loadImage} alt="Loading" />
                ) : (
                  "Salvar Pagamentos"
                )}
              </button>
            </Input>
          </form>
        </>
      )}
    </Container>
  );
}
