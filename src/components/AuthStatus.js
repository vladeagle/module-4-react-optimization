import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();

  const onSingOut = () => {
    auth.signOut(() => navigate("/"));
  };

  if (auth.user === null) {
    return (
      <Link className="button" to="/login">
        Авторизоваться
      </Link>
    );
  }

  return (
    <div className="user">
      <div className="user__name">{auth.user}</div>
      <button className="button" onClick={onSingOut}>
        Выйти
      </button>
    </div>
  );
}
