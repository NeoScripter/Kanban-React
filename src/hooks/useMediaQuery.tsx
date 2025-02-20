import { useEffect, useState } from 'react';

function useMediaQuery(...queries: string[]): boolean {
  const supportMatchMedia =
    typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';

  const [match, setMatch] = useState(false);

  const query = queries.join();

  useEffect(() => {
    let active = true;
    if (!supportMatchMedia) return undefined;

    const queryList = window.matchMedia(query);

    function updateMatch() {
      if (active) setMatch(queryList.matches);
    }

    updateMatch();
    queryList.addListener(updateMatch);

    return () => {
      active = false;
      queryList.removeListener(updateMatch);
    };
  }, [query, supportMatchMedia]);

  return match;
}

export default useMediaQuery;