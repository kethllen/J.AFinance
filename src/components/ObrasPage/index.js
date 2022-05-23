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
} from "./style";
import exit from "../../assets/exit.png";
import TokenContext from "../../contexts/TokenContext";
import * as api from "../../services/api";
import { FcPlus } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import Swal from "sweetalert2";
import loadImage from "../../assets/authLoad.svg";
import { BiHome } from "react-icons/bi";
import ObraContext from "../../contexts/ObraContext";

const maskOnlyNumbers = (value) => {
  return (Number(value.replace(/\D/g, "")) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export default function ObrasPage() {
  const { token, setToken } = useContext(TokenContext);
  const { obraContext, setObraContext } = useContext(ObraContext);
  const [page, setPage] = useState();
  const [obras, setObras] = useState([]);
  const [valor, setValor] = useState([]);
  const [disabledButton, setDisabledButton] = useState(false);
  const [errorData, setErrorData] = useState();
  const [formData, setFormData] = useState({
    name: "",
    valor: "",
  });
  const navigate = useNavigate();

  useEffect(async () => {
    const promise = await api.obrasGet(token);
    setObras(promise);
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

  async function handleObra(e) {
    e.preventDefault();
    setDisabledButton(true);
    setErrorData({ ...formData });
    setTimeout(() => setErrorData(), 3500);

    const imageNotEmpty = formData.valor !== "";
    const nameNotEmpty = formData.name !== "";
    const promise = await api.obrasPost(token, formData);
    if (promise === 409) {
      Swal.fire({
        icon: "error",
        title: "Ops...",
        text: "Este nome de obra ja está cadastrado!",
      });
    } else if (promise === 422) {
      Swal.fire({
        icon: "error",
        title: "Ops...",
        text: "Este formato esta errado!",
      });
    } else {
      setDisabledButton(false);
      setFormData({
        name: "",
        valor: "",
      });
      setValor("");
      setPage("");
    }
    setPage("");
  }
  return (
    <Container>
      {!page ? (
        <>
          <Title>
            <h1>Obras</h1>
            <img
              src={exit}
              onClick={() => {
                localStorage.setItem("token", "");
                setToken("");
                navigate("/");
              }}
            ></img>
          </Title>
          <Extrat>
            {!obras ? (
              <h1>
                Não há registros de<br></br>obras
              </h1>
            ) : (
              obras.map((n) => (
                <Linha key={n.id}>
                  <Description
                    onClick={() => {
                      setObraContext(n);
                      navigate("/obras/services");
                    }}
                  >
                    <FcHome size={30} />
                    <span>{n.name}</span>
                  </Description>
                </Linha>
              ))
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
            <h1>Nova Obra</h1>
            <BiHome size={25} color={"#ffffff"} onClick={() => setPage("")} />
          </Title>
          <form onSubmit={handleObra}>
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
                value={formData.name}
                name="name"
                onChange={(e) => handleInput(e)}
                placeholder="Nome da Obra"
              />
              <button type="submit" disabled={disabledButton}>
                {disabledButton ? (
                  <img width={50} height={50} src={loadImage} alt="Loading" />
                ) : (
                  "Salvar Obra"
                )}
              </button>
            </Input>
          </form>
        </>
      )}
    </Container>
  );
}
