import { useState } from "react";
import { getUsuarios } from "../services/api";

export default function App() {
  const [result, setResult] = useState([]);

  async function getUsuariosOnClick() {
    const data = await getUsuarios();
    setResult(data);
  }

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <button onClick={getUsuariosOnClick}>Ver Usuários</button>
      <ul>
        {result.map((usuario) => (
          <li key={usuario.id}>Nome: {usuario.nome} 
          Email: {usuario.email}</li>
        ))}
      </ul>
    </div>
  );
}
