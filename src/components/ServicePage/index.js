import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Container, Services, Title } from "./style";
import exit from "../../assets/exit.png";
import TokenContext from "../../contexts/TokenContext";
import ObraContext from "../../contexts/ObraContext";
import * as api from "../../services/api";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { HiPencilAlt } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { BiHome } from "react-icons/bi";
import { IoConstructSharp } from "react-icons/io5";
import { RiFolderUserLine } from "react-icons/ri";
import { GoGraph } from "react-icons/go";

export default function ObrasPage() {
  const { token, setToken } = useContext(TokenContext);
  const { obraContext } = useContext(ObraContext);
  const navigate = useNavigate();

  return (
    <Container>
      <Title>
        <div>
          <GoGraph size={25} color={"#ffffff"} />
          <h1>{obraContext.name}</h1>
        </div>
        <BiHome
          size={28}
          color={"#ffffff"}
          onClick={() => navigate("/obras")}
        />
      </Title>
      <Services>
        <div onClick={() => navigate("/entradas")}>
          <GiReceiveMoney size={35} color={"#ffffff"} />
          Entradas
        </div>
        <div onClick={() => navigate("/despesas")}>
          <GiPayMoney size={35} color={"#ffffff"} />
          Despesas
        </div>
        <div>
          <HiPencilAlt size={35} color={"#ffffff"} />
          Fechamentos
        </div>
        <div onClick={() => navigate("/funcionarios")}>
          <FaUsers size={35} color={"#ffffff"} />
          Funcionarios
        </div>
        <div>
          <IoConstructSharp size={35} color={"#ffffff"} />
          Materiais
        </div>
        <div onClick={() => navigate("/empreitas")}>
          <RiFolderUserLine size={35} color={"#ffffff"} />
          Empreitas
        </div>
      </Services>
    </Container>
  );
}
