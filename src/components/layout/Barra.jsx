import React, { useContext, useEffect } from "react";
import authContext from "../../context/autenticacion/authContext";

const Barra = () => {
  //*Extraer la Info de Atuenticacion
  const contextAuth = useContext(authContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = contextAuth; //? Esto va a cargar la info del Usuario Autenticado
  //? Lo Coloco en un Effect  para que cuando se Actualize vamos a tener esa Info
  useEffect(() => {
    usuarioAutenticado();
    //eslint-disable-next-line
  }, []);

  return (
    <header className="app-header">
      {usuario ? (
        <p className="nombre-usuario">
          Hola <span>{usuario.usuario.nombre}</span> 
        </p>
      ) : null}

      <nav className="nav-principal">
        <button className=" btn btn-blank cerrar-sesion" onClick={() => cerrarSesion()}>
          Cerrar Sesion
        </button>
      </nav>
    </header>
  );
};

export default Barra;
