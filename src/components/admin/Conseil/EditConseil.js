import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

function EditConseil(props) {
  const [loading, setLoading] = useState(true);
  const [conseilInput, setConseil] = useState([]);
  const history = useHistory();
  const [error, setErrors] = useState([]);

  useEffect(() => {
    const conseil_id = props.match.params.id;
    axios.get(`api/edit-conseil/${conseil_id}`).then((res) => {
      if (res.data.status === 200) {
        setConseil(res.data.conseil);
      } else if (res.data.status === 400) {
        swal("Erreur", res.data.message, "error");
        history.push("/admin/view-conseil");
      }
      setLoading(false);
    });
  }, [props.match.params.id, history]);

  const handleInput = (e) => {
    e.persist();
    setConseil({ ...conseilInput, [e.target.name]: e.target.value });
  };

  const updateConseil = (e) => {
    e.preventDefault();

    const data = {
      titre: conseilInput.titre,
      description: conseilInput.description,
      resume: conseilInput.resume,

    };
    const conseil_id = props.match.params.id;
    axios.put(`/api/update-conseil/${conseil_id}`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setErrors([]);
        history.push("/admin/view-conseil");
      } else if (res.data.status === 422) {
        swal("Tous les Champs ne sont pas remplis", "", "error");
        setErrors(res.data.errors);
      } else if (res.data.status === 404) {
        swal("Erreur", res.data.message, "error");
        history.push("/admin/view-conseil");
      }
    });
  };

  if (loading) {
    return (
      <div className="lds-ripple"><div></div><div></div></div>
    );
  }

  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4 className="mt-4">
            Modifier conseil
            <Link
              to="/admin/view-conseil"
              className="btn btn-primary btn-sm float-end"
            >
              Retour
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={updateConseil}>
            <div className="form-group mb-3">
              <label>Nom du conseil</label>
              <input
                type="text"
                name="titre"
                onChange={handleInput}
                value={conseilInput.titre}
                className="form-control"
              />
              <span className="text-danger">{error.titre}</span>
            </div>
            <div className="form-group mb-3">
              <label>Description du conseil</label>
              <input
                type="text"
                name="description"
                onChange={handleInput}
                value={conseilInput.description}
                className="form-control"
              />
              <span className="text-danger">{error.description}</span>
            </div>
            <div className="form-group mb-3">
              <label>Resume du conseil</label>
              <input
                type="text"
                name="resume"
                onChange={handleInput}
                value={conseilInput.resume}
                className="form-control"
              />
              <span className="text-danger">{error.resume}</span>
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

export default EditConseil;
