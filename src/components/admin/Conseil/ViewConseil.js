import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const ViewConseil = () => {
  const [loading, setLoading] = useState(true);
  const [conseillist, setConseillist] = useState([]);
  useEffect(() => {
    axios.get(`/api/view-conseil`).then((res) => {
      if (res.status === 200) {
        setConseillist(res.data.conseil);
      }
      setLoading(false);
    });
  }, []);

  const deleteConseil = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Suppression";

    axios.delete(`/api/delete-conseil/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
      } else if (res.status === 404) {
        swal("Success", res.data.message, "success");
        thisClicked.innerText = "Delete";
      }
    });
  };

  var ViewConseil_HTMLTABLE = "";

  if (loading) {
    return (
      <div class="lds-ripple"><div></div><div></div></div>
    );
  } else {
    ViewConseil_HTMLTABLE = conseillist.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.titre}</td>
          <td>{item.description}</td>
          <td>{item.resume}</td>
          <td>
            <Link
              to={`/admin/edit-conseil/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger btn-primary"
              onClick={(e) => deleteConseil(e, item.id)}
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
            Liste des Conseils
            <Link
              to="/admin/add-conseil"
              className="btn btn-primary btn-sm float-end"
            >
              Ajoutez un conseil
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Titre Conseil</th>
                <th>Description Conseil</th>
                <th>Resumer Conseil</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>{ViewConseil_HTMLTABLE}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewConseil;
