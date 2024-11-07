import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { UseUserActions } from "../../hooks/UseUserActions";
import {
  columns as baseColumns,
  customStyles,
} from "../../constants/tableConfig";
import DataTable from "react-data-table-component";
import { Loader } from "../../shared/Loader";
const { VITE_URL_API_IMG } = import.meta.env;
import { LuBan } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiFileOn } from "react-icons/ci";
import "./Module.scss";

export const UsersAdmin = () => {
  const { allUsers, banUserById } = UseUserActions();
  const { users, status } = useSelector((state) => state.users);
  const [filterText, setFilterText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    allUsers();
  }, []);

  useEffect(() => {
    if (users) {
      const filteredData = users.filter((user) =>
        user.name.toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredUsers(filteredData);
    }
  }, [users, filterText]);

  const handleButtonClick = async (id) => {
    await banUserById(id);
    allUsers();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("User List", 20, 10);

    const tableData = users.map((user) => [
      user.id,
      user.name,
      user.email,
      user.username,
      user.telefono,
      user.isBan ? "Ban" : "",
      user.isAdmin ? "Admin" : "User",
      user.created_at ? new Date(user.created_at).toLocaleString() : "N/A",
    ]);

    doc.autoTable({
      head: [
        [
          "ID",
          "Name",
          "Email",
          "Username",
          "Phone",
          "Ban",
          "Role",
          "Created At",
        ],
      ],
      body: tableData,
      startY: 20,
    });

    doc.save("user-list.pdf");
  };

  const columns = [
    ...baseColumns,
    {
      name: "Avatar",
      cell: (row) => (
        <Link>
          <img
            src={
              row.avatar
                ? `${VITE_URL_API_IMG}/${row.avatar}`
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
    {
      name: "Action",
      cell: (row) => (
        <>
          {!row.isAdmin ? (
            <button
              className="button-ban"
              onClick={() => handleButtonClick(row.id)}
              title={row.isBan ? "unBan this user" : "ban this user"}
            >
              {row.isBan ? <FaCheckCircle /> : <LuBan />}
            </button>
          ) : (
            ""
          )}
        </>
      ),
      ignoreRowClick: true,
    },
  ];

  if (!users || status === "loading")
    return (
      <div className="loader">
        <Loader />
      </div>
    );

  return (
    <div className="container-table-users">
      <div className="header-container">
        <h2>User List</h2>
        <div className="actions-table">
          <input
            type="text"
            placeholder="Search by name"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="search-input"
          />
          <button
            onClick={exportToPDF}
            className="export-button"
            title="download pdf"
          >
            <CiFileOn />
          </button>
        </div>
      </div>
      <DataTable
        title=""
        columns={columns}
        data={filteredUsers || []}
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
