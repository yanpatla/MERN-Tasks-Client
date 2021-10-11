import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import authContext from "../../context/autenticacion/authContext";
const PrivateRoute = ({ component: Component, ...props }) => {
  //? HOC: un componente de orden superior es una función que recibe un componente y devuelve un nuevo componente.

  const contextAuth = useContext(authContext);
  const { autenticado,cargando,usuarioAutenticado } = contextAuth;
useEffect(()=>{
    usuarioAutenticado();
    //eslint-disable-next-line
},[])


  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !cargando ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
