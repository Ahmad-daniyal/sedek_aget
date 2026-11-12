import { useEffect, useRef, useState } from 'react';

export default function useFetch(request, key, fallback = null) {
  const requestRef = useRef(request);
  requestRef.current = request;

  const [state, setState] = useState({ data: fallback, loading: true, error: null });

  useEffect(() => {
    let active = true;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    requestRef
      .current()
      .then((data) => {
        if (active) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((error) => {
        if (active) {
          setState({ data: fallback, loading: false, error: error.message });
        }
      });

    return () => {
      active = false;
    };
  }, [key, fallback]);

  return state;
}
