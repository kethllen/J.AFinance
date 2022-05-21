import React, { useContext, useState, useRef } from "react";
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
import FuncionarioContext from "../../contexts/FuncionarioContext";
import TokenContext from "../../contexts/TokenContext";
import * as api from "../../services/api";
import { FcPlus } from "react-icons/fc";
import { FaUserEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import loadImage from "../../assets/authLoad.svg";
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiHome } from "react-icons/bi";
import ObraContext from "../../contexts/ObraContext";

export default function FuncionarioDataPage() {
  const { token, setToken } = useContext(TokenContext);
  const { funcionario, setFuncionario } = useContext(FuncionarioContext);
  const [page, setPage] = useState();
  const [disabledButton, setDisabledButton] = useState(false);
  const [errorData, setErrorData] = useState();
  const inputRef = useRef(null);
  const [formData, setFormData] = useState({
    nome: funcionario.nome,
    conta: funcionario.conta,
    agencia: funcionario.agencia,
    operacao: funcionario.operacao,
    pix: funcionario.pix,
  });
  const navigate = useNavigate();

  if (token === "") return;

  function handleInput(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleFuncionario(e) {
    e.preventDefault();
    setDisabledButton(true);
    setErrorData({ ...formData });
    setTimeout(() => setErrorData(), 3500);

    const promise = await api.funcionariosUpdate(
      token,
      funcionario.id,
      formData
    );
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
  return (
    <Container>
      <Title>
        {!page ? (
          <h1>{funcionario.nome}</h1>
        ) : (
          <>
            <h1>Editar</h1>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={(e) => handleInput(e)}
            ></input>
          </>
        )}
        <RiArrowGoBackFill
          size={28}
          color={"#ffffff"}
          onClick={() => navigate("/obras/services")}
        />
      </Title>
      <Extrat>
        <Linha>
          <Description>
            <span>Conta: </span>
            {!page ? (
              <span>{funcionario.conta}</span>
            ) : (
              <>
                <input
                  type="text"
                  name="conta"
                  value={formData.conta}
                  onChange={(e) => handleInput(e)}
                ></input>
              </>
            )}
          </Description>
        </Linha>
        <Linha>
          <Description>
            <span>Agencia: </span>
            {!page ? (
              <span>{funcionario.agencia}</span>
            ) : (
              <>
                <input
                  type="text"
                  name="agencia"
                  value={formData.agencia}
                  onChange={(e) => handleInput(e)}
                ></input>
              </>
            )}
          </Description>
        </Linha>
        <Linha>
          <Description>
            <span>Operação: </span>
            {!page ? (
              <span>{funcionario.operacao}</span>
            ) : (
              <>
                <input
                  type="text"
                  name="operacao"
                  value={formData.operacao}
                  onChange={(e) => handleInput(e)}
                ></input>
              </>
            )}
          </Description>
        </Linha>
        <Linha>
          <Description>
            <span>Pix: </span>
            {!page ? (
              <span>{funcionario.pix}</span>
            ) : (
              <>
                <input
                  type="text"
                  name="pix"
                  value={formData.pix}
                  onChange={(e) => handleInput(e)}
                ></input>
              </>
            )}
          </Description>
        </Linha>
        {page && (
          <Input>
            <button
              disabled={disabledButton}
              onClick={(e) => handleFuncionario(e)}
            >
              {disabledButton ? (
                <img width={50} height={50} src={loadImage} alt="Loading" />
              ) : (
                "Salvar Alterações"
              )}
            </button>
          </Input>
        )}
        <Incluir onClick={() => setPage("editar")}>
          <div>
            <FaUserEdit size={40} color={"#ffffff"} />
          </div>
        </Incluir>
      </Extrat>
      {/*        
          <Title>
            <h1>Editar Funcionario</h1>
            <RiArrowGoBackFill
              size={25}
              color={"#ffffff"}
              onClick={() => setPage("")}
            />
          </Title>
          <form onSubmit={handleFuncionario}>
            <Input>
              <input
                type="text"
                value={formData.nome}
                name="nome"
                onChange={(e) => handleInput(e)}
                placeholder="Nome"
              />
              <input
                type="text"
                value={formData.conta}
                name="conta"
                onChange={(e) => handleInput(e)}
                placeholder="Conta"
              />
              <input
                type="text"
                value={formData.agencia}
                name="agencia"
                onChange={(e) => handleInput(e)}
                placeholder="Agencia"
              />
              <input
                type="text"
                value={formData.operacao}
                name="operacao"
                onChange={(e) => handleInput(e)}
                placeholder="Operação"
              />
              <input
                type="text"
                value={formData.pix}
                name="pix"
                onChange={(e) => handleInput(e)}
                placeholder="Chave pix"
              />
              <button type="submit" disabled={disabledButton}>
                {disabledButton ? (
                  <img width={50} height={50} src={loadImage} alt="Loading" />
                ) : (
                  "Salvar Funcionario"
                )}
              </button>
            </Input>
          </form>
        </>
      )} */}
    </Container>
  );
}
