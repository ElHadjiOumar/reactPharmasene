import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

function EditMedicament(props) {
  const history = useHistory();
  const [medicamentInput, setMedicament] = useState({
    nom_commercial: "",
    dci: "",
    tableau: "",
    medicament_prix: "",
    forme: "",
    dosage: "",
    classe_therapeutique: "",
    posologie: "",
    error_list: [],
  });
  const [photo, setPhoto] = useState([]);

  const [medicamentlist, setMedicamentlist] = useState([]);
  const [errorlist, setError] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleImage = (e) => {
    setPhoto({ image: e.target.files[0] });
  };

  useEffect(() => {
    axios.get("/api/all-sous-sous-therapie").then((res) => {
      if (res.data.status === 200) {
        setMedicamentlist(res.data.sous_sous_therapie);
      }
    });

    const medica_id = props.match.params.id;
    axios.get(`/api/edit-medicament/${medica_id}`).then((res) => {
      if (res.data.status === 200) {
        setMedicament(res.data.medicament);
      } else if (res.data.status === 400) {
        swal("Erreur", res.data.message, "error");
        history.push("/admin/view-medicament");
      }
      setLoading(false);
    });
  }, [props.match.params.id, history]);

  const handleInput = (e) => {
    e.persist();
    setMedicament({ ...medicamentInput, [e.target.name]: e.target.value });
  };

  const submitMedicament = (e) => {
    e.preventDefault();

    // const formData = new FormData();

    // formData.append(
    //   "sous_sous_therapie_id",
    //   medicamentInput.sous_sous_therapie_id
    // );
    // formData.append("nom_commercial", medicamentInput.nom_commercial);
    // formData.append(
    //   "medicament_categorie",
    //   medicamentInput.medicament_categorie
    // );
    // formData.append(
    //   "medicament_reference",
    //   medicamentInput.medicament_reference
    // );
    // formData.append("medicament_prix", medicamentInput.medicament_prix);
    // formData.append("image", photo.image);

    const data = {
      image: photo,
      nom_commercial: medicamentInput.nom_commercial,
      dci: medicamentInput.dci,
      tableau: medicamentInput.tableau,
      medicament_prix: medicamentInput.medicament_prix,
      forme: medicamentInput.forme,
      dosage: medicamentInput.dosage,
      classe_therapeutique: medicamentInput.classe_therapeutique,
      posologie: medicamentInput.posologie,
    };
    const medicament_id = props.match.params.id;
    axios.put(`/api/update-medicament/${medicament_id}`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 400) {
        swal("Tous les Champs ne sont pas remplis", "", "error");
        setError(res.data.errors);
      } else if (res.data.status === 404) {
        swal("Erreur", res.data.message, "error");
        history.push("/admin/view-medicament");
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
            Modifier un Medicament
            <Link
              to="/admin/view-medicament"
              className="btn btn-primary btn-sm float-end"
            >
              Liste Medicaments
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={submitMedicament}>
             <div className="form-group mb-3">
            <label>Nom commercial</label>
            <input
              type="text"
              name="nom_commercial"
              onChange={handleInput}
              value={medicamentInput.nom_commercial}
              className="form-control"
            />
            <span className="text-danger">
              {medicamentInput.error_list.nom_commercial}
            </span>
          </div>
          <div className="form-group mb-3">
            <label>DCI</label>
            <input
              type="text"
              name="dci"
              onChange={handleInput}
              value={medicamentInput.dci}
              className="form-control"
            />
            <span className="text-danger">
              {medicamentInput.error_list.dci}
            </span>
          </div>
          <div className="form-group mb-3">
            <label>TABLEAU</label>
            <input
              type="text"
              name="tableau"
              onChange={handleInput}
              value={medicamentInput.tableau}
              className="form-control"
            />
            <span className="text-danger">
              {medicamentInput.error_list.tableau}
            </span>
          </div>
          <div className="form-group mb-3">
            <label>Prix du Medicament</label>
            <input
              type="text"
              name="medicament_prix"
              onChange={handleInput}
              value={medicamentInput.medicament_prix}
              className="form-control"
            />
            <span className="text-danger">
              {medicamentInput.error_list.medicament_prix}
            </span>
          </div>
          <div className="form-group mb-3">
            <label>Forme </label>
            <input
              type="text"
              name="medicament_prix"
              onChange={handleInput}
              value={medicamentInput.forme}
              className="form-control"
            />
            <span className="text-danger">
              {medicamentInput.error_list.forme}
            </span>
          </div>
          <div className="form-group mb-3">
            <label>Dosage</label>
            <input
              type="text"
              name="medicament_prix"
              onChange={handleInput}
              value={medicamentInput.dosage}
              className="form-control"
            />
            <span className="text-danger">
              {medicamentInput.error_list.dosage}
            </span>
          </div>
          <div className="form-group mb-3">
            <label>Classe Thérapeutique</label>
            <input
              type="text"
              name="medicament_prix"
              onChange={handleInput}
              value={medicamentInput.classe_therapeutique}
              className="form-control"
            />
            <span className="text-danger">
              {medicamentInput.error_list.classe_therapeutique}
            </span>
          </div>
          <div className="form-group mb-3">
            <label>Posologie</label>
            <input
              type="text"
              name="medicament_prix"
              onChange={handleInput}
              value={medicamentInput.posologie}
              className="form-control"
            />
            <span className="text-danger">
              {medicamentInput.error_list.posologie}
            </span>
          </div>
         
            <div className="form-group mb-3">
              <label>Image Medicament</label>
              <input
                type="file"
                name="image"
                onChange={handleImage}
                className="form-control"
              />
              <img
                src={`http://senepharma-api.herokuapp.com//${medicamentInput.image}`}
                width="50px"
                alt={medicamentInput.nom_commercial}
              />
              <small className="text-danger">{errorlist.image}</small>
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

export default EditMedicament;
