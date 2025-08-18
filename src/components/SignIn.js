import { useState } from "react";
import { Input } from "./Input";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const from = location.state?.from || "/";
  const [inputs, setInputs] = useState({
    login: "",
    password: "",
  });
  const [passErr, setPassError] = useState("");

  const onInputBlur = (e) => {
    if (e.target.type === "password") {
      if (e.target.validity.tooShort) {
        setPassError("Длина пароля не менее 8 символов");
      } else {
        setPassError("");
      }
    }
  };

  const onFormChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    auth.signIn(inputs.login, () => {
      navigate(from, {
        replace: true,
      });
    });
  };

  return (
    <>
      <h1>Войти</h1>
      <form className="form" onChange={onFormChange} onSubmit={onSubmit}>
        <Input
          type="login"
          name="login"
          required
          label="Логин"
          placeholder="Введите логин"
          size={300}
          radius={10}
          emptyErr={true}
          onBlurOut={onInputBlur}
        />
        <Input
          type="password"
          name="password"
          required
          label="Пароль"
          placeholder="Введите пароль"
          description="Длина пароля не менее 8 символов"
          size={300}
          radius={10}
          minLength={8}
          emptyErr={true}
          error={passErr}
          onBlurOut={onInputBlur}
        />
        <button className="button" type="submit">
          Отправить
        </button>
      </form>
    </>
  );
}
