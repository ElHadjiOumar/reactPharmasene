import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading">Racine</div>
          <Link className="nav-link" to="/admin/dashboard">
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            Dashboard
          </Link>

          <div className="sb-sidenav-menu-heading">Pharmacie</div>
          <Link className="nav-link" to="/admin/add-pharmacie">
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            Ajouter Pharmacie
          </Link>

          <Link className="nav-link" to="/admin/view-pharmacie">
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            Liste des pharmacies
          </Link>
          <div
            className="collapse"
            id="collapsePages"
            aria-labelledby="headingTwo"
            data-bs-parent="#sidenavAccordion"
          >
            <nav
              className="sb-sidenav-menu-nested nav accordion"
              id="sidenavAccordionPages"
            >
              <Link
                className="nav-link collapsed"
                to="#"
                data-bs-toggle="collapse"
                data-bs-target="#pagesCollapseAuth"
                aria-expanded="false"
                aria-controls="pagesCollapseAuth"
              >
                Authentication
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </Link>
              <div
                className="collapse"
                id="pagesCollapseAuth"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordionPages"
              ></div>
              <Link
                className="nav-link collapsed"
                to="#"
                data-bs-toggle="collapse"
                data-bs-target="#pagesCollapseError"
                aria-expanded="false"
                aria-controls="pagesCollapseError"
              >
                Error
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </Link>
              <div
                className="collapse"
                id="pagesCollapseError"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordionPages"
              ></div>
            </nav>
          </div>
          <div className="sb-sidenav-menu-heading">Medicament</div>
          <Link className="nav-link" to="/admin/add-medicament">
            <div className="sb-nav-link-icon">
              <i className="fas fa-chart-area"></i>
            </div>
            Ajouter Medicament
          </Link>
          <Link className="nav-link" to="/admin/view-medicament">
            <div className="sb-nav-link-icon">
              <i className="fas fa-table"></i>
            </div>
            Liste des Medicaments
          </Link>

          <div className="sb-sidenav-menu-heading">Conseil</div>
          <Link className="nav-link" to="/admin/add-conseil">
            <div className="sb-nav-link-icon">
              <i className="fas fa-chart-area"></i>
            </div>
            Ajouter Conseil
          </Link>
          <Link className="nav-link" to="/admin/view-conseil">
            <div className="sb-nav-link-icon">
              <i className="fas fa-table"></i>
            </div>
            Liste des Conseils
          </Link>

          {/* <div className="sb-sidenav-menu-heading">Therapie</div>
          <Link className="nav-link" to="/admin/add-therapie">
            <div className="sb-nav-link-icon">
              <i className="fas fa-chart-area"></i>
            </div>
            Ajouter Therapie
          </Link>
          <Link className="nav-link" to="/admin/view-therapie">
            <div className="sb-nav-link-icon">
              <i className="fas fa-table"></i>
            </div>
            Liste des Therapies
          </Link> */}

          

          
        </div>
      </div>
      <div className="sb-sidenav-footer">
        <div className="small">Connecte en tant que :</div>
        Start Bootstrap
      </div>
    </nav>
  );
};

export default Sidebar;
