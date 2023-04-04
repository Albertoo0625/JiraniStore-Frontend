import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();


//     const string =JSON.stringify(auth?.roles);
// const obj = JSON.parse(string);
// const arr = Object.values(obj);
//     console.log(`AUTH ROLES ON REQUIREAUTH ${arr}`);


if(auth?.roles){
let obj = auth?.roles;
let arr = Object.keys(obj).map(function(key) {
  return obj[key];
});

    return (  
        arr.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.accessToken //changed from user to accessToken to persist login after refresh
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/linkpage" state={{ from: location }} replace />
    );
}
}

export default RequireAuth;