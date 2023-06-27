import { useCallback } from "react";

import { useSearchParams } from "next/navigation";

import queryString from "query-string";
import { URLSearchParams } from "url";

type AppendArgs = Record<string, string | number>;
type Append = (args: AppendArgs) => URLSearchParams;

interface ReturnUseQueryString {
  append: Append;
}

const useQueryString = (): ReturnUseQueryString => {
  const searchParams = useSearchParams();

  const append: Append = useCallback(
    (args) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(args).forEach(([key, value]) => {
        params.set(key, String(value));
      });
      return params;
    },
    [searchParams],
  );

  const remove = useCallback(() => {}, []);

  return {
    append,
  };
};

export default useQueryString;
