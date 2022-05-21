import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import TokenContext from "./contexts/TokenContext";
import ObraContext from "./contexts/ObraContext";
import FuncionarioContext from "./contexts/FuncionarioContext";
import FuncionariosContext from "./contexts/FuncionariosContext";
import SingUpPage from "./components/SingUpPage";
import ObrasPage from "./components/ObrasPage";
import ServicePage from "./components/ServicePage";
import EntradasPage from "./components/EntradasPage";
import DespesasPage from "./components/DespesasPage";
import FuncionariosPage from "./components/FuncionariosPage";
import FuncionarioDataPage from "./components/FuncionarioDataPage";
import EmpreitasPage from "./components/EmpreitasPage";
import MateriaisPage from "./components/MateriaisPage";

export default function App() {
  const [token, setToken] = useState("");
  const [obraContext, setObraContext] = useState({
    name: "",
    id: "",
  });
  const [funcionario, setFuncionario] = useState({
    id: "",
    nome: "",
    conta: "",
    agencia: "",
    operacao: "",
    pix: "",
  });
  const [funcionarios, setFuncionarios] = useState([
    {
      id: "",
      nome: "",
      conta: "",
      agencia: "",
      operacao: "",
      pix: "",
    },
  ]);
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <ObraContext.Provider value={{ obraContext, setObraContext }}>
        <FuncionarioContext.Provider value={{ funcionario, setFuncionario }}>
          <FuncionariosContext.Provider
            value={{ funcionarios, setFuncionarios }}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/sing-up" element={<SingUpPage />} />
                <Route path="/obras" element={<ObrasPage />} />
                <Route path="/obras/services" element={<ServicePage />} />
                <Route path="/entradas" element={<EntradasPage />} />
                <Route path="/despesas" element={<DespesasPage />} />
                <Route path="/funcionarios" element={<FuncionariosPage />} />
                <Route
                  path="/funcionarios/:id"
                  element={<FuncionarioDataPage />}
                />
                <Route path="/empreitas" element={<EmpreitasPage />} />
                <Route path="/materiais" element={<MateriaisPage />} />
              </Routes>
            </BrowserRouter>
          </FuncionariosContext.Provider>
        </FuncionarioContext.Provider>
      </ObraContext.Provider>
    </TokenContext.Provider>
  );
}
