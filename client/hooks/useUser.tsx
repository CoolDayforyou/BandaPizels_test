import { checkToken } from "@/lib/checkToken";
import { useEffect, useState } from "react";

const useIsUserLogged = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      const token = await checkToken();

      if (token) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
      setIsLoading(false);
    };

    initialize();
  }, []);

  return { isLogged, isLoading };
};

export { useIsUserLogged };
