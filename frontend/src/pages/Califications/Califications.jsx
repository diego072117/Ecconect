import { useEffect } from "react";
import { useCalificationActions } from "../../hooks/useCalifications";
import { useSelector } from "react-redux";
import { Stars } from "../../shared/Stars";
import "./Module.scss";
import { Loader } from "../../shared/Loader";

const { VITE_URL_API_IMG } = import.meta.env;

export const Califications = () => {
  const { listCalificationsByUser } = useCalificationActions();
  const user = useSelector((state) => state.users.auth.user);
  const { calificationsUser, status } = useSelector(
    (state) => state.califications
  );

  useEffect(() => {
    listCalificationsByUser(user.id);
  }, []);

  const refreshdata = () => {
    listCalificationsByUser(user.id);
  };

  if (status === "loading")
    return (
      <div className="loader">
        <Loader />
      </div>
    );

  return (
    <div className="container-calification-user">
      <div className="title-calification">
        <h2>Califications</h2>
      </div>

      <div className="calification-container">
        {calificationsUser?.map((califi) => (
          <div
            key={califi.id}
            className="calification-post-user"
            style={{
              backgroundImage: `url(${VITE_URL_API_IMG}/${califi.post.publicacion})`,
            }}
          >
            <div className="calification-info-user-post">
              <img
                src={
                  califi.usuario_post.avatar
                    ? `${VITE_URL_API_IMG}/${califi.usuario_post.avatar}`
                    : "/assets/icons/profile-placeholder.svg"
                }
                alt="profile"
              />
              <div className="info-calification">
                <p className="username-post-calification">
                  {califi.usuario_post.name}
                </p>
                <div className="stars-wrapper">
                  <Stars infoCalif={califi} refreshdata={refreshdata} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
