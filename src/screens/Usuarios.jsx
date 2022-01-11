import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../Api";
import Form from "./Form";

const Usuarios = () => {
  const { id } = useParams();

  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState(null);

  const buscarUsuario = (id) => {
    api.get("/obter/" + id).then((response) => {
      setUsuario(response.data);
    });
  };

  const buscarUsuarios = () => {
    api.get().then((response) => {
      setUsuarios(response.data);
    });
  };

  useEffect(() => {
    if (id) {
      buscarUsuario(id);
    } else {
      buscarUsuarios();
      setUsuario(null);
    }
  }, [id]);

  return (
    <div className="container mt-5">
      <h1 className="mb-5">Teste cadastro básico usuário</h1>
      <Form usuario={usuario} buscarUsuarios={buscarUsuarios} />
      {!id && <Tabela usuarios={usuarios} buscarUsuarios={buscarUsuarios} />}
    </div>
  );
};

const Tabela = ({ usuarios, ...others }) => {
  return (
    <table className="table table-sm table-bordered table-hover">
      <thead>
        <tr>
          <th width="5%">Id</th>
          <th>Nome</th>
          <th className="text-center" width="15%">
            Data Nascimento
          </th>
          <th className="text-center" width="5%">
            Editar
          </th>
          <th className="text-center" width="5%">
            Deletar
          </th>
        </tr>
      </thead>
      <tbody>
        {usuarios.length > 0 ? (
          usuarios.map(({ id, nome, data_nascimento }) => (
            <Usuario
              key={id}
              id={id}
              nome={nome}
              dataNascimento={data_nascimento}
              {...others}
            />
          ))
        ) : (
          <tr>
            <td className="text-center" colSpan="5">
              Não existem itens para serem exibidos!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const Usuario = ({ id, nome, dataNascimento, buscarUsuarios }) => {
  const tratarData = (data) => {
    let dataTratada = data.split("-").reverse().join("/");

    return dataTratada;
  };

  const deletar = (id, nome) => {
    if (window.confirm(`Você realmente deletar o usuario ${nome}?`)) {
      api.delete("deletar/" + id).then(() => {
        buscarUsuarios();
      });
    }
  };
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{nome}</td>
      <td className="text-center">{tratarData(dataNascimento)}</td>
      <td className="text-center">
        <Link className="btn btn-sm btn-primary" to={id}>
          <i className="bi bi-pencil"></i>
        </Link>
      </td>
      <td className="text-center">
        <button
          className="btn btn-sm btn-danger"
          onClick={() => deletar(id, nome)}
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </td>
    </tr>
  );
};

export default Usuarios;
