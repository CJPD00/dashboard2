import useAuth from "../../hooks/useAuth";
import noAvatar from "../../assets/noAvatar.png";
import Avatar from "@mui/material/Avatar";
import { TextField, Button, Alert } from "@mui/material";
import { useTheme } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useCallback, useState, useEffect } from "react";
import { useGetAvatarQuery } from "../../state/api";
import { Edit, Password } from "@mui/icons-material";
import { comparePasswords, verifyPassword } from "../../helpers/authHelper";

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
        avatar: user.avatar,
        password: "",
        repeatPassword: "",
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
    <div
      className="userFormEdit"
      style={{
        width: "100%",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm dataForm={dataForm} setDataForm={setDataForm}></EditForm>
    </div>
  );
};

const UploadAvatar = ({ avatar, setAvatar }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);

  const theme = useTheme();

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
        padding: "1rem",
        borderRadius: "50%",
        // width: 200,
        // height: 200,
        // backgroundColor: "#f5f5f5",
        // border: `2px dashed ${theme.palette.primary[200]}`,
        // padding: "1rem",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar
          sx={{
            width: 150,
            height: 150,
            display: "table",
            margin: "0 auto",
            border: `1px solid ${theme.palette.primary[300]}`,
            //padding: "1rem",
            borderStyle: "dashed",
            borderRadius: "50%",
          }}
          src={noAvatar}
        ></Avatar>
      ) : (
        <Avatar
          sx={{
            width: 150,
            height: 150,
            display: "table",
            margin: "0 auto",
            border: `1px solid ${theme.palette.primary[300]}`,
            //padding: "1rem",
            borderStyle: "dashed",
            borderRadius: "50%",
          }}
          src={avatarUrl ? avatarUrl : noAvatar}
        ></Avatar>
      )}
    </div>
  );
};

const EditForm = ({ dataForm, setDataForm }) => {
  const theme = useTheme();
  const [passwordError, setPasswordError] = useState(false);
  const [messageError, setMessageError] = useState(null);

  const handleBlurPassword = (e) => {
    if (!verifyPassword(dataForm.password)) {
      setPasswordError(true);
      setMessageError(
        "La contraseña debe tener al menos 8 caracteres una mayuscula, minuscula, un numero y un caracter especial"
      );
    } else if (dataForm.password !== dataForm.repeatPassword) {
      setPasswordError(true);
      setMessageError("Las contraseñas no coinciden");
    } else {
      setPasswordError(false);
      setMessageError(null);
    }
  };

  const handleChangePassword = (e) => {
    if (verifyPassword(dataForm.password)) {
      setPasswordError(false);
      setMessageError(null);
    } else if (dataForm.password !== dataForm.repeatPassword) {
      setPasswordError(true);
      setMessageError("Las contraseñas no coinciden");
    } else {
      setPasswordError(true);
      setMessageError(
        "La contraseña debe tener al menos 8 caracteres una mayuscula, minuscula, un numero y un caracter especial"
      );
    }
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="editForm"
      style={{
        backgroundColor: theme.palette.background.alt,
        color: theme.palette.text.primary,
        padding: "1rem",
        //borderRadius: "10px",
        //boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
      }}
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
      <TextField
        label="Nueva Contraseña"
        name="password"
        type="password"
        variant="standard"
        size="small"
        value={dataForm.password}
        error={passwordError}
        onBlur={handleBlurPassword}
        onChange={(e) => handleChangePassword(e)}
        sx={{ mb: 2, width: "100%" }}
      />
      <TextField
        label="Repeat password"
        name="repeatPassword"
        type="password"
        variant="standard"
        size="small"
        value={dataForm.repeatPassword}
        error={passwordError}
        onBlur={handleBlurPassword}
        onChange={(e) => handleChangePassword(e)}
        sx={{ mb: 2, width: "100%" }}
      />
      {messageError || messageError === "" ? (
        <Alert
          severity="error"
          sx={{
            width: "100%",
            padding: "0.5rem",
            backgroundColor: "transparent",
            mb: 2,
          }}
        >
          {messageError}
        </Alert>
      ) : (
        <></>
      )}
      <Button variant="contained" color="secondary" sx={{ width: "100%" }}>
        Guardar
      </Button>
    </div>
  );
};

export default UserFormEdit;
