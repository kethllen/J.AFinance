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
import * as api from "../../services/api";
import { RiArrowGoBackFill } from "react-icons/ri";
import ObraContext from "../../contexts/ObraContext";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { GiReceiveMoney, GiPayMoney, GiMoneyStack } from "react-icons/gi";
import { HiPencilAlt } from "react-icons/hi";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { IoConstructSharp } from "react-icons/io5";
import { GoGraph } from "react-icons/go";

export default function DashboardPage() {
  const { token, setToken } = useContext(TokenContext);
  const { obraContext, setObraContext } = useContext(ObraContext);
  const [page, setPage] = useState();
  const [despesas, setDespesas] = useState([]);
  const [entradas, setEntradas] = useState([]);
  const [materiais, setMateriais] = useState([]);
  const [fechamentos, setFechamentos] = useState([]);
  const [valor, setValor] = useState([]);
  const [errorData, setErrorData] = useState();

  let total = 0;

  const navigate = useNavigate();

  useEffect(async () => {
    const promise = await api.despesasGet(token, obraContext.id);
    setDespesas(promise);
    const promise3 = await api.fechamentosGet(token, obraContext.id);
    setFechamentos(promise3);
    const promise4 = await api.materiaisGet(token, obraContext.id);
    setMateriais(promise4);
  }, [page]);

  let valorDespesas = 0;
  despesas.map((n) => (valorDespesas += n.valor));

  let valorEntradas = obraContext.valorAtual;

  let valorMateriais = 0;
  materiais.map((n) => (valorMateriais += n.valor));

  let valorMaoDeObra = 0;
  fechamentos.map((n) => (valorMaoDeObra += n.valor));

  const saidas = valorDespesas + valorMateriais + valorMaoDeObra;

  const lucro = obraContext.valor - saidas;
  const valorEmCaixa = valorEntradas - saidas;
  if (token === "") return;
  const data = [
    { name: "Lucro", value: lucro },
    { name: "MãoDeObra", value: valorMaoDeObra },
    { name: "Despesas", value: valorDespesas },
    { name: "Materiais", value: valorMateriais },
  ];

  const COLORS = ["#008000", "#ffff00", "#c70000", "#f24f00"];

  const RADIAN = Math.PI / 180;
  let renderLabel = function (entry) {
    return entry.name;
  };

  function formatarValor(valor) {
    const atual = valor / 100;
    const f2 = atual.toLocaleString("pt-br", { minimumFractionDigits: 2 });

    return f2;
  }
  return (
    <Container>
      <Title>
        <div>
          <GoGraph size={25} color={"#ffffff"} />
          <h1>{obraContext.name}</h1>
        </div>
        <RiArrowGoBackFill
          size={28}
          color={"#ffffff"}
          onClick={() => navigate("/obras")}
        />
      </Title>
      <Extrat>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx={150}
                cy={100}
                labelLine={true}
                label={renderLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <Empreita>
          <Linha>
            <Description>
              <FaBalanceScaleLeft size={30} color={"#000000"} />
              <span>Valor em Caixa</span>
            </Description>
            <Valor font-weight={"entrada"}>{formatarValor(valorEmCaixa)}</Valor>
          </Linha>
          <Linha>
            <Description>
              <GiReceiveMoney size={30} color={"#ffffff"} />
              <span>Entradas</span>
            </Description>
            <Valor font-weight={"entrada"}>
              {formatarValor(valorEntradas)}
            </Valor>
          </Linha>
          <Linha>
            <Description>
              <GiPayMoney size={30} color={"#c70000"} />
              <span>Despesas</span>
            </Description>
            <Valor font-weight={"entrada"}>
              {formatarValor(valorDespesas)}
            </Valor>
          </Linha>
          <Linha>
            <Description>
              <IoConstructSharp size={30} color={"#f24f00"} />
              <span>Materiais</span>
            </Description>
            <Valor font-weight={"entrada"}>
              {formatarValor(valorMateriais)}
            </Valor>
          </Linha>
          <Linha>
            <Description>
              <HiPencilAlt size={30} color={"#ffff00"} />
              <span>Mão-de-Obra</span>
            </Description>
            <Valor font-weight={"entrada"}>
              {formatarValor(valorMaoDeObra)}
            </Valor>
          </Linha>
          <Linha>
            <Description>
              <GiMoneyStack size={30} color={"#008000"} />
              <span>Lucro Atual</span>
            </Description>
            <Valor font-weight={"entrada"}>{formatarValor(lucro)}</Valor>
          </Linha>
        </Empreita>
      </Extrat>
    </Container>
  );
}

// import "./styles.css";
// import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// const data = [
//   { name: "Group A", value: 584 },
//   { name: "Group B", value: 389 },
//   { name: "Group C", value: 759 },
//   { name: "Group D", value: 875 },
// ];

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// const RADIAN = Math.PI / 180;
// let renderLabel = function (entry) {
//   return entry.name;
// };
// export default function App() {
//   return (

//   );
// }
