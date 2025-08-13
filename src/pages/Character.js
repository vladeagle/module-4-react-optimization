import { useFetch } from "../hooks/useFetch";
import { useParams } from "react-router-dom";

export default function Character() {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );

  return (
    <>
      {data && (
        <div className="character">
          <h1>Герой {data.name}</h1>
          <table>
            <tbody>
              {data.status && (
                <tr>
                  <td>Статус:</td>
                  <td>{data.status}</td>
                </tr>
              )}
              {data.species && (
                <tr>
                  <td>Вид:</td>
                  <td>{data.species}</td>
                </tr>
              )}
              {data.type && (
                <tr>
                  <td>Тип:</td>
                  <td>{data.type}</td>
                </tr>
              )}
              {data.gender && (
                <tr>
                  <td>Пол:</td>
                  <td>{data.gender}</td>
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
          {data.image && <img src={data.image} alt={data.name} />}
        </div>
      )}
      {isLoading && <h2>Загрузка героя...</h2>}
      {error && <h2>Ошибка загрузки</h2>}
    </>
  );
}
