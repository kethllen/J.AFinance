import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import TokenContext from "./contexts/TokenContext";
import NameContext from "./contexts/NameContext";
import SingUpPage from "./components/SingUpPage";
import ExtractPage from "./components/ExtractPage";
import EntradaPage from "./components/EntradaPage";
import SaidaPage from "./components/SaidaPage";

export default function App() {
  const [token, setToken] = useState("");
  const [nameContext, setNameContext] = useState("");
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <NameContext.Provider value={{ nameContext, setNameContext }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sing-up" element={<SingUpPage />} />
            <Route path="/extract" element={<ExtractPage />} />
            <Route path="/entrada" element={<EntradaPage />} />
            <Route path="/saida" element={<SaidaPage />} />
          </Routes>
        </BrowserRouter>
      </NameContext.Provider>
    </TokenContext.Provider>
  );
}
