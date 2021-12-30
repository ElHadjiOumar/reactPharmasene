import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Conseil = () => {
  const [conseilInput, setConseil] = useState({
    titre: "",
    description: "",
    resume: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setConseil({ ...conseilInput, [e.target.name]: e.target.value });
  };

  const submitConseil = (e) => {
    e.preventDefault();

    const data = {
      titre: conseilInput.titre,
      description: conseilInput.description,
      resume: conseilInput.resume,
    };

    axios.post(`/api/store-conseil`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setConseil({
          titre: "",
          description: "",
          resume: "",
          error_list: [],
        });
      } else if (res.data.status === 400) {
        setConseil({
          ...conseilInput,
          error_list: res.data.validation_errors,
        });
      }
    });
  };
  return (
    <div className="card mt-4">
      <div className="card-header">
        <h4 className="mt-4">
          Ajouter Conseil
          <Link
            to="/admin/view-conseil"
            className="btn btn-primary btn-sm float-end"
          >
            Liste Conseil
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <form onSubmit={submitConseil}>
          <div className="form-group mb-3">
            <label>Nom du Conseil</label>
            <input
              type="text"
              name="titre"
              onChange={handleInput}
              value={conseilInput.titre}
              className="form-control"
            />
            <span className="text-danger">
              {conseilInput.error_list.titre}
            </span>
          </div>
          <div className="form-group mb-3">
            <label>Description du Conseil</label>
            <input
              type="text"
              name="description"
              onChange={handleInput}
              value={conseilInput.description}
              className="form-control"
            />
            <span className="text-danger">
              {conseilInput.error_list.description}
            </span>
          </div>
          <div className="form-group mb-3">
            <label>Resumer du Conseil</label>
            <input
              type="textarea"
              name="resume"
              onChange={handleInput}
              value={conseilInput.resume}
              className="form-control"
            />
            <span className="text-danger">
              {conseilInput.error_list.resume}
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

export default Conseil;
