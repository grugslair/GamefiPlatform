import { useEffect, useRef, useState } from "react";

function attachMediaListener(query, callback) {
  try {
    query.addEventListener("change", callback);
    return () => query.removeEventListener("change", callback);
  } catch (e) {
    query.addListener(callback);
    return () => query.removeListener(callback);
  }
}
function getInitialValue(query, initialValue) {
  if (initialValue !== void 0) {
    return initialValue;
  }
  if (typeof window !== "undefined" && "matchMedia" in window) {
    return window.matchMedia(query).matches;
  }
  return false;
}

function useMediaQuery(query, initialValue) {
  const [matches, setMatches] = useState(getInitialValue(query, initialValue));
  const queryRef = useRef();
  useEffect(() => {
    if ("matchMedia" in window) {
      queryRef.current = window.matchMedia(query);
      setMatches(queryRef.current.matches);
      return attachMediaListener(queryRef.current, (event) =>
        setMatches(event.matches)
      );
    }
    return void 0;
  }, [query]);
  return matches;
}

export default useMediaQuery;
