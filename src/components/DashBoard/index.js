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
import { RiArrowGoBackFill, RiFolderUserLine } from "react-icons/ri";
import ObraContext from "../../contexts/ObraContext";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function EmpreitasPage() {
  const { token, setToken } = useContext(TokenContext);
  const { obraContext, setObraContext } = useContext(ObraContext);
  const [page, setPage] = useState();
  const [empreitas, setEmpreitas] = useState([]);
  const [valor, setValor] = useState([]);
  const [errorData, setErrorData] = useState();

  let total = 0;

  const navigate = useNavigate();

  useEffect(async () => {
    const promise = await api.despesasGet(token, obraContext.id);
    setDespesas(promise);
    console.log(empreitas);
    const promise2 = await api.funcionariosGet(token);
    setFuncionarios(promise2);
  }, [page]);
  if (token === "") return;

  return (
    <Container>
      <Title>
        <h1>{obraContext.name}</h1>
        <RiArrowGoBackFill
          size={28}
          color={"#ffffff"}
          onClick={() => navigate("/obras")}
        />
      </Title>
      <Extrat>
        {/* <Empreita>
          <Linha>
            <Description>
              <RiFolderUserLine size={30} color={"#ffffff"} />
              <span>{n.description}</span>
            </Description>
            <Valor font-weight={"entrada"}>{(n.valor / 100).toFixed(2)}</Valor>
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
        </Empreita> */}
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
//     <div style={{ width: "100%", height: 300 }}>
//       <ResponsiveContainer>
//         <PieChart>
//           <Pie
//             data={data}
//             cx={200}
//             cy={200}
//             labelLine={true}
//             label={renderLabel}
//             outerRadius={80}
//             fill="#8884d8"
//             dataKey="value"
//           >
//             {data.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={COLORS[index % COLORS.length]}
//               />
//             ))}
//           </Pie>
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
