import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const ViewPharmacie = () => {
  const [loading, setLoading] = useState(true);
  const [pharmacielist, setPharmacielist] = useState([]);
  useEffect(() => {
    axios.get(`/api/view-pharmacie`).then((res) => {
      if (res.status === 200) {
        setPharmacielist(res.data.pharmacie);
      }
      setLoading(false);
    });
  }, []);

  const deletePharmacie = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Suppression";

    axios.delete(`/api/delete-pharmacie/${id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
      } else if (res.status === 404) {
        swal("Success", res.data.message, "success");
        thisClicked.innerText = "Delete";
      }
    });
  };

  var viewpharmacie_HTMLTABLE = "";

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
    viewpharmacie_HTMLTABLE = pharmacielist.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.pharmacie_nom}</td>
          <td>{item.pharmacie_adresse}</td>
          <td>{item.pharmacie_numero}</td>
          <td>{item.longitude}</td>
          <td>{item.lattitude}</td>
          <td>{item.region}</td>
          <td>{item.commune}</td>
          <td>{item.department}</td>
          <td>{item.status}</td>
          <td>
            <Link
              to={`/admin/edit-pharmacie/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger btn-primary"
              onClick={(e) => deletePharmacie(e, item.id)}
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
            Liste des Pharmacies
            <Link
              to="/admin/add-pharmacie"
              className="btn btn-primary btn-sm float-end"
            >
              Ajoutez une pharmacie
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Pharmacie Nom</th>
                <th>Pharmacie Adresse</th>
                <th>Pharmacie Numero</th>
                <th>Longitude</th>
                <th>Lattitude</th>
                <th>region</th>
                <th>commune</th>
                <th>department</th>
                <th>status</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>{viewpharmacie_HTMLTABLE}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewPharmacie;
