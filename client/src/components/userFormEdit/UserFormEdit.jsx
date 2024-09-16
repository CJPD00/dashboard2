import useAuth from "../../hooks/useAuth";
import noAvatar from "../../assets/noAvatar.png";
import Avatar from "@mui/material/Avatar";
import { TextField, Button, Alert } from "@mui/material";
import { useTheme } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useCallback, useState, useEffect } from "react";
import { useGetAvatarQuery } from "../../state/api";
import { Edit } from "@mui/icons-material";

const UserFormEdit = () => {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState(null);
  const [dataForm, setDataForm] = useState({});
  const { data, error, isLoading } = useGetAvatarQuery(user.avatar);
  const theme = useTheme();

  useEffect(() => {
    if (user) {
      setDataForm({
        name: user.name,
        lastname: user.lastname,
        role: user.role,
        avatar: user.avatar,
      });
    }
  }, [user]);

  useEffect(() => {
    if (data) {
      setAvatar(data);
    }
  }, [data]);

  useEffect(() => {
    if (avatar) {
      setDataForm({
        ...dataForm,
        avatar: avatar.file,
      });
    }
  }, [avatar]);

  //console.log(user);

  return (
    <div className="userFormEdit" style={{ width: "100%", backgroundColor: theme.palette.background.default }} >
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm dataForm={dataForm} setDataForm={setDataForm}></EditForm>
    </div>
  );
};

const UploadAvatar = ({ avatar, setAvatar }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    }
  }, [avatar]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setAvatar({
        file: acceptedFiles[0],
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    //multiple: false,
    accept: "image/jpeg, image/png",
    noKeyboard: true,
  });

  return (
    <div
      className="dropzone"
      {...getRootProps({ className: "dropzone" })}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar style={{ width: 150, height: 150 }} src={noAvatar}></Avatar>
      ) : (
        <Avatar
          style={{ width: 150, height: 150 }}
          src={avatarUrl ? avatarUrl : noAvatar}
        ></Avatar>
      )}
    </div>
  );
};

const EditForm = ({ dataForm, setDataForm }) => {
  const theme = useTheme();

  return (
    <div
      className="editForm"
      style={{ backgroundColor: theme.palette.background.alt }}
    >
      <TextField
        label="Name"
        type="text"
        variant="standard"
        size="small"
        value={dataForm.name}
        onChange={(e) => setDataForm({ ...dataForm, name: e.target.value })}
        sx={{ mb: 2, width: "100%" }}
      />
      <TextField
        label="Lastname"
        type="text"
        variant="standard"
        size="small"
        value={dataForm.lastname}
        onChange={(e) => setDataForm({ ...dataForm, lastname: e.target.value })}
        sx={{ mb: 2, width: "100%" }}
      />
      <Button variant="contained" color="secondary" sx={{ width: "100%" }}>
        Guardar
      </Button>
    </div>
  );
};

export default UserFormEdit;
