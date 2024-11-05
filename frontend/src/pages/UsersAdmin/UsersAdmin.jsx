import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { UseUserActions } from "../../hooks/UseUserActions";
import {
  columns as baseColumns,
  customStyles,
} from "../../constants/tableUsersConfig";
import DataTable from "react-data-table-component";
import { Loader } from "../../shared/Loader";
const { VITE_URL_API_IMG } = import.meta.env;
import { LuBan } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import "./Module.scss";

export const UsersAdmin = () => {
  const { allUsers, banUserById } = UseUserActions();
  const { users, status } = useSelector((state) => state.users);

  useEffect(() => {
    allUsers();
  }, []);

  const handleButtonClick = async (id) => {
    await banUserById(id);
    allUsers();
  };

  const columns = [
    ...baseColumns,
    {
      name: "Avatar",
      cell: (row) => (
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
          {/* <button
            className="button-ban"
            onClick={() => handleButtonClick(row.id)}
          >
            <img
              src={"/assets/icons/edit.svg"}
              alt="edit"
              width={20}
              height={20}
            />
          </button> */}
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
      <DataTable
        title="User List"
        columns={columns}
        data={users || []}
        customStyles={customStyles}
        pagination // Activar paginación
        paginationPerPage={10} // Usuarios por página
        paginationRowsPerPageOptions={[10, 20, 30]} // Opciones para filas por página
        highlightOnHover
        responsive
        defaultSortFieldId="id"
        defaultSortAsc={false}
      />
    </div>
  );
};
