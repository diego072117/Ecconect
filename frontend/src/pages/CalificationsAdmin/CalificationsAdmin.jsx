import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import {
  columnsCalifications as baseColumns,
  customStyles,
} from "../../constants/tableConfig";
import DataTable from "react-data-table-component";
import { Loader } from "../../shared/Loader";
import { FaFilePdf } from "react-icons/fa6";
import { BsFiletypeXlsx } from "react-icons/bs";
const { VITE_URL_API_IMG } = import.meta.env;
import { Link } from "react-router-dom";
import { useCalificationActions } from "../../hooks/useCalifications";

export const CalificationsAdmin = () => {
  const { listCalifications } = useCalificationActions();
  const { califications, status } = useSelector((state) => state.califications);
  const [filterText, setFilterText] = useState("");
  const [filteredCalifications, setFilteredCalifications] = useState([]);

console.log(califications);


  useEffect(() => {
    listCalifications();
  }, []);

  useEffect(() => {
    if (califications) {
      const filteredData = califications.filter((calification) =>
        calification.usuario_post?.name
          .toLowerCase()
          .includes(filterText.toLowerCase())
      );
      setFilteredCalifications(filteredData);
    }
  }, [califications, filterText]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Califications List", 20, 10);

    const tableData = califications.map((calification) => [
      calification.id,
      calification.usuario_post?.name || "N/A",
      calification.usuario_donado?.name || "N/A",
      calification.post?.id || "N/A",
      calification.calification || "N/A",
      calification.calificado ? "Sí" : "No",
      calification.created_at
        ? new Date(calification.created_at).toLocaleString()
        : "N/A",
    ]);

    doc.autoTable({
      head: [
        [
          "ID",
          "Usuario Post",
          "Usuario Donado",
          "Post ID",
          "Calificación",
          "Calificado",
          "Creado el",
        ],
      ],
      body: tableData,
      startY: 20,
    });

    doc.save("califications-list.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      califications.map((calification) => ({
        "ID": calification.id,
        "Usuario Post": calification.usuario_post?.name || "N/A",
        "Usuario Post Email": calification.usuario_post?.email || "N/A",
        "Usuario Donado": calification.usuario_donado?.name || "N/A",
        "Usuario Donado Email": calification.usuario_donado?.email || "N/A",
        "Post ID": calification.post?.id || "N/A",
        "Descripcion Post": calification.post?.descripcion || "N/A",
        "Estado Post": calification.post?.state,
        "Calificación": calification.calification || "N/A",
        "Calificado": calification.calificado ? "Sí" : "No",
        "Creado el": calification.created_at
          ? new Date(calification.created_at).toLocaleString()
          : "N/A",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Califications");

    XLSX.writeFile(workbook, "califications-list.xlsx");
  };

  const columns = [
    ...baseColumns,
    {
      name: "Post",
      cell: (row) => (
        <Link to={`/posts/${row.id_post}`}>
          <img
            src={
              row.post.publicacion
                ? `${VITE_URL_API_IMG}/${row.post.publicacion}`
                : "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            style={{
              width: "3em",
              height: "3em",
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Link>
      ),
      ignoreRowClick: true,
    },
  ];

  if (!califications || status === "loading")
    return (
      <div className="loader">
        <Loader />
      </div>
    );

  return (
    <div className="container-table-users">
      <div className="header-container">
        <h2>Califications List</h2>
        <div className="actions-table">
          <input
            type="text"
            placeholder="Search by usuario post name"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="search-input"
          />
          <button
            onClick={exportToPDF}
            className="export-button"
            title="Download PDF"
          >
            <FaFilePdf />
          </button>
          <button
            onClick={exportToExcel}
            className="export-button"
            title="Download Excel"
          >
            <BsFiletypeXlsx/>
          </button>
        </div>
      </div>
      <DataTable
        title=""
        columns={columns}
        data={filteredCalifications || []}
        customStyles={customStyles}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        highlightOnHover
        responsive
        defaultSortFieldId="id"
        defaultSortAsc={false}
      />
    </div>
  );
};
