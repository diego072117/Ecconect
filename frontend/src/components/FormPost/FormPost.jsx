import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usePostActions } from "../../hooks/usePostActions";
import { useEffect, useState } from "react";
const { VITE_URL_API_IMG } = import.meta.env;
import FileUploader from "../../shared/FileUploader";

export const FormPost = ({ action, post }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.auth.user);
  const { createPost, updatePost } = usePostActions();
  const [formData, setFormData] = useState({
    id: null,
    descripcion: "",
    publicacion: null,
    id_usuarioCreador: user.id,
  });

  useEffect(() => {
    if (action === "Update" && post) {
      setFormData({
        id: post.id,
        descripcion: post.descripcion,
        publicacion: post.publicacion,
        id_usuarioCreador: user.id,
      });
    }
  }, [action]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      if (!formData[key]) continue;

      formDataToSend.append(key, formData[key]);
    }

    // const formDataObject = Object.fromEntries(formDataToSend.entries());

    // console.log(formDataObject);

    const response =
      action === "Update"
        ? await updatePost(formDataToSend)
        : await createPost(formDataToSend);

    if (response.meta.requestStatus === "fulfilled") {
      if (action === "Create") {
        navigate("/");
      }
       if(action=== "Update"){
        navigate(-1);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (name, file) => {
    setFormData({ ...formData, [name]: file });
  };

  return (
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
          mediaUrl={
            post && action === "Update"
              ? `${VITE_URL_API_IMG}/${post.publicacion}`
              : ""
          }
        />
      </div>
      <div className="container-create-post">
        <button className="button cancel" type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
        <button className="button update" type="submit">
          {action === "Create" ? "Crear Post" : "Update Post"}
        </button>
      </div>
    </form>
  );
};
