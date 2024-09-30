import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./Module.scss";
import { usePostActions } from "../../hooks/usePostActions";
import { useSelector } from "react-redux";

export const Explore = () => {
  const [search, setSearch] = useState("");
  const { postsSearchByUser } = useSelector((state) => state.posts.searchPost);
  const { searchPosts } = usePostActions();

  const handleSearchPosts = () => {
    searchPosts({ property: search });
  };

  return (
    <div className="container-explore">
      <div className="info-search">
        <div className="title-search">
          <h2>Search Posts</h2>
        </div>
        <div className="content-search">
          <input
            type="text"
            value={search}
            className="input-search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Add a comment"
            required
          />
          <button onClick={handleSearchPosts} className="search-button">
            <CiSearch />
          </button>
        </div>
      </div>
    </div>
  );
};
