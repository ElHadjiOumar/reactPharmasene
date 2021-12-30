import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";
import Pharmacie from "../components/admin/Pharmacie/Pharmacie";
import ViewPharmacie from "../components/admin/Pharmacie/ViewPharmacie";
import EditPharmacie from "../components/admin/Pharmacie/EditPharmacie";
import Medicament from "../components/admin/Medicament/Medicament";
import ViewMedicament from "../components/admin/Medicament/ViewMedicament";
import EditMedicament from "../components/admin/Medicament/EditMedicament";
import Conseil from "../components/admin/Conseil/Conseil";
import ViewConseil from "../components/admin/Conseil/ViewConseil";
import EditConseil from "../components/admin/Conseil/EditConseil";
import Therapie from "../components/admin/Therapie/Therapie";
import ViewTherapie from "../components/admin/Therapie/ViewTherapie";
import EditTherapie from "../components/admin/Therapie/EditTherapie";

import SousTherapie from "../components/admin/Sous-therapie/Therapie";
import SousViewTherapie from "../components/admin/Sous-therapie/ViewTherapie";
import SousEditTherapie from "../components/admin/Sous-therapie/EditTherapie";

import SousSousTherapie from "../components/admin/Sous-sous-therapie/Therapie";
import SousSousViewTherapie from "../components/admin/Sous-sous-therapie/ViewTherapie";
import SousSousEditTherapie from "../components/admin/Sous-sous-therapie/EditTherapie";

const routes = [
  { path: "/admin", exact: true, name: "Admin" },
  {
    path: "/admin/dashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },
  { path: "/admin/profile", exact: true, name: "Profile", component: Profile },
  {
    path: "/admin/add-pharmacie",
    exact: true,
    name: "Pharmacie",
    component: Pharmacie,
  },
  {
    path: "/admin/view-pharmacie",
    exact: true,
    name: "ViewPharmacie",
    component: ViewPharmacie,
  },
  {
    path: "/admin/edit-pharmacie/:id",
    exact: true,
    name: "EditPharmacie",
    component: EditPharmacie,
  },
  {
    path: "/admin/add-medicament",
    exact: true,
    name: "Medicament",
    component: Medicament,
  },
  {
    path: "/admin/view-medicament",
    exact: true,
    name: "ViewMedicament",
    component: ViewMedicament,
  },
  {
    path: "/admin/edit-medicament/:id",
    exact: true,
    name: "EditMedicament",
    component: EditMedicament,
  },

  {
    path: "/admin/add-conseil",
    exact: true,
    name: "Conseil",
    component: Conseil,
  },
  {
    path: "/admin/view-conseil",
    exact: true,
    name: "ViewConseil",
    component: ViewConseil,
  },
  {
    path: "/admin/edit-conseil/:id",
    exact: true,
    name: "EditConseil",
    component: EditConseil,
  },

  {
    path: "/admin/add-therapie",
    exact: true,
    name: "Therapie",
    component: Therapie,
  },
  {
    path: "/admin/view-therapie",
    exact: true,
    name: "ViewTherapie",
    component: ViewTherapie,
  },
  {
    path: "/admin/edit-therapie/:id",
    exact: true,
    name: "EditTherapie",
    component: EditTherapie,
  },

  {
    path: "/admin/add-sous-therapie",
    exact: true,
    name: "SousTherapie",
    component: SousTherapie,
  },
  {
    path: "/admin/view-sous-therapie",
    exact: true,
    name: "SousViewTherapie",
    component: SousViewTherapie,
  },
  {
    path: "/admin/edit-sous-therapie/:id",
    exact: true,
    name: "SousEditTherapie",
    component: SousEditTherapie,
  },

  {
    path: "/admin/add-sous-sous-therapie",
    exact: true,
    name: "SousTherapie",
    component: SousSousTherapie,
  },
  {
    path: "/admin/view-sous-sous-therapie",
    exact: true,
    name: "SousViewTherapie",
    component: SousSousViewTherapie,
  },
  {
    path: "/admin/edit-sous-sous-therapie/:id",
    exact: true,
    name: "SousEditTherapie",
    component: SousSousEditTherapie,
  },
];

export default routes;
