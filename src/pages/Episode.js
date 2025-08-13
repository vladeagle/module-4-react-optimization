import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export default function Episode() {
  const { id } = useParams();
    const { data, isLoading, error } = useFetch(
      `https://rickandmortyapi.com/api/episode/${id}`
    );

  return (
    <>
      {data && (
        <div className="episode">
          <h1>Эпизод {data.name}</h1>
          <table>
            <tbody>
              {data.air_date && (
                <tr>
                  <td>Дата показа:</td>
                  <td>{data.air_date}</td>
                </tr>
              )}
              {data.episode && (
                <tr>
                  <td>Номер:</td>
                  <td>{data.episode}</td>
                </tr>
              )}
              {data.created && (
                <tr>
                  <td>Создан:</td>
                  <td>{new Date(data.created).toUTCString()}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {isLoading && <h2>Загрузка эпизода...</h2>}
      {error && <h2>Ошибка загрузки</h2>}
    </>
  );
}
