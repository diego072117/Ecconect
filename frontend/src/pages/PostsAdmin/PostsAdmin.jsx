import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import {
  columnsPosts as baseColumns,
  customStyles,
} from "../../constants/tableConfig";
import DataTable from "react-data-table-component";
import { Loader } from "../../shared/Loader";
const { VITE_URL_API_IMG } = import.meta.env;
import { usePostActions } from "../../hooks/usePostActions";
import { Link } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa6";
import { BsFiletypeXlsx } from "react-icons/bs";
//import "./Module.scss";

export const PostsAdmin = () => {
  const { listPosts } = usePostActions();
  const { posts, status } = useSelector((state) => state.posts.posts);
  const [filterText, setFilterText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    listPosts();
  }, []);

  useEffect(() => {
    if (posts) {
      const filteredData = posts.filter((post) =>
        post.descripcion.toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredPosts(filteredData);
    }
  }, [posts, filterText]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Posts List", 20, 10);

    const tableData = posts.map((post) => [
      post.id,
      post.descripcion,
      post.state,
      post.usuario_creador.name,
      post.usuario_creador.username,
      post.usuario_creador.email,
      post.usuario_creador.telefono,
      post.created_at ? new Date(post.created_at).toLocaleString() : "N/A",
    ]);

    doc.autoTable({
      head: [
        [
          "ID",
          "Description",
          "State",
          "Owner",
          "Username",
          "Email",
          "Phone",
          "Created At",
        ],
      ],
      body: tableData,
      startY: 20,
    });

    doc.save("posts-list.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      posts.map((post) => ({
        "ID": post.id,
        "Descripcion Post": post.descripcion || "N/A",
        "Estado Post": post?.state,
        "Email": post.usuario_creador?.email || "N/A",
        "Nombre": post.usuario_creador?.name || "N/A",
        "Username": post.usuario_creador?.username || "N/A",
        "Telefono": post.usuario_creador?.telefono || "N/A",
        "Ban": post.usuario_creador.isban ? 'Si' : 'No',
        "Creado el": post.created_at
          ? new Date(post.created_at).toLocaleString()
          : "N/A",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Posts");
  
    XLSX.writeFile(workbook, "posts-list.xlsx");
  };

  const columns = [
    ...baseColumns,
    {
      name: "Avatar",
      cell: (row) => (
        <Link to={`/posts/${row.id}`}>
          <img
            src={
              row.publicacion
                ? `${VITE_URL_API_IMG}/${row.publicacion}`
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

  if (!posts || status === "loading")
    return (
      <div className="loader">
        <Loader />
      </div>
    );

  return (
    <div className="container-table-users">
      <div className="header-container">
        <h2>Posts List</h2>
        <div className="actions-table">
          <input
            type="text"
            placeholder="Search by description"
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
        data={filteredPosts || []}
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
