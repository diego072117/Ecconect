import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  columnsPosts as baseColumns,
  customStyles,
} from "../../constants/tableConfig";
import DataTable from "react-data-table-component";
import { Loader } from "../../shared/Loader";
const { VITE_URL_API_IMG } = import.meta.env;
import { usePostActions } from "../../hooks/usePostActions";
import { Link } from "react-router-dom";
//import "./Module.scss";

export const PostsAdmin = () => {
  const { listPosts } = usePostActions();
  const { posts, status } = useSelector((state) => state.posts.posts);
  const [filterText, setFilterText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  console.log(posts);

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
