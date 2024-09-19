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
import { useUpdateAvatarMutation } from "../../state/api";
import { getAccessToken } from "../../state/auth";
import { notification } from "antd";
import { updateUser as updateUserApi } from "../../state/user";

const UserFormEdit = ({ setIsModalOpen }) => {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState(null);
  const [dataForm, setDataForm] = useState({});
  const { data, error, isLoading } = useGetAvatarQuery(user.avatar);
  const [updateAvatar, result] = useUpdateAvatarMutation();
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

  const updateUser = () => {
    const token = getAccessToken();
    let userUpdate = dataForm;
    //console.log(userUpdate);
    console.log(token);
    if (dataForm.password) {
      if (!comparePasswords(dataForm.password, dataForm.repeatPassword)) {
        notification["error"]({
          message: "Error",
          description: "Las contraseñas no coinciden",
          style: {
            backgroundColor: "#f5222d",
            color: "#fff",
          },
        });
        return;
      } else {
        delete userUpdate.repeatPassword;
      }
    }
    if (!userUpdate.name || !userUpdate.lastname || !userUpdate.password) {
      notification["error"]({
        message: "Error",
        description: "Todos los campos son obligatorios",
        style: {
          backgroundColor: "#f5222d",
          color: "#fff",
        },
      });
      return;
    }
    if (typeof userUpdate.avatar === "object") {
      if (!verifyPassword(dataForm.password)) {
        notification["error"]({
          message: "Error",
          description: "Contraseña invalida",
          style: {
            backgroundColor: "#f5222d",
            color: "#fff",
          },
        });
        return;
      }
      updateAvatar({
        id: user.id,
        token: token,
        avatar: userUpdate.avatar,
      });
      userUpdate.avatar = result.avatarName;
      updateUserApi(user.id, token, userUpdate)
        .then((response) => {
          notification["success"]({
            message: "Exito",
            description: response.message,
            style: {
              backgroundColor: "#52c41a",
              color: "#fff",
            },
          });
          setIsModalOpen(false);
        })
        .catch((error) => {
          notification["error"]({
            message: "Error",
            description: error.message,
            style: {
              backgroundColor: "#f5222d",
              color: "#fff",
            },
          });
        });
    } else {
      if (!verifyPassword(dataForm.password)) {
        notification["error"]({
          message: "Error",
          description: "Contraseña invalida",
          style: {
            backgroundColor: "#f5222d",
            color: "#fff",
          },
        });
        return;
      }
      updateUserApi(user.id, token, userUpdate)
        .then((response) => {
          notification["success"]({
            message: "Exito",
            description: response.message,
            style: {
              backgroundColor: "#52c41a",
              color: "#fff",
            },
          });
          setIsModalOpen(false);
        })
        .catch((error) => {
          notification["error"]({
            message: "Error",
            description: error.message,
            style: {
              backgroundColor: "#f5222d",
              color: "#fff",
            },
          });
        });
    }
    setDataForm({
      name: user.name,
      lastname: user.lastname,
      avatar: user.avatar,
      password: "",
      repeatPassword: "",
    });
  };

  return (
    <div
      className="userFormEdit"
      style={{
        width: "100%",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        dataForm={dataForm}
        setDataForm={setDataForm}
        updateUser={updateUser}
      ></EditForm>
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

const EditForm = ({ dataForm, setDataForm, updateUser }) => {
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
      <Button
        variant="contained"
        color="secondary"
        sx={{ width: "100%" }}
        onClick={updateUser}
      >
        Guardar
      </Button>
    </div>
  );
};

export default UserFormEdit;
