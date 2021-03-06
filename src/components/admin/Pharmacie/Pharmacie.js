import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Pharmacie = () => {
  const [pharmacieInput, setPharmacie] = useState({
    pharmacie_nom: "",
    pharmacie_adresse: "",
    pharmacie_numero: "",
    longitude: "",
    lattitude: "",
    region: "",
    commune: "",
    department: "",
    map_link: "",
    status: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setPharmacie({ ...pharmacieInput, [e.target.name]: e.target.value });
  };

  const submitPharmacie = (e) => {
    e.preventDefault();

    const data = {
      pharmacie_nom: pharmacieInput.pharmacie_nom,
      pharmacie_adresse: pharmacieInput.pharmacie_adresse,
      pharmacie_numero: pharmacieInput.pharmacie_numero,
      longitude: pharmacieInput.longitude,
      lattitude: pharmacieInput.lattitude,
      region: pharmacieInput.region,
      commune: pharmacieInput.commune,
      department: pharmacieInput.department,
      map_link: pharmacieInput.map_link,
      status: pharmacieInput.status,
    };

    axios.post(`/api/store-pharmacie`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setPharmacie({
          pharmacie_nom: "",
          pharmacie_adresse: "",
          pharmacie_numero: "",
          longitude: "",
          lattitude: "",
          region: "",
          commune: "",
          department: "",
          map_link: "",
          status: "",
          error_list: [],
        });
        //document.getElementById("PHARMACIE_FORM").reset();
      } else if (res.data.status === 400) {
        setPharmacie({
          ...pharmacieInput,
          error_list: res.data.validation_errors,
        });
      }
    });
  };
  return (
    <div className="card mt-4">
      <div className="card-header">
        <h4 className="mt-4">
          Ajouter Pharmacie
          <Link
            to="/admin/view-pharmacie"
            className="btn btn-primary btn-sm float-end"
          >
            Liste Pharmacie
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <form onSubmit={submitPharmacie} id="PHARMACIE_FORM">
          <div className="form-group mb-3">
            <label>Nom de la Pharmacie</label>
            <input
              type="text"
              name="pharmacie_nom"
              onChange={handleInput}
              value={pharmacieInput.pharmacie_nom}
              className="form-control"
            />
            <span className="text-danger">
              {pharmacieInput.error_list.pharmacie_nom}
            </span>
          </div>
          <div className="form-group mb-3">
            <label>Adresse de la Pharmacie</label>
            <input
              type="text"
              name="pharmacie_adresse"
              onChange={handleInput}
              value={pharmacieInput.pharmacie_adresse}
              className="form-control"
            />
            <span className="text-danger">
              {pharmacieInput.error_list.pharmacie_adresse}
            </span>
          </div>
          <div className="form-group mb-3">
            <label>Numero de la Pharmacie</label>
            <input
              type="text"
              name="pharmacie_numero"
              onChange={handleInput}
              value={pharmacieInput.pharmacie_numero}
              className="form-control"
            />
            <span className="text-danger">
              {pharmacieInput.error_list.pharmacie_numero}
            </span>
          </div>

          <div className="form-group mb-3">
            <label>Longitude de la Pharmacie</label>
            <input
              type="number"
              name="longitude"
              onChange={handleInput}
              value={pharmacieInput.longitude}
              className="form-control"
            />
            <span className="text-danger">
              {pharmacieInput.error_list.longitude}
            </span>
          </div>

          <div className="form-group mb-3">
            <label>Lattitude de la Pharmacie</label>
            <input
              type="number"
              name="lattitude"
              onChange={handleInput}
              value={pharmacieInput.lattitude}
              className="form-control"
            />
            <span className="text-danger">
              {pharmacieInput.error_list.lattitude}
            </span>
          </div>

          <div className="form-group mb-3">
            <label>region de la Pharmacie</label>
            <input
              type="text"
              name="region"
              onChange={handleInput}
              value={pharmacieInput.region}
              className="form-control"
            />
            <span className="text-danger">
              {pharmacieInput.error_list.region}
            </span>
          </div>
          <div className="form-group mb-3">
            <label>commune de la Pharmacie</label>
            <input
              type="text"
              name="commune"
              onChange={handleInput}
              value={pharmacieInput.commune}
              className="form-control"
            />
            <span className="text-danger">
              {pharmacieInput.error_list.commune}
            </span>
          </div>
          <div className="form-group mb-3">
            <label>department de la Pharmacie</label>
            <input
              type="text"
              name="department"
              onChange={handleInput}
              value={pharmacieInput.department}
              className="form-control"
            />
            <span className="text-danger">
              {pharmacieInput.error_list.department}
            </span>
          </div>

          <div className="form-group mb-3">
            <label>Lien Map Pharmacie </label>
            <input
              type="text"
              name="map_link"
              onChange={handleInput}
              value={pharmacieInput.map_link}
              className="form-control"
            />
            <span className="text-danger">
              {pharmacieInput.error_list.map_link}
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

export default Pharmacie;
