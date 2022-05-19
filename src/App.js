import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import TokenContext from "./contexts/TokenContext";
import ObraContext from "./contexts/ObraContext";
import SingUpPage from "./components/SingUpPage";
import ObrasPage from "./components/ObrasPage";
import ServicePage from "./components/ServicePage";
import EntradasPage from "./components/EntradasPage";
import DespesasPage from "./components/DespesasPage";
import FuncionariosPage from "./components/FuncionariosPage";

export default function App() {
  const [token, setToken] = useState("");
  const [obraContext, setObraContext] = useState({
    name: "",
    id: "",
  });
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <ObraContext.Provider value={{ obraContext, setObraContext }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sing-up" element={<SingUpPage />} />
            <Route path="/obras" element={<ObrasPage />} />
            <Route path="/obras/services" element={<ServicePage />} />
            <Route path="/entradas" element={<EntradasPage />} />
            <Route path="/despesas" element={<DespesasPage />} />
            <Route path="/funcionarios" element={<FuncionariosPage />} />
          </Routes>
        </BrowserRouter>
      </ObraContext.Provider>
    </TokenContext.Provider>
  );
}
