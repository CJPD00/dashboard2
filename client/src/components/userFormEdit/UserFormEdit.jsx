import useAuth from "../../hooks/useAuth";
import noAvatar from "../../assets/noAvatar.png";
import { useDropzone } from "react-dropzone";
import { useCallback, useState, useEffect } from "react";

const UserFormEdit = () => {
  const { auth } = useAuth();
  const [avatar, setAvatar] = useState(null);
  const [dataForm, setDataForm] = useState({});

  useEffect(() => {
    if (auth) {
      setDataForm({
        name: auth.name,
        lastname: auth.lastname,
        role: auth.role,
        avatar: auth.avatar,
      });
    }
  }, [auth]);

  // console.log(dataForm);

  return <div>UserFormEdit</div>;
};

export default UserFormEdit;
