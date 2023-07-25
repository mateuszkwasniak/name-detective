import { useContext } from "react";
import { AuthContext } from "@/app/auth-provider";
import { useCallback } from "react";

export const useRefreshLogin = () => {
  const { setAuth } = useContext(AuthContext);

  const refreshLogin = useCallback(async () => {
    const response: Response = await fetch("api/refresh-login", {
      credentials: "include",
    });

    if (!response.ok) {
      const error: ResponseError = await response.json();
      throw new Error(error?.message);
    }
    const data: LoginResponseData = await response.json();
    const { name } = data;
    setAuth({
      name,
    });
  }, [setAuth]);

  return { refreshLogin };
};
