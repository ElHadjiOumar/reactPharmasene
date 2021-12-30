import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const ViewTherapie = () => {
  const [loading, setLoading] = useState(true);
  const [therapielist, setTherapielist] = useState([]);
  //const [therapieID, setTherapieID] = useState([]);

  useEffect(() => {
    document.title = "Sous-Therapie";
    axios.get(`/api/view-sous-therapie/`).then((res) => {
      if (res.data.status === 200) {
        setTherapielist(res.data.sous_therapie);
      }
      setLoading(false);
    });
  }, []);

  const deleteTherapie = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Suppression";

    axios.delete(`/api/delete-sous-therapie/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
      } else if (res.status === 404) {
        swal("Success", res.data.message, "success");
        thisClicked.innerText = "Delete";
      }
    });
  };

  var ViewTherapie_HTMLTABLE = "";

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
    ViewTherapie_HTMLTABLE = therapielist.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.therapie.nom}</td>
          <td>{item.nom}</td>
          <td>{item.description}</td>
          <td>
            <Link
              to={`/admin/edit-sous-therapie/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger btn-primary"
              onClick={(e) => deleteTherapie(e, item.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Liste des classes Sous Therapeutique
            <Link
              to="/admin/add-sous-therapie"
              className="btn btn-primary btn-sm float-end"
            >
              Ajoutez une sous therapie
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom Therapie</th>
                <th>nom Conseil</th>
                <th>Description Conseil</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>{ViewTherapie_HTMLTABLE}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewTherapie;
