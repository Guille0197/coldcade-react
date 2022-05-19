import { AuthContext } from "../routes/AuthProvider";
import { useContext } from "react";

export function useAuth() {
  return useContext(AuthContext);
}
