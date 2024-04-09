import { useState } from "react";
import { usePostActions } from "../../hooks/usePostActions";
import { useSelector } from "react-redux";
import FileUploader from "../../shared/FileUploader";

export const Post = () => {
  const user = useSelector((state) => state.users.auth.user);
  const { createPost } = usePostActions();
  const [formData, setFormData] = useState({
    descripcion: "",
    publicacion: null,
    id_usuarioCreador: user.id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      if (!formData[key]) continue;

      formDataToSend.append(key, formData[key]);
    }

    // Es porque así es el formato del FormData, esa es una clase que tiene un formato especial.
    createPost(formDataToSend);
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
          <h2>Crear Post</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="form-create"
        >
          <div className="container-cols-create">
            <label>Descripcion:</label>
            <input
              type="text"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              className="form-input"
            />

            <label>Post:</label>
            <div
              className="img"
              style={{ backgroundColor: "red", width: "10em" }}
            >
              <FileUploader
                name="publicacion"
                fieldChange={handleFileChange}
                mediaUrl=""
              />
            </div>

            <button className="button-create" type="submit">
              Crear Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
