import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Therapie = () => {
  const [therapieInput, setTherapie] = useState({
    therapie_id: "",
    nom: "",
    description: "",
    error_list: [],
  });

  const [therapielist, setTherapielist] = useState([]);

  useEffect(() => {
    axios.get("/api/all-therapie").then((res) => {
      if (res.data.status === 200) {
        setTherapielist(res.data.therapie);
      }
    });
  }, []);

  const handleInput = (e) => {
    e.persist();
    setTherapie({ ...therapieInput, [e.target.name]: e.target.value });
  };

  const submitTherapie = (e) => {
    e.preventDefault();

    const data = {
      therapie_id: therapieInput.therapie_id,
      nom: therapieInput.nom,
      description: therapieInput.description,
    };

    axios.post(`/api/store-sous-therapie`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setTherapie({
          nom: "",
          description: "",
          error_list: [],
        });
      } else if (res.data.status === 400) {
        setTherapie({
          ...therapieInput,
          error_list: res.data.validation_errors,
        });
      }
    });
  };
  return (
    <div className="card mt-4">
      <div className="card-header">
        <h4 className="mt-4">
          Ajouter une Classe Sous Therapeutique
          <Link
            to="/admin/view-sous-therapie"
            className="btn btn-primary btn-sm float-end"
          >
            Liste Classe Sous Therapeutique
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <form onSubmit={submitTherapie}>
          <div className="form-group mb-3">
            <label>Classe Therapeutique</label>
            <select
              name="therapie_id"
              onChange={handleInput}
              value={therapieInput.therapie_id}
              className="form-control"
            >
              <option>Selectionner une Therapie</option>
              {therapielist.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.nom}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group mb-3">
            <label>Nom Therapie</label>
            <input
              type="text"
              name="nom"
              onChange={handleInput}
              value={therapieInput.nom}
              className="form-control"
            />
            <span className="text-danger">{therapieInput.error_list.nom}</span>
          </div>

          <div className="form-group mb-3">
            <label>Description de la Therapie</label>
            <input
              type="text"
              name="description"
              onChange={handleInput}
              value={therapieInput.description}
              className="form-control"
            />
            <span className="text-danger">
              {therapieInput.error_list.description}
            </span>
          </div>

          <button type="submit" className="btn btn-primary px-4 float-end">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Therapie;
