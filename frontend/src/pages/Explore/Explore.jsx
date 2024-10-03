import { useCallback, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoFilterSharp } from "react-icons/io5";
import { usePostActions } from "../../hooks/usePostActions";
import { useSelector } from "react-redux";
import { Loader } from "../../shared/Loader";
import { Link } from "react-router-dom";
const { VITE_URL_API_IMG } = import.meta.env;
import "./Module.scss";

export const Explore = () => {
  const [search, setSearch] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(true);
  const { posts } = useSelector((state) => state.posts.posts);
  const { postsSearchByUser } = useSelector((state) => state.posts.searchPost);
  const { searchPosts, listPosts } = usePostActions();

  useEffect(() => {
    listPosts();
  }, []);

  const handleSearchPosts = useCallback(() => {
    searchPosts({ property: search });
    setShowSearchResults(true);
  }, [search, searchPosts]);

  const handleReset = useCallback(() => {
    setShowSearchResults(false); // Para volver a mostrar todos los posts
  }, []);

  let content =
    showSearchResults && postsSearchByUser ? postsSearchByUser : posts;

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
            placeholder="Search"
            required
          />
          <button onClick={handleSearchPosts} className="filter-search search-button">
            <CiSearch />
          </button>
          <button onClick={handleReset} className="all-search search-button">
            <IoFilterSharp />
          </button>
        </div>
      </div>
      <div className="post-search">
        {content ? (
          <div className="post-search-container">
            {content.map((post) => (
              <Link
                key={post.id}
                className="post-user-search"
                to={`/posts/${post.id}`}
                style={{
                  backgroundImage: `url(${VITE_URL_API_IMG}/${post.publicacion})`,
                }}
              >
                <div className="info-user-post">
                  <img
                    src={
                      post.usuario_creador.avatar
                        ? `${VITE_URL_API_IMG}/${post.usuario_creador.avatar}`
                        : "/assets/icons/profile-placeholder.svg"
                    }
                    alt="profile"
                  />
                  <p className="username-post-search">{post.usuario_creador.name}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
