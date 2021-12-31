import axios from "axios";
import React, {  useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Medicament = () => {
  const [medicamentInput, setTherapie] = useState({
    medicament_nom: "",
    medicament_prix: "",
    status: "",
    DCI: "",
    tableau: "",
    forme: "",
    dosage: "",
    classe_therapeutique: "",
    posologie: "",
    error_list: [],
  });
  const [photo, setPhoto] = useState([]);

  //const [medicamentlist, setMedicamentlist] = useState([]);
  const [errorlist, setError] = useState([]);
  const handleImage = (e) => {
    setPhoto({ image: e.target.files[0] });
  };

  

  const handleInput = (e) => {
    e.persist();
    setTherapie({ ...medicamentInput, [e.target.name]: e.target.value });
  };

  const submitMedicament = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", photo.image);
    
    formData.append("medicament_nom", medicamentInput.medicament_nom);
    formData.append("medicament_prix", medicamentInput.medicament_prix);
    formData.append("DCI",medicamentInput.DCI);
    formData.append("tableau",medicamentInput.tableau);  
    formData.append("forme",medicamentInput.forme);
    formData.append("dosage",medicamentInput.dosage);
    formData.append("classe_therapeutique",medicamentInput.classe_therapeutique);
    formData.append("posologie",medicamentInput.posologie);

    // const data = {
    //   image: photo.image,
    //   sous_sous_therapie_id: medicamentInput.sous_sous_therapie_id,
    //   medicament_nom: medicamentInput.medicament_nom,
    //   medicament_categorie: medicamentInput.medicament_categorie,
    //   medicament_reference: medicamentInput.medicament_reference,
    //   medicament_prix: medicamentInput.medicament_prix,
    // };

    axios.post(`/api/store-medicament`, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setTherapie({
          medicament_nom: "",
          medicament_prix: "",
          DCI: "",
          tableau: "",     
          forme: "",
          dosage: "",
          classe_therapeutique: "",
          posologie: "",
          error_list: [],
        });
        setError([]);
        setPhoto([]);
      } else if (res.data.status === 400) {
        swal("Tous les Champs ne sont pas remplis", "", "error");
        setError(res.data.errors);
      }
    });
  };
  return (
    <div className="card mt-4">
      <div className="card-header">
        <h4 className="mt-4">
          Ajouter Medicament
          <Link
            to="/admin/view-medicament"
            className="btn btn-primary btn-sm float-end"
          >
            Liste Medicament
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <form onSubmit={submitMedicament}>
          <div className="form-group mb-3">
            <label>Nom commercial</label>
            <input
              type="text"
              name="medicament_nom"
              onChange={handleInput}
              value={medicamentInput.medicament_nom}
              className="form-control"
            />
            <span className="text-danger">
              {medicamentInput.error_list.medicament_nom}
            </span>
          </div>
          <div className="form-group mb-3">
            <label>DCI</label>
            <input
              type="text"
              name="DCI"
              onChange={handleInput}
              value={medicamentInput.DCI}
              className="form-control"
            />
            <span className="text-danger">
              {medicamentInput.error_list.DCI}
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
              name="forme"
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
              name="dosage"
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
              name="classe_therapeutique"
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
              name="posologie"
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
            <small className="text-danger">{errorlist.image}</small>
          </div>

          <button type="submit" className="btn btn-primary px-4 float-end">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Medicament;
