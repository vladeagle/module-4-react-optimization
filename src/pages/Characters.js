import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useMore } from "../hooks/useMore";
import { useEffect, useState } from "react";

export default function Characters() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, hasMore } = useFetch(
    "https://rickandmortyapi.com/api/character",
    true,
    page
  );

  const { pageToLoad, triggerNodeRef } = useMore(isLoading, hasMore);

  useEffect(() => {
    setPage(pageToLoad);
  }, [pageToLoad]);

  return (
    <>
      <div className="characters">
        <h1>Герои</h1>
        {data && (
          <ul>
            {data.map((char, idx) => {
              if (data.length - 5 === idx) {
                return (
                  <li ref={triggerNodeRef} key={char.id}>
                    <Link to={`/characters/${char.id}`}>{char.name}</Link>
                  </li>
                );
              } else {
                return (
                  <li key={char.id}>
                    <Link to={`/characters/${char.id}`}>{char.name}</Link>
                  </li>
                );
              }
            })}
          </ul>
        )}
        {isLoading && <h2>Загрузка героев...</h2>}
        {error && <h2>Ошибка загрузки</h2>}
      </div>
    </>
  );
}
