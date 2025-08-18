import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useMore } from "../hooks/useMore";

export default function Locations() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, hasMore } = useFetch(
    "https://rickandmortyapi.com/api/location",
    true,
    page
  );

  const { pageToLoad, triggerNodeRef } = useMore(isLoading, hasMore);

  useEffect(() => {
    setPage(pageToLoad);
  }, [pageToLoad]);

  return (
    <>
      <div className="locations">
        <h1>Локации</h1>
        {data && (
          <ul>
            {data.map((loc, idx) => {
              if (data.length - 5 === idx) {
                return (
                  <li ref={triggerNodeRef} key={loc.id}>
                    <Link to={`/locations/${loc.id}`}>{loc.name}</Link>
                  </li>
                );
              } else {
                return (
                  <li key={loc.id}>
                    <Link to={`/locations/${loc.id}`}>{loc.name}</Link>
                  </li>
                );
              }
            })}
          </ul>
        )}
        {isLoading && <h2>Загрузка локаций...</h2>}
        {error && <h2>Ошибка загрузки</h2>}
      </div>
    </>
  );
}
