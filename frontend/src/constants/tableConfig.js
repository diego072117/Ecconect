import { format } from "date-fns";

// tableConfig.js

export const columns = [
  {
    id: "id",
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
    width: "60px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Username",
    selector: (row) => row.username,
    sortable: true,
  },
  {
    name: "Phone",
    selector: (row) => row.telefono,
    sortable: true,
  },
  {
    name: "is Admin",
    selector: (row) => (row.isAdmin ? "Admin" : "User"),
    sortable: true,
  },
  {
    name: "Created At",
    selector: (row) =>
      row.created_at
        ? format(new Date(row.created_at), "yyyy-MM-dd HH:mm")
        : "N/A",
    sortable: true,
  },
];

export const columnsPosts = [
  {
    id: "id",
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
    width: "60px",
  },
  {
    name: "Description",
    selector: (row) => row.descripcion,
    sortable: true,
  },
  {
    name: "State",
    selector: (row) => row.state,
    sortable: true,
  },
  {
    name: "Owner",
    selector: (row) => row.usuario_creador.name,
    sortable: true,
  },
  {
    name: "Username",
    selector: (row) => row.usuario_creador.username,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.usuario_creador.email,
    sortable: true,
  },
  {
    name: "Phone",
    selector: (row) => row.usuario_creador.telefono,
    sortable: true,
  },
  {
    name: "Created At",
    selector: (row) =>
      row.created_at
        ? format(new Date(row.created_at), "yyyy-MM-dd HH:mm")
        : "N/A",
    sortable: true,
  },
];

export const columnsCalifications = [
  {
    id: "id",
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
    width: "60px",
  },
  {
    name: "qualified user",
    selector: (row) => row.usuario_post.name,
    sortable: true,
  },
  {
    name: "qualified email",
    selector: (row) => row.usuario_post.email,
    sortable: true,
  },
  {
    name: "user qualifies",
    selector: (row) => row.usuario_donado.name,
    sortable: true,
  },
  {
    name: "email qualifies",
    selector: (row) => row.usuario_donado.email,
    sortable: true,
  },
  {
    name: "# rating",
    selector: (row) => row?.calification || "N/A",
    sortable: true,
  },
  {
    name: "rating",
    selector: (row) => (row.calificado ? "Sí" : "No"),
    sortable: true,
  },
  {
    name: "Created At",
    selector: (row) =>
      row.created_at
        ? format(new Date(row.created_at), "yyyy-MM-dd HH:mm")
        : "N/A",
    sortable: true,
  },
];

export const customStyles = {
  header: {
    style: {
      backgroundColor: "#000",
      color: "#fff",
      fontFamily: "Inter, sans-serif",
    },
  },
  rows: {
    style: {
      backgroundColor: "#121212",
      color: "#fff",
      fontFamily: "Inter, sans-serif",
      "&:hover": {
        backgroundColor: "#333",
      },
    },
  },
  pagination: {
    style: {
      backgroundColor: "#000",
      color: "#877eff",
      fontFamily: "Inter, sans-serif",
    },
    pageButtonsStyle: {
      borderRadius: "50%",
      height: "40px",
      width: "40px",
      padding: "8px",
      margin: "2px",
      cursor: "pointer",
      transition: "0.2s",
      backgroundColor: "#877eff",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#6b61db", // Morado más oscuro al pasar el cursor
      },
      "&:disabled": {
        cursor: "not-allowed",
        backgroundColor: "#ccc",
      },
    },
  },
  headCells: {
    style: {
      backgroundColor: "#877eff",
      color: "#fff",
      fontFamily: "Inter, sans-serif",
    },
  },
  cells: {
    style: {
      backgroundColor: "#121212",
      color: "#fff",
      fontFamily: "Inter, sans-serif",
    },
  },
};
