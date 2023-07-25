import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/auth-provider";

export const useLogout = (): { logout: () => Promise<void> } => {
  const { setAuth } = useContext(AuthContext);
  const router = useRouter();

  const logout = async () => {
    const response = await fetch("/api/logout", {
      credentials: "include",
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Not able to log out");
    }
    setAuth({ name: "" });
    router.push("/login");
  };

  return { logout };
};
