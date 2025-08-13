import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch(url, infinite, page) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    let controller = new AbortController();

    setIsLoading(true);
    setError(false);

    axios({
      method: "GET",
      url: url,
      params: {
        page: page,
      },
      signal: controller.signal,
    })
      .then((res) => {
        if (infinite) {
          setData((prevState) => [
            ...new Set([...prevState, ...res.data.results]),
          ]);
        } else {
          setData(res.data);
        }
        setIsLoading(false);
        setHasMore(!!res.data?.info?.next);
      })
      .catch((e) => {
        if (e.name !== "CanceledError") {
          setError(true);
          console.error(e);
        }
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [url, page, infinite]);

  return { data, isLoading, error, hasMore };
}
