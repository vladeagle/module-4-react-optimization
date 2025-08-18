import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useMore } from "../hooks/useMore";

export default function Episodes() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, hasMore } = useFetch(
    "https://rickandmortyapi.com/api/episode",
    true,
    page
  );

  const { pageToLoad, triggerNodeRef } = useMore(isLoading, hasMore);

  useEffect(() => {
    setPage(pageToLoad);
  }, [pageToLoad]);

  return (
    <>
      <div className="episodes">
        <h1>Эпизоды</h1>
        {data && (
          <ul>
            {data.map((episode, idx) => {
              if (data.length - 5 === idx) {
                return (
                  <li ref={triggerNodeRef} key={episode.id}>
                    <Link to={`/episodes/${episode.id}`}>{episode.name}</Link>
                  </li>
                );
              } else {
                return (
                  <li key={episode.id}>
                    <Link to={`/episodes/${episode.id}`}>{episode.name}</Link>
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
