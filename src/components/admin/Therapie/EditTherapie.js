import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

function EditTherapie(props) {
  const [loading, setLoading] = useState(true);
  const [therapieInput, setTherapie] = useState([]);
  const history = useHistory();
  const [error, setErrors] = useState([]);

  useEffect(() => {
    const therapie_id = props.match.params.id;
    axios.get(`api/edit-therapie/${therapie_id}`).then((res) => {
      if (res.data.status === 200) {
        setTherapie(res.data.therapie);
      } else if (res.data.status === 400) {
        swal("Erreur", res.data.message, "error");
        history.push("/admin/view-therapie");
      }
      setLoading(false);
    });
  }, [props.match.params.id, history]);

  const handleInput = (e) => {
    e.persist();
    setTherapie({ ...therapieInput, [e.target.name]: e.target.value });
  };

  const updateTherapie = (e) => {
    e.preventDefault();

    const data = {
      nom: therapieInput.nom,
      description: therapieInput.description,

    };
    const therapie_id = props.match.params.id;
    axios.put(`/api/update-therapie/${therapie_id}`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setErrors([]);
        history.push("/admin/view-therapie");
      } else if (res.data.status === 422) {
        swal("Tous les Champs ne sont pas remplis", "", "error");
        setErrors(res.data.errors);
      } else if (res.data.status === 404) {
        swal("Erreur", res.data.message, "error");
        history.push("/admin/view-therapie");
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
  }

  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4 className="mt-4">
            Modifier la Classe Thérapeutique
            <Link
              to="/admin/view-therapie"
              className="btn btn-primary btn-sm float-end"
            >
              Retour
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={updateTherapie}>
            <div className="form-group mb-3">
              <label>Nom de la Classe Thérapeutique</label>
              <input
                type="text"
                name="nom"
                onChange={handleInput}
                value={therapieInput.nom}
                className="form-control"
              />
              <span className="text-danger">{error.nom}</span>
            </div>
            <div className="form-group mb-3">
              <label>Description de la Classe Thérapeutique</label>
              <input
                type="text"
                name="description"
                onChange={handleInput}
                value={therapieInput.description}
                className="form-control"
              />
              <span className="text-danger">{error.description}</span>
            </div>
            
            

            <button type="submit" className="btn btn-primary px-4 float-end">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTherapie;
