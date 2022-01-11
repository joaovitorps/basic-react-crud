import React, { useEffect, useState } from "react";

import api, { urlDevelopment } from "../Api";
import { Link } from "react-router-dom";

const Form = ({ usuario, buscarUsuarios }) => {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [foto, setFoto] = useState("");

  const prepararUploadFoto = () => {
    const formData = new FormData();

    formData.append("foto", foto, foto.name);

    return api.post("uploadFoto", formData);
  };

  const editar = (id) => {
    api.put("editar/" + id).then(() => alert("Editado com sucesso!"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usuario) {
      editar(editar.id);
    } else {
      let uploadFoto = null;
      if (foto) {
        uploadFoto = prepararUploadFoto();
      }

      let dadosForm = api.post("inserir", {
        nome: nome,
        data_nascimento: dataNascimento,
        foto: foto.name,
      });

      Promise.all([dadosForm, uploadFoto]).then(() => {
        setNome("");
        setDataNascimento("");
        setFoto("");
        buscarUsuarios();
      });
    }
  };

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome);
      setDataNascimento(usuario.data_nascimento);
      setFoto(usuario.foto);
    } else {
      setNome("");
      setDataNascimento("");
      setFoto("");
    }
  }, [usuario]);

  return (
    <form onSubmit={handleSubmit}>
      {usuario && (
        <img
          src={urlDevelopment + "basic-react-crud-back-end/img/" + usuario.foto}
          className="mx-auto d-block rounded float-start rounded-circle mb-3"
          alt="FotoUsuario"
          width="150px"
          height="150px"
        />
      )}
      <div className="row">
        <div className="col">
          <label htmlFor="inputNome" className="form-label">
            Nome
          </label>
          <input
            className="form-control"
            type="text"
            id="inputNome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="col">
          <label htmlFor="inputDataNascimento" className="form-label">
            Data de Nascimento
          </label>
          <input
            className="form-control"
            type="date"
            id="inputDataNascimento"
            name="data_nascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </div>
        {!usuario && (
          <div className="col">
            <label htmlFor="formFile" className="form-label">
              Foto
            </label>
            <input
              className="form-control"
              type="file"
              id="inputFoto"
              name="foto"
              onChange={(e) => setFoto(e.target.files[0])}
              required
            />
          </div>
        )}
      </div>
      <div className="float-right my-4">
        {usuario && (
          <Link to="/" className="btn btn-sm btn-secondary mr-1">
            Voltar
          </Link>
        )}
        <button className="btn btn-sm btn-success" type="submit">
          Salvar {usuario && "edição"}
        </button>
      </div>
    </form>
  );
};

export default Form;
