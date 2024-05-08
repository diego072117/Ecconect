import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const ProfileUploader = ({ name, fieldChange, mediaUrl }) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      fieldChange(name, file);
      setFileUrl(URL.createObjectURL(file));
    },
    [fieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
    multiple: false,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} name={name} className="cursor-pointer" />

      <div className="container-uploader">
        <img
          src={fileUrl || "/assets/icons/profile-placeholder.svg"}
          alt="image"
          className="h-24 w-24 rounded-full object-cover object-top"
        />
        <p className="text-primary-500 small-regular md:bbase-semibold">
          Change profile photo
        </p>
      </div>
    </div>
  );
};

export default ProfileUploader;
