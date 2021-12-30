import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function EditTherapie(props) {
  const [therapieInput, setTherapie] = useState({
    sous_therapie_id: "",
    nom: "",
    description: "",
    error_list: [],
  });

  const [therapielist, setTherapielist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/all-sous-therapie").then((res) => {
      if (res.data.status === 200) {
        setTherapielist(res.data.sous_therapie);
      }
    });

    const therap_id = props.match.params.id;
    axios.get(`/api/edit-sous-sous-therapie/${therap_id}`).then((res) => {
      if (res.data.status === 200) {
        setTherapie(res.data.sous_sous_therapie);
      }
      setLoading(false);
    });
  }, [props.match.params.id]);

  const handleInput = (e) => {
    e.persist();
    setTherapie({ ...therapieInput, [e.target.name]: e.target.value });
  };

  const submitTherapie = (e) => {
    e.preventDefault();

    const data = {
      sous_therapie_id: therapieInput.sous_therapie_id,
      nom: therapieInput.nom,
      description: therapieInput.description,
    };

    const therapie_id = props.match.params.id;
    axios
      .put(`/api/update-sous-sous-therapie/${therapie_id}`, data)
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
        } else if (res.data.status === 400) {
          setTherapie({
            ...therapieInput,
            error_list: res.data.validation_errors,
          });
        }
      });
  };

  if (loading) {
    return (
      <div className="wrapper">
        <div className="box-wrap">
          <div className="box one"></div>
          <div className="box two"></div>
          <div className="box three"></div>
          <div className="box four"></div>
          <div className="box five"></div>
          <div className="box six"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card mt-4">
        <div className="card-header">
          <h4 className="mt-4">
            Modifier Therapie
            <Link
              to="/admin/view-sous-sous-therapie"
              className="btn btn-primary btn-sm float-end"
            >
              Liste Classe Therapeutique
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={submitTherapie}>
            <div className="form-group mb-3">
              <label>Therapie</label>
              <select
                name="sous_therapie_id"
                onChange={handleInput}
                value={therapieInput.sous_therapie_id}
                className="form-control"
              >
                <option> Selectionner une Therapie </option>
                {therapielist &&
                  therapielist.map((item) => {
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
            </div>

            <button type="submit" className="btn btn-primary px-4 float-end">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditTherapie;
