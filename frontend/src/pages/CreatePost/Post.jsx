import { useState } from "react";
import { usePostActions } from "../../hooks/usePostActions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FileUploader from "../../shared/FileUploader";
import "./Module.scss";

export const Post = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.auth.user);
  const { createPost } = usePostActions();
  const [formData, setFormData] = useState({
    descripcion: "",
    publicacion: null,
    id_usuarioCreador: user.id,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      if (!formData[key]) continue;

      formDataToSend.append(key, formData[key]);
    }

    // Es porque así es el formato del FormData, esa es una clase que tiene un formato especial.
    const response = await createPost(formDataToSend);
    if (response.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  // donde está el console.log?
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (name, file) => {
    setFormData({ ...formData, [name]: file });
  };

  return (
    <div className="container-create">
      <div className="create">
        <div className="title-create">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="add"
          />
          <h2>Create Post</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="form-create"
        >
          <div className="container-post">
            <label className="desc-post">Caption:</label>
            <textarea
              type="text"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              className="form-input-create"
            />

            <label className="desc-post">Add Phothos</label>

            <FileUploader
              name="publicacion"
              fieldChange={handleFileChange}
              mediaUrl=""
            />
          </div>
          <div className="container-create-post">
            <button className="button-create-post" type="submit">
              Crear Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
