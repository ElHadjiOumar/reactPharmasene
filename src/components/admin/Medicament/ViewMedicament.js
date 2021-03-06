import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const ViewMedicament = () => {
  const [loading, setLoading] = useState(true);
  const [medicamentlist, setMedicamentlist] = useState([]);
  useEffect(() => {
    axios.get(`/api/view-medicament`).then((res) => {
      if (res.status === 200) {
        setMedicamentlist(res.data.medicament);
      }
      setLoading(false);
    });
  }, []);

  const deleteMedicament = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Suppression";

    axios.delete(`/api/delete-medicament/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
      } else if (res.status === 404) {
        swal("Success", res.data.message, "success");
        thisClicked.innerText = "Delete";
      }
    });
  };

  var viewmedicament_HTMLTABLE = "";

  if (loading) {
    return (
      <div className="lds-ripple"><div></div><div></div></div>
    );
  } else {
    viewmedicament_HTMLTABLE = medicamentlist.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
         
          <td>
            <img
              src={`https://senepharma-api.herokuapp.com/${item.image}`}
              width="50px"
              alt={item.medicament_nom}
            />
          </td>
          <td>{item.medicament_nom}</td>
          <td>{item.DCI}</td>
          <td>{item.tableau}</td>
          <td>{item.medicament_prix}</td>
          <td>{item.forme}</td>
          <td>{item.dosage}</td>
          <td>{item.classe_therapeutique}</td>
          <td>{item.posologie}</td>
          <td>
            <Link
              to={`/admin/edit-medicament/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger btn-primary"
              onClick={(e) => deleteMedicament(e, item.id)}
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
            Liste des Medicaments
            <Link
              to="/admin/add-medicament"
              className="btn btn-primary btn-sm float-end"
            >
              Ajoutez une medicament
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>             
                <th>Image</th>
                <th>NOM MEDICAMENT</th>
                <th>DCI</th>
                <th>TABLEAU</th>
                <th>PRIX MEDICAMENT</th>
                <th>FORME</th>
                <th>DOSAGE</th>
                <th>CLASSE THERAPEUTIQUE</th>
                <th>POSOLOGIE</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>{viewmedicament_HTMLTABLE}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewMedicament;
