import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";

const UserFormEdit = () => {
  const [dataForm, setDataForm] = useState({
    name: "",
    lastname: "",
    password: "",
    confirmPassword: "",
  });

  const auth = useAuth();

  useEffect(() => {
    setDataForm({
      name: auth.user.name,
      lastname: auth.user.lastname,
      password: "",
      confirmPassword: "",
    });
  }, []);

  // console.log(dataForm);

  return <div>UserFormEdit</div>;
};

export default UserFormEdit;
