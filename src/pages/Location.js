import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export default function Location() {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch(
    `https://rickandmortyapi.com/api/location/${id}`
  );

  return (
    <>
      {data && (
        <div className="location">
          <h1>Локация {data.name}</h1>
          <table>
            <tbody>
              {data.type && (
                <tr>
                  <td>Тип:</td>
                  <td>{data.type}</td>
                </tr>
              )}
              {data.dimension && (
                <tr>
                  <td>Измерение:</td>
                  <td>{data.dimension}</td>
                </tr>
              )}
              {data.created && (
                <tr>
                  <td>Создана:</td>
                  <td>{new Date(data.created).toUTCString()}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {isLoading && <h2>Загрузка локации...</h2>}
      {error && <h2>Ошибка загрузки</h2>}
    </>
  );
}
