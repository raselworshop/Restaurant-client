import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useAuth = () => {
    const authInform = useContext(AuthContext);
    return authInform;
};

export default useAuth;