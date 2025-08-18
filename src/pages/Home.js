import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function Home() {
  const auth = useAuth();

  return (
    <>
      <div className="home">
        <h1>Добро пожаловать во вселенную Рика и Морти!</h1>
        <h2>
          {auth.user === null ? (
            <>
              <Link to="/login">Авторизуйтесь</Link>, чтобы просматривать
              <br />
              информацию о&nbsp;
            </>
          ) : (
            <>
              Воспользуйтесь навигацией для просмотра <br /> информации о&nbsp;
            </>
          )}
          <Link to="/characters">Героях</Link>,&nbsp;
          <Link to="/locations">Локациях</Link>&nbsp;и&nbsp;
          <Link to="/episodes">Эпизодах</Link>
        </h2>
      </div>
    </>
  );
}
