import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import "./Module.scss";
import { Link } from "react-router-dom";

export const UsersAdmin = () => {
  const { allUsers, banUserById } = UseUserActions();
  const { users, status } = useSelector((state) => state.users);
  const [filterText, setFilterText] = useState(""); // Estado para el filtro
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

  const columns = [
    ...baseColumns,
    {
      name: "Avatar",
      cell: (row) => (
        <Link /*to={`/profile/${row.id}`}*/>
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
        <input
          type="text"
          placeholder="Search by name"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="search-input"
        />
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
