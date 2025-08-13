import { useCallback, useRef, useState } from "react";

export function useMore(isLoading, hasMore) {
  const [pageToLoad, setPageToLoad] = useState(1);
  const observer = useRef();
  const triggerNodeRef = useCallback(
    (node) => {
      if (isLoading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (hasMore && entries[0].isIntersecting) {
          setPageToLoad((prevState) => prevState + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore]
  );

  return { triggerNodeRef, pageToLoad };
}
