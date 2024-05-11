import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UseUserActions } from "../../hooks/UseUserActions";
import ProfileUploader from "../../shared/ProfileUploader";
const { VITE_URL_API_IMG } = import.meta.env;
import "./Module.scss";

export const UpdateProfile = () => {
  const user = useSelector((state) => state.users.auth.user);
  const { updateUser } = UseUserActions();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    id: user.id,
    name: user.name || "",
    username: user.username || "",
    email: user.email || "",
    telefono: user.telefono || "",
    avatar: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (const key in userData) {
      if (!userData[key]) continue;

      formDataToSend.append(key, userData[key]);
    }

    const response = await updateUser(formDataToSend);

    if (response.meta.requestStatus === "fulfilled") {
      navigate(-1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (name, file) => {
    setUserData({ ...userData, [name]: file });
  };

  return (
      <div className="container-update-user">
        <div className="info-update-profile">
          <div className="title-update-profile">
            <img
              src="/assets/icons/edit.svg"
              width={36}
              height={36}
              alt="edit"
              className="invert-white"
            />
            <h2>
              Edit Profile
            </h2>
          </div>
          <form
            className="user-update-profile"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <ProfileUploader
              name="avatar"
              fieldChange={handleFileChange}
              mediaUrl={
                user.avatar
                  ? `${VITE_URL_API_IMG}/${user.avatar}`
                  : "/assets/icons/profile-placeholder.svg"
              }
            />
            <label>Name</label>
            <input
              type="text"
              name="name"
              defaultValue={userData.name}
              onChange={handleInputChange}
              className="form-input"
            />

            <label>Username</label>
            <input
              type="text"
              name="username"
              defaultValue={userData.username}
              onChange={handleInputChange}
              className="form-input not-allowed"
              disabled
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              defaultValue={userData.email}
              onChange={handleInputChange}
              className="form-input not-allowed"
              disabled
            />

            <label>Phone</label>
            <input
              type="number"
              name="telefono"
              defaultValue={userData.telefono}
              onChange={handleInputChange}
              className="form-input"
            />
            <div className="buttons-update-profile">
              <button className="button cancel" onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button className="button update" type="submit">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};
